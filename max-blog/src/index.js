import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

store.subscribe(() => {
	root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
});
