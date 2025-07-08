"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProfileDropdown from "@/components/Layout/ProfileDropdown";
import NavbarSearch from "@/components/Layout/NavbarSearch";
import Image from "next/image";
import Cart from "@/components/Store/Cart";
import styles from "./css/Navbar.module.css";

const Navbar = ({ currentUser, lang, dict }) => {
	const [menu, setMenu] = React.useState(true);

	const toggleNavbar = () => {
		setMenu(!menu);
	};

	useEffect(() => {
		let elementId = document.getElementById("navbar");
		document.addEventListener("scroll", () => {
			if (window.scrollY > 170) {
				elementId.classList.add("is-sticky");
			} else {
				elementId.classList.remove("is-sticky");
			}
		});
	});

	const classOne = menu ? "collapse navbar-collapse" : "collapse navbar-collapse show";
	const classTwo = menu
		? "navbar-toggler navbar-toggler-right collapsed"
		: "navbar-toggler navbar-toggler-right";

	return (
		<>
			<div id="navbar" className="navbar-area">
				<div className="tgcr-nav">
					<div className="container-fluid">
						<div className="navbar navbar-expand-lg navbar-light">
							<Link className="navbar-brand" href={`/${lang}`}>
								<Image
									src="/images/logo-tgcr.png"
									width={120}
									height={40}
									alt="logo"
								/>
							</Link>

							<button onClick={toggleNavbar} className={classTwo} type="button">
								<span className="icon-bar top-bar"></span>
								<span className="icon-bar middle-bar"></span>
								<span className="icon-bar bottom-bar"></span>
							</button>

							<div className={classOne} id="navbarSupportedContent">
								<NavbarSearch lang={lang} dict={dict} />

								<ul className="navbar-nav">
									<motion.li
										className="nav-item"
										whileHover={{
											scale: 1.05,
										}}
										transition={{
											type: "spring",
											damping: 10,
											bounce: 0,
										}}
									>
										<Link href={`/${lang}/about`} className="nav-link">
											{dict.about}
										</Link>
									</motion.li>
									<motion.li
										className="nav-item"
										whileHover={{
											scale: 1.05,
										}}
										transition={{
											type: "spring",
											damping: 10,
											bounce: 0,
										}}
									>
										<Link href={`/${lang}/contact`} className="nav-link">
											{dict.contact}
										</Link>
									</motion.li>

									{!currentUser && (
										<motion.li
											className="nav-item"
											whileHover={{
												scale: 1.05,
											}}
											transition={{
												type: "spring",
												damping: 10,
												bounce: 0,
											}}
										>
											<Link
												href={`/${lang}/auth/register-teacher`}
												className="nav-link"
											>
												{dict.becomeTeacher}
											</Link>
										</motion.li>
									)}
								</ul>
							</div>

							<div className="others-option d-flex align-items-center">
								<Cart lang={lang} dict={dict} />
								<div className="option-item">
									{currentUser ? (
										<ProfileDropdown
											currentUser={currentUser}
											lang={lang}
											profileDropdown={dict.profileDropdown}
										/>
									) : (
										// <Link href={`/${lang}/auth`} className="default-btn">
										// 	<i className="flaticon-user"></i> {dict.loginRegister}{" "}
										// 	<span></span>
										// </Link>
										<ul className="navbar-nav">
											<li>
												<Link
													href={`/${lang}/auth/register-student`}
													className={styles["default-btn-nav"]}
												>
													{dict.signUp}
													<span></span>
												</Link>
											</li>
											<li>
												<Link
													href={`/${lang}/auth/login`}
													className={styles["default-btn-nav"]}
												>
													{dict.signIn} <span></span>
												</Link>
											</li>
										</ul>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
