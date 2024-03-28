import { Application } from "@/models/models";
import { delay } from "./helper";
import { ServiceResult } from "./ServiceResult";

export const submitApplication = async (
	app: Application
): Promise<ServiceResult<Application>> => {
	await delay(2000);

	return {
		ok: true,
		data: app,
		message: "all good!",
	};
};
