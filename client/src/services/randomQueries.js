import { API_ENDPOINT } from "./config";

export const getTop = async (endPoint) => {
	const response = await fetch(`${API_ENDPOINT}/random_query/${endPoint}`);
	return response.json();
};
