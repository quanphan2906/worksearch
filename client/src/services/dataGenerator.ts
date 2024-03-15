import { faker } from "@faker-js/faker";
import { JobPosting, Company, User, Application } from "@/models/models";

function generateFakeJobPosting(): JobPosting {
	return {
		job_id: faker.string.uuid(),
		title: faker.person.jobTitle(),
		location: `${faker.location.city()}, ${faker.location.state()}`,
		company_name: faker.company.name(),
		experience_needed: `${faker.datatype.number({
			min: 1,
			max: 10,
		})} years`,
		career_level: faker.helpers.arrayElement([
			"Entry Level",
			"Mid Level",
			"Senior Level",
			null,
		]),
		education_level: faker.helpers.arrayElement([
			"Bachelor's Degree",
			"Master's Degree",
			"PhD",
			null,
		]),
		salary: `$${faker.number.int({ min: 50000, max: 150000 })}`,
		description: faker.lorem.paragraph(),
		requirements: faker.lorem.sentences(3),
		company_id: faker.string.uuid(),
		categories: faker.helpers.arrayElements(
			["Technology", "Innovation", "Management", "HR", "Finance"],
			2
		),
		skills: faker.helpers.arrayElements(
			["Communication", "Problem solving", "Teamwork", "Leadership"],
			4
		),
		employment_basis: faker.helpers.arrayElement([
			["Full-time"],
			["Part-time"],
			["Contract"],
			null,
		]),
	};
}

function generateFakeCompany(): Company {
	const companySizes = [
		"Small (1-50 employees)",
		"Medium (51-200 employees)",
		"Large (201+ employees)",
	];

	return {
		company_id: faker.string.uuid(),
		name: faker.company.name(),
		established_year: faker.date.past({ years: 50 }).getFullYear(),
		size: faker.helpers.arrayElement(companySizes),
		location: `${faker.location.city()}, ${faker.location.state()}`,
		description: faker.company.catchPhrase(),
		website: faker.internet.url(),
		industries: faker.helpers.arrayElements(
			["Technology", "Finance", "Healthcare", "Entertainment"],
			2
		),
		job_postings: Array.from(
			{ length: faker.number.int({ min: 1, max: 5 }) },
			generateFakeJobPosting
		),
	};
}

function generateFakeUser(): User {
	const skills = [
		"Communication",
		"Problem Solving",
		"Teamwork",
		"Leadership",
	];
	// Generate a user without applications first
	const user: User = {
		email: faker.internet.email(),
		user_name: faker.internet.userName(),
		gender: faker.helpers.arrayElement(["male", "female", "other"]),
		birth_date: faker.date
			.past({ years: 30, refDate: new Date("2000-01-01") })
			.toISOString()
			.split("T")[0], // Ensures a reasonable age for the user
		gpa: parseFloat(faker.finance.amount(1, 4, 2)),
		skills: faker.helpers.arrayElements(
			skills,
			faker.number.int({ min: 1, max: skills.length })
		),
		applications: [], // This will be filled in later
	};

	return user;
}

function generateFakeApplication(
	users: User[],
	jobPostings: JobPosting[]
): Application {
	// Pick a random user and job posting
	const user = faker.helpers.arrayElement(users);
	const jobPosting = faker.helpers.arrayElement(jobPostings);

	const application: Application = {
		user_email: user.email,
		job_id: jobPosting.job_id,
		application_date: faker.date
			.recent({ days: 90 })
			.toISOString()
			.split("T")[0], // within the last 90 days
		cover_letter: faker.lorem.paragraphs(2),
		// Optionally include user and jobPosting if needed
	};

	// Add this application to the user's applications array
	user.applications.push(application);

	return application;
}

export const getFakeCompanies = (length: number): Company[] => {
	return Array.from({ length }, generateFakeCompany);
};

export const getFakeJobPostings = (length: number): JobPosting[] => {
	return Array.from({ length }, generateFakeJobPosting);
};

export const getFakeUsers = (length: number): User[] => {
	return Array.from({ length }, generateFakeUser);
};

export const getFakeApplications = (
	length: number,
	users: User[],
	jobPostings: JobPosting[]
): Application[] => {
	let fakeApplications: Application[] = [];
	for (let i = 0; i < length; i++) {
		fakeApplications.push(generateFakeApplication(users, jobPostings));
	}

	return fakeApplications;
};
