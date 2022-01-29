import { deleteCookie } from "./storage-helper";

export const logoutUser = () => {
	deleteCookie("accessToken");
	deleteCookie("refreshToken");
	deleteCookie("auth");
	window.location.replace("/login");
};
