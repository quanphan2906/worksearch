import { API_ENDPOINT } from "./config";

export const signup = async (user) => {
	const response = await fetch(`${API_ENDPOINT}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(user),
	});
	if (!response.ok) {
		throw new Error(response.message);
	}
	return response.json();
};

export const login = async (user) => {
	const response = await fetch(`${API_ENDPOINT}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(user),
	});
	if (!response.ok) {
		throw new Error(response.message);
	}
	return response.json();
};

export const logout = async () => {
	const response = await fetch(`${API_ENDPOINT}/auth/logout`, {
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error(response.message);
	}
	return response.json();
};
