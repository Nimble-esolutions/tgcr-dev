"use client";

import React from "react";
import Image from "next/image";
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
				<div className={styles["banner-shape1"]}>
					<Image src="/images/banner-shape1.png" width={254} height={251} alt="image" />
				</div>
				<div className={styles["banner-shape2"]}>
					<Image src="/images/banner-shape2.png" width={89} height={90} alt="image" />
				</div>
				<div className={styles["banner-shape3"]}>
					<Image src="/images/banner-shape3.png" width={86} height={89} alt="image" />
				</div>
			</div>
		</>
	);
};

export default ASpot;
