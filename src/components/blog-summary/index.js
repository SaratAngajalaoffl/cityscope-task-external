import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";
import MDEditor from "@uiw/react-md-editor";
import { useHistory } from "react-router-dom";
import { CardActionArea, CardActions } from "@mui/material";

export default function BlogSummaryCard({ blog }) {
	const history = useHistory();

	return (
		<Card style={{ margin: 20 }}>
			<CardActionArea onClick={() => history.push(`/blog/${blog._id}`)}>
				<CardHeader title={blog.title} subheader={`Posted ${dayjs(blog.createdAt).fromNow()}`} />
				<CardContent>
					<MDEditor.Markdown source={`${blog.body.split("\n")[0]}`} />
				</CardContent>
			</CardActionArea>
			<CardActions>
				<div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", margin: 10 }}>
					{blog.likes.length} people have liked this
				</div>
			</CardActions>
		</Card>
	);
}
