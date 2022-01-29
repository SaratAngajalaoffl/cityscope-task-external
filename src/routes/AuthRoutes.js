import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthNavbarComponent from "../components/navbar/AuthNavbar";
import LoginScreen from "../screens/auth/login";
import SignupScreen from "../screens/auth/signup";

function AuthRoutes() {
	return (
		<>
			<AuthNavbarComponent />
			<Switch>
				<Route exact path="/signup" component={SignupScreen} />
				<Route exact path="*" component={LoginScreen} />
			</Switch>
		</>
	);
}

export default AuthRoutes;
