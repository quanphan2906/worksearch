import { JobPosting } from "@/models/models";
import { ServiceResult } from "./ServiceResult";
import { API_ENDPOINT } from "./config";
import { delay } from "./helper";

// const getJobPostingsByCompany = async (companyId) => {
// 	const response = await fetch(`${API_ENDPOINT}/jobs/company/${companyId}`);
// 	if (!response.ok) {
// 		throw new Error("Company not found");
// 	}
// 	return response.json();
// };

// const getJobPostingsByIndustry = async (industry) => {
// 	const response = await fetch(`${API_ENDPOINT}/jobs/industry/${industry}`);
// 	if (!response.ok) {
// 		throw new Error("No job postings found for the industry");
// 	}
// 	return response.json();
// };

// const getJobPostingsBySkills = async (skills) => {
// 	const response = await fetch(
// 		`${API_ENDPOINT}/jobs/skills?skills=${skills}`
// 	);
// 	return response.json();
// };

// const getJobs = async (by, value) => {
// 	switch (by) {
// 		case "company":
// 			return await getJobPostingsByCompany(value);
// 		case "industry":
// 			return await getJobPostingsByIndustry(value);
// 		case "skills":
// 			return await getJobPostingsBySkills(value);
// 		default:
// 			throw new Error("Invalid search criteria");
// 	}
// };

const getJobs = async (
	searchBy: string,
	value: string,
	page: number = 1,
	limitPerPage: number = 10
): Promise<ServiceResult<{ jobPostings: JobPosting[]; next: number }>> => {
	await delay(2000);

	const response = await fetch(
		`${API_ENDPOINT}/job_postings?_page=${page}&_per_page=${limitPerPage}`
	);

	if (!response.ok) {
		return { ok: false, message: "Failed to fetch" };
	}

	const metadata = await response.json();
	return {
		data: { next: metadata.next, jobPostings: metadata.data },
		ok: true,
		message: "",
	};
};

export default getJobs;
