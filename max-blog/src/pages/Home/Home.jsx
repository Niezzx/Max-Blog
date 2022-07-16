import React from "react";

import { Navbar, FutureList } from "../../components";

import "./Home.scss";

import avater from "../../assets/Images/avatar-frame.png";
import avaterPart from "../../assets/Images/avatar-frame2.png";
import randomCardbg from "../../assets/Images/randomCard-bg.png";

export default function Home() {
	return (
		<div className="Home">
			<Navbar />
			<header className="header">
				<div className="header-left">
					<h1>Niezzx </h1>
					<span className="span-1">个人博客</span>
					<span className="span-2">
						用于记录环境搭建，分享编码文章，网络资源
					</span>
				</div>
				<div className="header-right">
					<div className="avatarStructure">
						<img className="avatarPart-1" src={avaterPart} alt="avaterPart" />
						<img className="avatar" src={avater} alt="avatar" />
						<img className="avatarPart-2" src={avaterPart} alt="avaterPart" />
					</div>
				</div>
			</header>
			<div className="randomWrapper">
				<div
					className="randomCardWrapper"
					style={{
						backgroundImage: `url(${randomCardbg})`,
						width: `100vw`,
						height: `600px`,
						backgroundRepeat: `no-repeat`,
						backgroundSize: `cover`,
						opacity: `0.7`,
					}}
				>
					<div className="randomCard"></div>
				</div>
			</div>
			<div className="futureWrapper">
				<FutureList />
			</div>
		</div>
	);
}
