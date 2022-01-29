import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminNavbarComponent from "../components/navbar/AdminNavbar";
import BlogScreen from "../screens/core/blog";
import DashboardScreen from "../screens/core/dashboard";

function AdminRoutes() {
	return (
		<>
			<AdminNavbarComponent />
			<Switch>
				<Route exact path="/blog/:blogId" component={BlogScreen} />
				<Route path="*" component={DashboardScreen} />
			</Switch>
		</>
	);
}

export default AdminRoutes;
