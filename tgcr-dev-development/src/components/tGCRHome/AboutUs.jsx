"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutUs = ({ currentUser, lang, aboutUsDict }) => {
	return (
		<>
			<div className="about-area bg-fef8ef ptb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<div className="about-image">
								<Image
									src="/images/about-img1.png"
									width={600}
									height={500}
									alt="About"
								/>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="about-content">
								<span className="sub-title">{aboutUsDict.subTitle}</span>
								<h2>{aboutUsDict.heading}</h2>
								<p>{aboutUsDict.helpText}</p>

								<ul className="features-list">
									{aboutUsDict.lists.map((list) => (
										<li key={list.id}>
											<span>
												<i className={`${list.icon}`}></i> {list.text}
											</span>
										</li>
									))}
								</ul>

								{/* <Link href={`/${lang}/courses`} className="default-btn">
									<i className="flaticon-user"></i> {aboutUsDict.viewAllCourses}{" "}
									<span></span>
								</Link> */}
							</div>
						</div>
					</div>
				</div>

				<div className="shape1">
					<Image src="/images/shape1.png" width={118} height={59} alt="image" />
				</div>
				<div className="shape4">
					<Image src="/images/shape4.png" width={62} height={62} alt="image" />
				</div>
			</div>
		</>
	);
};

export default AboutUs;
