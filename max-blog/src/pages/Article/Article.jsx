import React from "react";
import { nanoid } from "nanoid";

import { Navbar, Glasslabel } from "../../components";
import { data } from "../../redux/Article";
import "./Article.scss";

const atricleDataList = data.map((v, i) => {
	return (
		<div className={`label-${i % 2 ? "right" : "left"}`} key={nanoid()}>
			<Glasslabel />
		</div>
	);
});

export default function Article() {
	return (
		<div className="Article">
			<Navbar />
			<div className="article-content">
				<div className="articleSide"></div>
				<section className="articleSection">
					<div className="articleMain">{atricleDataList}</div>
				</section>
			</div>
		</div>
	);
}
