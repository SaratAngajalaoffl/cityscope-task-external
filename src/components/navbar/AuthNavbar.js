import React from "react";
import { AppBar, Toolbar, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";
import LogoComponent from "../logo";

const AuthNavbarComponent = () => {
	return (
		<AppBar elevation={10} position="static">
			<Toolbar variant="dense" style={{ paddingLeft: 10 }}>
				<ButtonBase component={Link} to="/login">
					<LogoComponent />
				</ButtonBase>
			</Toolbar>
		</AppBar>
	);
};

export default AuthNavbarComponent;
