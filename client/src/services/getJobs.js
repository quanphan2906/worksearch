import { API_ENDPOINT } from "./config";

const getJobPostingsByCompany = async (companyId) => {
	const response = await fetch(`${API_ENDPOINT}/jobs/company/${companyId}`);
	if (!response.ok) {
		throw new Error("Company not found");
	}
	return response.json();
};

const getJobPostingsByIndustry = async (industry) => {
	const response = await fetch(`${API_ENDPOINT}/jobs/industry/${industry}`);
	if (!response.ok) {
		throw new Error("No job postings found for the industry");
	}
	return response.json();
};

const getJobPostingsBySkills = async (skills) => {
	const response = await fetch(`${API_ENDPOINT}/jobs/skills?skills=${skills}`);
	return response.json();
};

const getJobs = async (by, value) => {
	switch (by) {
		case "company":
			return await getJobPostingsByCompany(value);
		case "industry":
			return await getJobPostingsByIndustry(value);
		case "skills":
			return await getJobPostingsBySkills(value);
		default:
			throw new Error("Invalid search criteria");
	}
};

export default getJobs;
