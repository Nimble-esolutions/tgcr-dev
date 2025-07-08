"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BannerCourses from "./BannerCourses";
import Image from "next/image";

const Banner = ({ currentUser, courses = [], homepage, lang }) => {
	return (
		<>
			<div className="main-banner">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<div className="main-banner-content">
								<h1>{homepage.banner_heading}</h1>
								<p>{homepage.banner_para}</p>

								<motion.div whileTap={{ scale: 0.9 }}>
									{currentUser ? (
										<Link
											href={`/${lang}/courses`}
											className="default-btn"
										>
											<i className="flaticon-user"></i>{" "}
											{homepage.btnText} <span></span>
										</Link>
									) : (
										<Link
											href={`/${lang}/auth`}
											className="default-btn"
										>
											<i className="flaticon-user"></i>{" "}
											{homepage.joinFree} <span></span>
										</Link>
									)}
								</motion.div>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="main-banner-courses-list">
								<div className="row">
									{courses &&
										courses.map((course) => (
											<BannerCourses
												key={course.id}
												{...course}
												lang={lang}
											/>
										))}
								</div>

								<div className="banner-shape1">
									<Image
										src="/images/banner-shape1.png"
										width={254}
										height={251}
										alt="image"
									/>
								</div>
								<div className="banner-shape2">
									<Image
										src="/images/banner-shape2.png"
										width={89}
										height={90}
										alt="image"
									/>
								</div>
								<div className="banner-shape3">
									<Image
										src="/images/banner-shape3.png"
										width={86}
										height={89}
										alt="image"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Banner;
