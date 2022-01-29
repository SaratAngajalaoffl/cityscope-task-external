import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants/urls";
import { postRequest } from "../helpers/axios-helper";

export const loginUser = async (data) => {
	return await postRequest({
		url: LOGIN_ROUTE,
		data,
	});
};

export const registerUser = async (data) => {
	return await postRequest({
		url: REGISTER_ROUTE,
		data,
	});
};
