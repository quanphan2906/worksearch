"use client";

import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";
import { User } from "@/models/models";

interface UserContextType {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>(null!);

interface UserProviderProps {
	children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;
