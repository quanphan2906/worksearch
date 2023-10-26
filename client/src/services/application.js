import { API_ENDPOINT } from "./config";

export const apply = async (user_email, job_id, cover_letter) => {
	const currentDate = new Date().toISOString().split("T")[0];

	const response = await fetch(`${API_ENDPOINT}/application/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user_email,
			job_id,
			cover_letter,
			application_date: currentDate,
		}),
	});
	if (!response.ok) {
		throw new Error(response.message);
	}
	return response.json();
};
