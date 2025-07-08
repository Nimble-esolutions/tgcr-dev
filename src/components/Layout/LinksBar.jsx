"use client";

// component to display a <ul> in the form of a links... used on profile pages etc. 
// { links } is an array in the following format: [{linkText, linkURL, iconClass}]
import Link from "next/link";
import { useState, useEffect } from "react";

const LinksBar = ({ links }) => {
	const [activeLink, setActiveLink] = useState("");

	useEffect(() => {
		// Set the initial active link based on the current URL
		setActiveLink(window.location.pathname);
	}, []);

	const handleLinkClick = (href) => {
		setActiveLink(href);
	};

	return (
		<ul className="nav-style1">
			{links.map((link, index) => (
				<li key={index}>
					<Link href={link.linkURL} 
						onClick={() => handleLinkClick(link.linkURL)}
						className={activeLink === link.linkURL ? "active" : ""}
					>
						{link.iconClass && <i className={link.iconClass} style={{ marginRight: '8px' }}></i>}
						{link.linkText}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default LinksBar;