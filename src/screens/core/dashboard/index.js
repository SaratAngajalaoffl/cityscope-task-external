import React, { useEffect, useState } from "react";
import LoadingComponent from "../../../components/loading";
import { getDashboard } from "../../../services/blogs-service";
import BlogSummaryCard from "../../../components/blog-summary";
import DialogComponent from "./DialogComponent";
import { getCookie, saveCookie } from "../../../helpers/storage-helper";
import { Grid, Typography, Button, DialogContentText, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const BLOG_CATEGORIES = ["Employment", "Tourism", "Culture", "Finance", "Housing"];

function DashboardScreen() {
	const [blogs, setBlogs] = useState([]);

	const [loading, setLoading] = useState(true);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [categories, setCategories] = useState(JSON.parse(getCookie("categories")));

	useEffect(() => {
		(async () => {
			try {
				const filters = {};

				if (getCookie("city").length > 0) filters.city = getCookie("city");

				console.log({ categories });

				if (categories.length > 0) filters.categories = categories;

				const { data, error } = await getDashboard(filters);

				if (!!error) return error;

				setBlogs(data.data);

				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		})();
	}, [isFiltersOpen]);

	useEffect(() => {
		saveCookie("categories", JSON.stringify(categories));
	}, [categories]);

	const handleCheckbox = (cat) => {
		const ind = categories.indexOf(cat);

		if (ind === -1) setCategories((oldval) => [...oldval, cat]);
		else setCategories((oldval) => oldval.filter((i) => i !== cat));
	};

	if (loading) return <LoadingComponent />;

	return (
		<div style={{ height: "100%" }}>
			<DialogComponent />
			<Dialog open={isFiltersOpen} onClose={() => setIsFiltersOpen((oldval) => !oldval)}>
				<DialogTitle>Filter</DialogTitle>
				<DialogContent>
					<FormGroup>
						{BLOG_CATEGORIES.map((cat, ind) => (
							<FormControlLabel
								key={ind}
								control={<Checkbox checked={categories.indexOf(cat) >= 0} onChange={() => handleCheckbox(cat)} />}
								label={cat}
							/>
						))}
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsFiltersOpen((oldval) => !oldval)}>Save</Button>
				</DialogActions>
			</Dialog>
			<Grid container justifyContent="space-between">
				<Grid item xs={4} style={{ margin: 20 }}>
					{blogs.length > 0 && <Typography variant="h4">Popular in your area</Typography>}
				</Grid>
				<Grid item xs={1} style={{ margin: 20 }}>
					<Button variant="contained" fullWidth onClick={() => setIsFiltersOpen(true)}>
						Filter
					</Button>
				</Grid>
			</Grid>
			{blogs.length < 1 && <h1 style={{ width: "100%", height: "90%", display: "grid", placeItems: "center" }}>No Blogs Found</h1>}
			{blogs.map((blog, index) => (
				<BlogSummaryCard key={index} blog={blog} />
			))}
		</div>
	);
}

export default DashboardScreen;
