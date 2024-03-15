export interface Company {
	company_id: string;
	name: string;
	established_year: number;
	size: string;
	location: string;
	description: string;
	website: string;

	// Include as nested objects for detailed views or lists of IDs for summary views
	industries: string[];
	job_postings: JobPosting[];
}

export interface JobPosting {
	job_id: string;
	title: string;
	location: string;
	company_name: string;
	experience_needed?: string | null;
	career_level?: string | null;
	education_level?: string | null;
	salary?: string | null;
	description?: string | null;
	requirements?: string | null;
	company_id?: string;
	categories?: string[]; // categories of the jobs
	skills?: string[]; // skills required for the jobs
	employment_basis?: string[] | null;
}

export interface User {
	email: string;
	user_name: string;
	gender: string;
	birth_date: string; // Use ISO format for dates
	gpa: number;

	skills: string[];
	applications: Application[]; // Detailed applications by this user
}

export interface Application {
	user_email: string;
	job_id: string;
	application_date: string; // Use ISO format for dates
	cover_letter: string;

	// Optionally include nested objects for related entities
	user?: User; // Include if displaying application details in the context of a job posting
	job_posting?: JobPosting; // Include if displaying application details in the user context
}
