"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./css/tGCRHome.module.css";
import navButtonStyles from "../Layout/css/Navbar.module.css";

const BecomeTeacher = ({ currentUser, lang, becomeTeacherDict }) => {
	return (
		<div className="bg-fef8ef ptb-100">
			<div className="about-area">
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
								<span className="sub-title">{becomeTeacherDict.subTitle}</span>
								<h2>{becomeTeacherDict.heading}</h2>
								<p>{becomeTeacherDict.helpText}</p>

								<ul className="features-list">
									{becomeTeacherDict.benefits.map((benefit) => (
										<li key={benefit.id}>
											<div className={styles["list-icon"]}>
												<i className={`${benefit.icon}`}></i>
												<b>{benefit.title}</b>
											</div>
											<p>{benefit.description}</p>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className={styles["shape4"]}>
					<Image src="/images/shape4.png" width={118} height={59} alt="image" />
				</div>
			</div>
			<div className="features-area mt-5">
				<div className="container">
					<div className="section-title">
						<span className="sub-title">{becomeTeacherDict.subTitleSteps}</span>
						<h2>{becomeTeacherDict.headingSteps}</h2>
					</div>

					<div className="row justify-content-center">
						{becomeTeacherDict.steps.map((step) => (
							<div className="col-lg-4 col-sm-6 col-md-6" key={step.id}>
								<div className="single-features-box">
									<div className={styles["feature-icon"]}>
										<i className={`${step.icon}`}></i>
									</div>
									<h3>{step.title}</h3>
									<p>{step.description}</p>
								</div>
							</div>
						))}
					</div>
					<div className="d-flex justify-content-center">
						<Link
							href={`/${lang}/auth/register-teacher`}
							className={navButtonStyles["default-btn-nav"]}
						>
							{becomeTeacherDict.becomeTutor}
							<span></span>
						</Link>
					</div>
				</div>
				<div className={styles["shape12"]}>
					<Image src="/images/shape12.png" width={62} height={62} alt="image" />
				</div>
			</div>
		</div>
	);
};

export default BecomeTeacher;
