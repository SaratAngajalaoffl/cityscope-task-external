import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { deleteCookie, getCookie, saveCookie } from "../../../helpers/storage-helper";
import { useHistory, useLocation } from "react-router-dom";

export const CITIES = [
	"Adilabad",
	"Anantapur",
	"Chittoor",
	"Kakinada",
	"Guntur",
	"Hyderabad",
	"Karimnagar",
	"Khammam",
	"Krishna",
	"Kurnool",
	"Mahbubnagar",
	"Medak",
	"Nalgonda",
	"Nizamabad",
	"Ongole",
	"Hyderabad",
	"Srikakulam",
	"Nellore",
	"Visakhapatnam",
	"Vizianagaram",
	"Warangal",
	"Eluru",
	"Kadapa",
];

function DialogComponent() {
	const [open] = React.useState(getCookie("city")?.length <= 0);
	const { pathname } = useLocation();
	const history = useHistory();

	const handleClose = () => {
		deleteCookie("city");
	};

	const handleListItemClick = (value) => {
		saveCookie("city", value);
		history.push("/dashboard");
		window.location.reload();
	};

	return (
		<Dialog onClose={handleClose} open={pathname.indexOf("select-city") > -1 || open}>
			<DialogTitle>Select City</DialogTitle>
			<List sx={{ pt: 0 }}>
				{CITIES.map((email) => (
					<ListItem button onClick={() => handleListItemClick(email)} key={email}>
						<ListItemText primary={email} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}

export default DialogComponent;
