import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../components/contexts/AuthContext";
import NotFoundScreen from "../screens/common/NotFoundScreen";
import BlogRoutes from "./BlogRoutes";
import AuthRoutes from "./AuthRoutes";

const RouteHandler = () => {
	const { auth } = useAuth();

	if (!auth) return <AuthRoutes />;

	if (auth.type === "INTERNAL" || auth.type === "EXTERNAL") return <BlogRoutes />;

	return <NotFoundScreen />;
};

function MainRouter() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<RouteHandler />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default MainRouter;
