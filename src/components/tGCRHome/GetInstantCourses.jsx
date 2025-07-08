"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const GetInstantCourses = ({
	currentUser,
	lang,
	homepage: {
		getInstantSection: { subTitle, heading, helpText },
		registerForFree,
		viewAllCourses,
	},
}) => {
	return (
		<>
			<div className="get-instant-courses-area ptb-100">
				<div className="container">
					<div className="get-instant-courses-inner-area">
						<div className="row align-items-center">
							<div className="col-lg-8 col-md-12">
								<div className="get-instant-courses-content">
									<span className="sub-title">
										{subTitle}
									</span>
									<h2>{heading}</h2>
									<p>{helpText}</p>

									{currentUser ? (
										<Link
											href={`/${lang}/learning/my-courses/`}
											className="default-btn"
										>
											<i className="flaticon-user"></i>{" "}
											{viewAllCourses} <span></span>
										</Link>
									) : (
										<Link
											href={`/${lang}/auth`}
											className="default-btn"
										>
											<i className="flaticon-user"></i>{" "}
											{registerForFree} <span></span>
										</Link>
									)}
								</div>
							</div>

							<div className="col-lg-4 col-md-12">
								<div className="get-instant-courses-image">
									<Image
										src="/images/man.jpg"
										width={700}
										height={750}
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

export default GetInstantCourses;
