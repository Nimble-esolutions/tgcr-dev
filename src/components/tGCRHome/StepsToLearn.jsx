"use client";

import React from "react";
import Image from "next/image";
import styles from "./css/tGCRHome.module.css";

const StepsToLearn = ({ currentUser, lang, stepsToLearnDict }) => {
	return (
		<>
			<div className="features-area pt-100 pb-70">
				<div className="container">
					<div className="section-title">
						<span className="sub-title">{stepsToLearnDict.subTitle}</span>
						<h2>{stepsToLearnDict.heading}</h2>
						<p>{stepsToLearnDict.helpText}</p>
					</div>

					<div className="row justify-content-center">
						{stepsToLearnDict.steps.map((step) => (
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
				</div>
				<div className={styles["shape3"]}>
					<Image src="/images/shape3.png" width={118} height={59} alt="image" />
				</div>
			</div>
		</>
	);
};

export default StepsToLearn;
