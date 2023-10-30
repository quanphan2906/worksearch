import React, { createContext, useState } from "react";
import {
	login as loginService,
	signup as signupService,
	logout as logoutService,
} from "@/services/auth";

export const UserContext = createContext();

function UserProvider({ children }) {
	const [user, setUser] = useState(null);

	const signup = async (user) => {
		const response = await signupService(user);
		setUser(response.data);
		return response.message;
	};

	const login = async (user) => {
		const response = await loginService(user);
		setUser(response.data);
		return response.message;
	};

	const logout = async () => {
		const response = await logoutService();
		setUser(null);
		return response.message;
	};

	return (
		<UserContext.Provider value={{ user, signup, login, logout }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;
