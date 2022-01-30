import React from "react";
import { AppBar, Toolbar, ButtonBase, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import LogoComponent from "../logo";
import SignOutIcon from "@mui/icons-material/ExitToApp";
import LocationIcon from "@mui/icons-material/EditLocation";
import { logoutUser } from "../../helpers/user-helper";

import "./styles.css";
import { getCookie } from "../../helpers/storage-helper";

const AdminNavbarComponent = () => {
	const theme = useTheme();

	const handleLogout = () => {
		logoutUser();
	};

	return (
		<AppBar elevation={10} position="static">
			<Toolbar variant="dense" className="navbar-container">
				<div>
					<ButtonBase component={Link} to="/dashboard">
						<LogoComponent />
					</ButtonBase>
				</div>
				<div className="action-items">
					<ButtonBase component={Link} to="/dashboard/select-city">
						<LocationIcon />
						{getCookie("city")}
					</ButtonBase>
					<IconButton onClick={handleLogout}>
						<SignOutIcon style={{ color: theme.palette.primary.contrastText }} />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default AdminNavbarComponent;
