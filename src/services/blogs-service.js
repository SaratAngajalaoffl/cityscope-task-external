import { COMMENT_BLOG, CREATE_BLOG, EDIT_BLOG, GET_BLOG, GET_DASHBOARD, GET_DRAFTS, LIKE_BLOG } from "../constants/urls";
import { getRequest, postRequest } from "../helpers/axios-helper";
import { attachParams } from "../helpers/misc_helper";

export const getDashboard = async (filters) => {
	return await getRequest({
		url: attachParams(GET_DASHBOARD, filters),
		noAuth: true,
	});
};

export const getDrafts = async () => {
	return await getRequest({
		url: attachParams(GET_DRAFTS),
		noAuth: true,
	});
};

export const getBlog = async (blogId) => {
	return await getRequest({
		url: attachParams(GET_BLOG, { blogId }),
		noAuth: true,
	});
};

export const likeBlog = async (blogId) => {
	return await getRequest({
		url: attachParams(LIKE_BLOG, { blogId }),
		noAuth: true,
	});
};

export const editBlog = async (blogId, data) => {
	return await postRequest({
		url: attachParams(EDIT_BLOG, { blogId }),
		data,
		noAuth: true,
	});
};

export const createBlog = async (data) => {
	return await postRequest({
		url: attachParams(CREATE_BLOG),
		data,
		noAuth: true,
	});
};

export const commentBlog = async (blogId, comment) => {
	return await postRequest({
		url: attachParams(COMMENT_BLOG, { blogId }),
		data: { comment },
		noAuth: true,
	});
};
