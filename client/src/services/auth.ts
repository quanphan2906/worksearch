import { User } from "@/models/models";
import { ServiceResult } from "./ServiceResult";

export const login = async (user: User): Promise<ServiceResult<void>> => {
	return {
		ok: true,
		message: "all good",
	};
};
export const signup = async (user: User): Promise<ServiceResult<void>> => {
	return {
		ok: true,
		message: "all good",
	};
};

export const logout = async (): Promise<ServiceResult<void>> => {
	return {
		ok: true,
		message: "all good",
	};
};
