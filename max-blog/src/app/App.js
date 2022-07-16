import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Blog, Article, Resources } from "../pages";

import "./App.scss";

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/Blog" element={<Blog />}></Route>
				<Route path="/Article" element={<Article />}></Route>
				<Route path="/Resources" element={<Resources />}></Route>
			</Routes>
		</div>
	);
}
