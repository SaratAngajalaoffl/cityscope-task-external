export const getCookie = (key) => {
	const storage = localStorage.getItem(key);
	return storage || "";
};

export const getJSONCookie = (key) => {
	const json = JSON.parse(localStorage.getItem(key));
	return json || {};
};

export const deleteCookie = (key) => {
	localStorage.removeItem(key);
	return getCookie(key) === "";
};

export const saveJSONCookie = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
	return getCookie(key) !== "";
};

export const saveCookie = (key, value) => {
	localStorage.setItem(key, value);
	return getCookie(key) !== "";
};
