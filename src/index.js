import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainRouter from "./routes";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

ReactDOM.render(
	<React.StrictMode>
		<MainRouter />
	</React.StrictMode>,
	document.getElementById("root")
);
