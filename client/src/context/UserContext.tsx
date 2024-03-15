"use client";

import { createContext, useState, ReactNode } from "react";
import { User } from "@/models/models";
import {
	login as loginService,
	signup as signupService,
	logout as logoutService,
} from "@/services/auth";

interface UserContextType {
	user: User | null;
	signup: (user: User) => Promise<string>;
	login: (user: User) => Promise<string>;
	logout: () => Promise<string>;
}

export const UserContext = createContext<UserContextType>(null!);

interface UserProviderProps {
	children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	const signup = async (user: User) => {
		const res = await signupService(user);
		if (res.ok) {
			setUser(res.data as User);
		}

		return res.message;
	};

	const login = async (user: User) => {
		const res = await loginService(user);
		if (res.ok) {
			setUser(res.data as User);
		}

		return res.message;
	};

	const logout = async () => {
		const res = await logoutService();
		if (res.ok) {
			setUser(null);
		}

		return res.message;
	};

	return (
		<UserContext.Provider value={{ user, signup, login, logout }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;
