import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import LoadingComponent from "../../../components/loading";
import { commentBlog, getBlog, likeBlog } from "../../../services/blogs-service";
import dayjs from "dayjs";
import { Grid, IconButton, Input, InputAdornment } from "@mui/material";
import FavouriteIcon from "@mui/icons-material/Favorite";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../../components/contexts/AuthContext";

function BlogScreen() {
	const { blogId } = useParams();
	const { auth } = useAuth();

	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState();
	const [activeComment, setActiveComment] = useState("");

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

	const handleComment = async () => {
		try {
			const { data, error } = await commentBlog(blogId, activeComment);

			if (!!error) return console.log(error);

			setActiveComment("");

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
					<InputAdornment position="end">
						<IconButton onClick={handleComment}>
							<SendIcon color="primary" />
						</IconButton>
					</InputAdornment>
				}
			/>
			<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
				{blog.comments.map((comment, ind) => (
					<ListItem key={ind}>
						<ListItemAvatar>
							<Avatar>
								<ImageIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={comment.comment} secondary={dayjs(comment.updatedAt).fromNow()} />
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default BlogScreen;
