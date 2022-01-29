export const areObjectsEqual = (a, b) => {
	return Object.entries(a).toString() === Object.entries(b).toString();
};

export const attachParams = (baseUrl, params) => {
	const url = new URL(baseUrl);
	url.search = new URLSearchParams(params).toString();
	return url;
};
