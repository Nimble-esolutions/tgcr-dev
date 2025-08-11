"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { LookupTable } from "@/libs/types";
import styles from "./css/tGCRHome.module.css";

const GetStarted = ({ currentUser, lang, getStartedDict }) => {
	const [subjects, setSubjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSubjects = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.Subject,
				},
			});
			setSubjects(
				response.data.map((subject) => ({
					key: subject.id,
					value: subject.name,
					label: subject.name,
				}))
			);
		};

		setIsLoading(true);
		fetchSubjects();
		setIsLoading(false);
	}, [lang]);

	return (
		<>
			<div className="view-all-courses-area ptb-100 bg-fef8ef">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<div className="view-all-courses-content">
								<span className="sub-title">{getStartedDict.subTitle}</span>
								<h2>{getStartedDict.heading}</h2>
								{!isLoading && subjects.length > 0 && (
									<ul className={styles["subject-list"]}>
										{subjects.map((subject) => (
											<li key={subject.key}>
												<Link
													href={`/${lang}/teacher/search?sk=${subject.label}`}
													className={styles["subject-link"]}
												>
													{subject.label}
												</Link>
											</li>
										))}
									</ul>
								)}
								{isLoading && <p>{getStartedDict.loading}</p>}
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="view-all-courses-image">
								<Image
									src="/images/man-with-laptop.png"
									width={770}
									height={582}
									alt="image"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="shape1">
					<Image src="/images/shape1.png" width={118} height={59} alt="image" />
				</div>
				<div className="shape9">
					<Image src="/images/shape8.svg" width={22} height={22} alt="image" />
				</div>
			</div>
		</>
	);
};

export default GetStarted;
