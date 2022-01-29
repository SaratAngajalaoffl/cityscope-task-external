import React, { useEffect, useState } from "react";
import LoadingComponent from "../../../components/loading";
import { getDashboard } from "../../../services/blogs-service";
import BlogSummaryCard from "../../../components/blog-summary";

function DashboardScreen() {
	const [blogs, setBlogs] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data, error } = await getDashboard();

				if (!!error) return error;

				setBlogs(data.data);

				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <LoadingComponent />;

	return (
		<div style={{ height: "100%" }}>
			{blogs.length < 1 && <h1 style={{ width: "100%", height: "90%", display: "grid", placeItems: "center" }}>No Blogs Found</h1>}
			{blogs.map((blog, index) => (
				<BlogSummaryCard key={index} blog={blog} />
			))}
		</div>
	);
}

export default DashboardScreen;
