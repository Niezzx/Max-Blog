import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar() {
	return (
		<nav className="Navbar-nav">
			<li className="nav-home">
				<Link to="/">主页</Link>
			</li>
			<li className="nav-blog">
				<Link to="/Blog">博客</Link>
			</li>
			<li className="nav-article ">
				<Link to="/Article">文章</Link>
			</li>
			<li className="nav-resources">
				<Link to="/Resources">资源</Link>
			</li>
		</nav>
	);
}
