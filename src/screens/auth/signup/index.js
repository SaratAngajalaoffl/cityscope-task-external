import React, { useState } from "react";
import { Card, CardActions, CardContent, Button, TextField, CardHeader, Avatar, InputAdornment, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Send, Mail, Lock } from "@mui/icons-material";
import { registerUser } from "../../../services/auth-service";
import { useAuth } from "../../../components/contexts/AuthContext";
import { saveCookie } from "../../../helpers/storage-helper";

const useStyles = makeStyles({
	card: {
		minWidth: 275,
	},
	extendedIcon: {
		marginRight: 1,
	},
	action: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingRight: "20px",
		paddingLeft: "20px",
	},
});

const SignupScreen = () => {
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("password");
	const { setAuth } = useAuth();

	const handleValidation = () => {
		return email.length > 0 && !validateEmail() && password.length > 4;
	};

	const handleKeyPress = (e) => {
		if (/enter/gi.test(e.key) && handleValidation()) {
			handleClick();
		}
	};

	const handleClick = async () => {
		const { data, error } = await registerUser({ email, password });

		if (!!error) return console.log("---login error", error);

		setAuth(data.data.user);
		saveCookie("accessToken", data.data.accessToken);
		saveCookie("refreshToken", data.data.refreshToken);
	};

	const validateEmail = () => {
		if (email.length < 1) return false;
		return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
	};

	return (
		<div>
			<Card className={classes.card}>
				<CardHeader avatar={<Avatar src="" className={classes.avatar} />} title="Sign Up" />
				<CardContent>
					<TextField
						required
						id="email"
						label="Email"
						helperText="example@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onKeyDown={handleKeyPress}
						error={validateEmail()}
						margin="normal"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Mail />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						required
						id="password"
						label="Password"
						helperText=""
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={handleKeyPress}
						margin="normal"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Lock />
								</InputAdornment>
							),
						}}
					/>
				</CardContent>
				<CardActions className={classes.action}>
					<Typography className={classes.link}>
						Already have an account? <Link to="/login">Login</Link>
					</Typography>
					<Button
						id="btn_login"
						onClick={(e) => handleClick()}
						disabled={!handleValidation()}
						color="primary"
						className={classes.button}
						variant="contained"
					>
						<Send className={classes.extendedIcon} />
						Signup
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};

export default SignupScreen;
