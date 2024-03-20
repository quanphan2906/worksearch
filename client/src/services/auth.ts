import { User } from "@/models/models";
import { ServiceResult } from "./ServiceResult";

export const login = async (
	email: string,
	password: string
): Promise<ServiceResult<User>> => {
	const response = await fetch(`http://localhost:4000/users?email=${email}`);
	const users = await response.json();

	if (users.length === 0) {
		return {
			ok: false,
			message: "User not found",
		};
	}

	const user = users[0];
	if (user.password !== password) {
		return {
			ok: false,
			message: "Invalid password",
		};
	}

	return { data: user, ok: true };
};

export const signup = async (user: User): Promise<ServiceResult<void>> => {
	const response = await fetch("http://localhost:4000/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...user,
			id: user.email,
		}),
	});

	if (!response.ok) {
		throw new Error("Could not create new user");
	}

	return response.json();
};

export const logout = async (): Promise<ServiceResult<void>> => {
	return {
		ok: true,
		message: "all good",
	};
};
