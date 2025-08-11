"use client";

import React from "react";
import styles from "./css/tGCRHome.module.css";

const ASpot = ({ currentUser, lang, featureDict }) => {
	return (
		<>
			<div className="features-area pt-100 pb-70">
				<div className="container">
					<div className="section-title">
						<span className="sub-title">{featureDict.subTitle}</span>
						<h2>{featureDict.heading}</h2>
						<p>{featureDict.helpText}</p>
					</div>

					<div className="row justify-content-center">
						{featureDict.features.map((fte) => (
							<div className="col-lg-4 col-sm-6 col-md-6" key={fte.id}>
								<div className="single-features-box">
									<div className={styles["feature-icon"]}>
										<i className={`${fte.icon}`}></i>
									</div>
									<h3>{fte.title}</h3>
									<p>{fte.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ASpot;
