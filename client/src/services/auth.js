import { API_ENDPOINT } from "./config";

export const signup = async (user) => {
	const response = await fetch(`${API_ENDPOINT}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});
	if (!response.ok) {
		throw new Error(response.message);
	}
	return response.json();
};
