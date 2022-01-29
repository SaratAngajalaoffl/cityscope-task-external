import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, MenuItem, TextField } from "@mui/material";
import { createBlog } from "../../../services/blogs-service";
import { useHistory } from "react-router-dom";

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

const BLOG_CATEGORIES = ["Employment", "Tourism", "Culture", "Finance", "Housing"];

function DialogComponent({ open, handleClose, setLoading }) {
	const [city, setCity] = useState(CITIES[0]);
	const [category, setCategory] = useState(BLOG_CATEGORIES[0]);

	const history = useHistory();

	const handleCreateBlog = async () => {
		try {
			setLoading(true);

			const { data, error } = await createBlog({ city, category });

			if (!!error) return console.log(error);

			history.push(`/edit/${data.data._id}`);

			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{"Select demographics for the blog"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<Grid container>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="outlined-select-currency"
								select
								value={city}
								onChange={(e) => setCity(e.target.value)}
								helperText="Select Demographic City"
							>
								{CITIES.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="outlined-select-currency"
								fullWidth
								select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								helperText="Select Category"
							>
								{BLOG_CATEGORIES.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleCreateBlog}>Create</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DialogComponent;
