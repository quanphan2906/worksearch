import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import re
import traceback
import multiprocessing
import logging
import re

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--log-level=3")
driver = webdriver.Chrome(options=chrome_options)

logging.basicConfig(filename="error.log", level=logging.ERROR)


def get_text_by_class(soup, class_):
    ele = soup.find(class_=class_)
    if ele:
        return ele.text
    return None


def get_text_by_tag(soup, tag):
    ele = soup.find(tag)
    if ele:
        return ele.text
    return None


def get_href_by_tag(soup, class_):
    ele = soup.find(class_=class_)
    if ele:
        return ele.href

    return None


def strings_to_snake_case(input_list):
    snake_case_list = []
    for string in input_list:
        snake_case_string = re.sub(r"[\s-]", "_", string).lower()
        snake_case_list.append(snake_case_string)
    return snake_case_list


def get_job_links_and_company_ids(page, base_url, job_count=-1):
    response = requests.get(base_url)
    links = []
    company_urls = []

    if response.status_code != 200:
        raise Exception(
            f"Failed to retrieve page {base_url}. Status code: {response.status_code}"
        )

    soup = BeautifulSoup(response.text, "html.parser")
    h2_tags = soup.find_all(class_="css-m604qf")

    for h2 in h2_tags:
        a_tag = h2.find("a")
        link = a_tag["href"]
        links.append(link)

        parent = h2.parent
        company_tag = parent.find_all("a")[-1]
        company_url = None if "href" not in company_tag.attrs else company_tag["href"]
        company_urls.append(company_url)

        job_count -= 1
        if job_count == 0:
            break

    return links, company_urls


def get_basic(soup):
    res = {}
    res["title"] = get_text_by_tag(soup, "h1")

    res["company_id"] = None
    ele = soup.find(class_="css-p7pghv")
    if ele:
        res["company_id"] = ele["href"].split("-")[-1]

    res["location"] = get_text_by_class(soup, "css-9geu3q")

    open_pos = get_text_by_class(soup, "css-ixb653")
    if open_pos:
        match = re.search(r"\d+", open_pos)
        if match:
            res["open_positions"] = match.group()

    eb = soup.find_all(class_="css-ja0r8m")
    employment_basis = [e.text for e in eb]

    return res, employment_basis


def get_job_details(soup):
    fields = soup.find_all(class_="css-wn0avc")
    values = soup.find_all(class_="css-4xky9y")
    job_details = {k.text[:-1]: v.text for k, v in zip(fields, values)}

    job_categories = []
    skill_tools = []

    div = soup.find(class_="css-13sf2ik")
    if div:
        cats = div.find_all(class_="css-158icaa")
        job_categories = [c.text for c in cats]

    div = soup.find(class_="css-s2o0yh")
    if div:
        cats = div.find_all(class_="css-158icaa")
        skill_tools = [c.text for c in cats]

    return job_details, job_categories, skill_tools


def get_job_description(soup):
    div = soup.find(class_="css-1uobp1k")
    if not div:
        return ""

    parent = div.find("ul")
    if parent:
        desc = [li.text for li in parent.find_all("li")]
        return ". ".join(desc)

    return ""


def get_job_requirement(soup):
    div = soup.find(class_="css-1t5f0fr")
    if not div:
        return ""

    parent = div.find("ul")
    if parent:
        reqs = [li.text for li in parent.find_all("li")]
        return ". ".join(reqs)

    return ""


def get_job_info(link, wait_time):
    driver.get(link)
    # driver.implicitly_wait(wait_time)
    try:
        WebDriverWait(driver, wait_time).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
    except:
        return {}, [], [], []

    linked_soup = BeautifulSoup(driver.page_source, "html.parser")
    # main_tag = linked_soup.find("main")
    section_tags = linked_soup.find_all("section")
    if len(section_tags) < 4:
        return {}, [], [], []

    job = {}

    job_id = link.split("/")[-1].split("-")[0]
    job["job_id"] = job_id

    basic, employment_basis = get_basic(section_tags[0])
    job.update(basic)

    job_details, job_categories, skill_tools = get_job_details(section_tags[1])
    job.update(job_details)

    job["description"] = get_job_description(section_tags[2])

    job["requirements"] = get_job_requirement(section_tags[3])

    employment_basis = [
        {"job_id": job_id, "employment_basis": eb} for eb in employment_basis
    ]
    job_categories = [{"job_id": job_id, "job_category": jc} for jc in job_categories]
    skill_tools = [{"job_id": job_id, "skill": st} for st in skill_tools]

    return job, employment_basis, job_categories, skill_tools


def scrape_company_info(company_url, wait_time):
    company = {}

    if company_url is None:
        return company

    driver.get(company_url)
    # driver.implicitly_wait(wait_time)
    try:
        WebDriverWait(driver, wait_time).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
    except:
        return company

    soup = BeautifulSoup(driver.page_source, "html.parser")

    company["company_id"] = company_url.split("-")[-1]
    company["name"] = get_text_by_tag(soup, "h1")
    company["website"] = get_text_by_class(soup, "css-1517rho")

    info = soup.find_all(class_="css-16heon9")
    company["location"] = None if len(info) == 0 else info[0].text
    company["industry"] = None if len(info) <= 1 else info[1].text
    company["size"] = None if len(info) <= 2 else info[2].text

    company["established_year"] = get_text_by_class(soup, "css-6whuzn")
    company["description"] = get_text_by_class(soup, "css-1ceuc1v")

    return company


base_url = "https://wuzzuf.net/a/IT-Software-Development-Jobs-in-Egypt?start="
seen_company = set()
company_header = [
    "company_id",
    "name",
    "industry",
    "established_year",
    "size",
    "location",
    "description",
    "website",
]

job_header = [
    "job_id",
    "title",
    "location",
    "experience_needed",
    "career_level",
    "education_level",
    "salary",
    "description",
    "requirements",
    "open_positions",
    "company_id",
]


def scrape_batch(page_range):
    for i in page_range:
        print(f"Scraping page: {i}")
        try:
            links, company_urls = get_job_links_and_company_ids(i, base_url + str(i))

            jobs = []
            employment_basis = []
            job_categories = []
            skill_tools = []
            companies = []

            for c in company_urls:
                if c not in seen_company:
                    seen_company.add(c)
                    comp = scrape_company_info(c, wait_time=10)
                    if len(comp) > 0:
                        companies.append(comp)

            for l in links:
                job, eb, jc, st = get_job_info(l, wait_time=10)
                jobs.append(job)
                employment_basis.extend(eb)
                job_categories.extend(jc)
                skill_tools.extend(st)

            jobs_df = pd.DataFrame(jobs)
            jobs_df.columns = strings_to_snake_case(jobs_df.columns)
            # create column if the dataframe doesn't have it
            for column in job_header:
                if column not in jobs_df.columns:
                    jobs_df[column] = None
            jobs_df = jobs_df[job_header]

            print(f"Scraping page {i}, and got {len(jobs_df.index)} jobs")

            companies_df = pd.DataFrame(companies)
            # create column if the dataframe doesn't have it
            for column in company_header:
                if column not in companies_df.columns:
                    companies_df[column] = None
            companies_df = companies_df[company_header]

            print(f"Scraping page {i}, and got {len(companies_df.index)} companies")

            if len(jobs_df.index) == 0:
                raise

            jobs_df.to_csv("data/jobs.csv", index=False, mode="a", header=False)
            companies_df.to_csv(
                "data/companies.csv", index=False, mode="a", header=False
            )

            pd.DataFrame(employment_basis).to_csv(
                "data/employment_basis.csv", index=False, mode="a", header=False
            )
            pd.DataFrame(job_categories).to_csv(
                "data/job_categories.csv", index=False, mode="a", header=False
            )
            pd.DataFrame(skill_tools).to_csv(
                "data/skills.csv", index=False, mode="a", header=False
            )

        except Exception as e:
            print(f"Error fetching page {i}")
            logging.error(f"Error fetching page: {i}")
            # traceback.print_exc()


if __name__ == "__main__":
    with open("error.log", "w") as file:
        pass

    num_batches = 4
    pages_per_batch = 15

    pd.DataFrame(columns=company_header).to_csv("data/companies.csv", index=False)
    pd.DataFrame(columns=job_header).to_csv("data/jobs.csv", index=False)
    pd.DataFrame(columns=["job_id", "employment_basis"]).to_csv(
        "data/employment_basis.csv", index=False
    )
    pd.DataFrame(columns=["job_id", "job_category"]).to_csv(
        "data/job_categories.csv", index=False
    )
    pd.DataFrame(columns=["job_id", "skill"]).to_csv("data/skills.csv", index=False)

    with multiprocessing.Pool(processes=num_batches) as pool:
        batch_ranges = [
            range(i * pages_per_batch, (i + 1) * pages_per_batch)
            for i in range(num_batches)
        ]
        pool.map(scrape_batch, batch_ranges)

    print("Retrying pages that run into error")
    error_numbers = []

    with open("error.log", "r") as file:
        for line in file:
            parts = line.split(":")
            if len(parts) >= 3:
                number = parts[-1].strip()
                if number.isdigit():
                    error_numbers.append(int(number))

    with open("error.log", "w") as file:
        pass

    if len(error_numbers) > 0:
        chunks = [
            error_numbers[i : i + len(error_numbers) // num_batches]
            for i in range(0, len(error_numbers), len(error_numbers) // num_batches)
        ]

        with multiprocessing.Pool(processes=num_batches) as pool:
            pool.map(scrape_batch, chunks)
