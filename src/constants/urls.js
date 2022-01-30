const BASE_URL = "http://localhost:8080";

// Auth Routes

const AUTH_BASE = `${BASE_URL}/auth`;

export const LOGIN_ROUTE = `${AUTH_BASE}/login`;

export const REGISTER_ROUTE = `${AUTH_BASE}/register`;

export const REFRESH_TOKEN_ROUTE = `${AUTH_BASE}/refresh`;

// Blog Routes

const BLOGS_BASE = `${BASE_URL}/blogs`;

export const GET_DASHBOARD = `${BLOGS_BASE}/get-dashboard-data`;

export const GET_DRAFTS = `${BLOGS_BASE}/get-drafts`;

export const CREATE_BLOG = `${BLOGS_BASE}/create-blog`;

export const EDIT_BLOG = `${BLOGS_BASE}/edit-blog`;

export const GET_BLOG = `${BLOGS_BASE}/get-blog`;

export const LIKE_BLOG = `${BLOGS_BASE}/like-blog`;

export const COMMENT_BLOG = `${BLOGS_BASE}/comment-blog`;
