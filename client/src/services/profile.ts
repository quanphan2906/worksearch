import { User } from "@/models/models";
import { delay } from "./helper";
import { ServiceResult } from "./ServiceResult";

export const updateProfile = async (
	user: User
): Promise<ServiceResult<User>> => {
	await delay(2000);
	// do some updates

	return {
		ok: false,
		message: "Server error. Please try again later!",
	};
};
