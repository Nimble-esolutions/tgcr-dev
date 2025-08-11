"use client";

import React from "react";
import Link from "next/link";
import CourseCard from "../Shared/CourseCard";

const PopularCourses = ({
	currentUser,
	courses,
	lang,
	homepage: {
		courseSection: { subTitle, heading, helpText, info },
		registerForFree,
	},
}) => {
	return (
		<>
			<div className="courses-area ptb-100">
				<div className="container">
					<div className="section-title">
						<span className="sub-title">{subTitle}</span>
						<h2>{heading}</h2>
						<p>{helpText}</p>
					</div>

					<div className="row">
						{courses &&
							courses.map((course) => (
								<CourseCard
									key={course.id}
									currentUser={currentUser}
									{...course}
									lang={lang}
								/>
							))}

						<div className="col-lg-12 col-md-12">
							<div className="courses-info">
								<p>
									{info}{" "}
									{!currentUser && (
										<Link href={`/${lang}/auth`}>
											{registerForFree}
										</Link>
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PopularCourses;
