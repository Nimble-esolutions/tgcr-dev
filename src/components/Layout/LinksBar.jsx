"use client";

<<<<<<< HEAD
// component to display a <ul> in the form of a links... used on profile pages etc. 
=======
// component to display a <ul> in the form of a links... used on profile pages etc.
>>>>>>> origin/admin
// { links } is an array in the following format: [{linkText, linkURL, iconClass}]
import Link from "next/link";
import { useState, useEffect } from "react";

const LinksBar = ({ links }) => {
	const [activeLink, setActiveLink] = useState("");

	useEffect(() => {
		// Set the initial active link based on the current URL
<<<<<<< HEAD
		setActiveLink(window.location.pathname);
=======
		setActiveLink(window.location.pathname + window.location.search + window.location.hash);
>>>>>>> origin/admin
	}, []);

	const handleLinkClick = (href) => {
		setActiveLink(href);
	};

	return (
		<ul className="nav-style1">
			{links.map((link, index) => (
				<li key={index}>
<<<<<<< HEAD
					<Link href={link.linkURL} 
						onClick={() => handleLinkClick(link.linkURL)}
						className={activeLink === link.linkURL ? "active" : ""}
					>
						{link.iconClass && <i className={link.iconClass} style={{ marginRight: '8px' }}></i>}
=======
					<Link
						href={link.linkURL}
						onClick={() => handleLinkClick(link.linkURL)}
						className={activeLink === link.linkURL ? "active" : ""}
					>
						{link.iconClass && (
							<i className={link.iconClass} style={{ marginRight: "8px" }}></i>
						)}
>>>>>>> origin/admin
						{link.linkText}
					</Link>
				</li>
			))}
		</ul>
	);
};

<<<<<<< HEAD
export default LinksBar;
=======
export default LinksBar;
>>>>>>> origin/admin
