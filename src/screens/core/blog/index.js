import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import LoadingComponent from "../../../components/loading";
import { getBlog, likeBlog } from "../../../services/blogs-service";
import dayjs from "dayjs";
import { Grid, IconButton, Input, InputAdornment } from "@mui/material";
import FavouriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../../components/contexts/AuthContext";

function BlogScreen() {
	const { blogId } = useParams();
	const { auth } = useAuth();

	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState();
	const [activeComment, setActiveComment] = useState();

	useEffect(() => {
		(async () => {
			try {
				const { data, error } = await getBlog(blogId);

				if (!!error) return console.log(error);

				setBlog(data.data);

				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		})();
	}, [blogId]);

	const handleLike = async () => {
		try {
			const { data, error } = await likeBlog(blogId);

			if (!!error) return console.log(error);

			setBlog(data.data);

			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	if (loading) return <LoadingComponent />;

	return (
		<div style={{ padding: 20 }}>
			<h1>{blog.title}</h1>
			<h4 style={{ color: "grey" }}>Posted {dayjs(blog.createdAt).fromNow()}</h4>
			<div style={{ height: 30 }} />
			<MDEditor.Markdown source={blog.body} />
			{/* {JSON.stringify(auth)} */}
			<h3 style={{ color: "#333333", textAlign: "center", margin: 20 }}> - - - XXX - - -</h3>
			<Grid container spacing={3} alignItems="center" style={{ marginLeft: -5 }}>
				<IconButton onClick={handleLike}>
					<FavouriteIcon style={{ color: blog.likes.indexOf(auth._id) > -1 ? "#ff0000" : undefined }} />
				</IconButton>
				{blog.likes.length}
				<IconButton>
					<CommentIcon />
				</IconButton>
				{blog.comments.length}
			</Grid>
			<div style={{ height: 30 }} />
			<Input
				placeholder="Comment ..."
				fullWidth
				variant="standard"
				value={activeComment}
				onChange={(e) => setActiveComment(e.target.value)}
				endAdornment={
					<InputAdornment>
						<IconButton>
							<SendIcon color="primary" />
						</IconButton>
					</InputAdornment>
				}
			/>
			{blog.comments.map(() => Comment.title)}
		</div>
	);
}

export default BlogScreen;
