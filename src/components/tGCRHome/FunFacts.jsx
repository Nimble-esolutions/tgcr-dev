"use client";
import React from "react";

const FunFacts = ({
	students = 3,
	enrolls = 4,
	instructors = 2,
	courses = 1000,
	activeLearners,
	enrolledCourses,
	onlineInstructors,
	onDemandCourses,
}) => {
	return (
		<>
			<div className="funfacts-list">
				<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-6">
						<div className="single-funfacts-box">
							<h3>{students}</h3>
							<p>{activeLearners}</p>
						</div>
					</div>

					<div className="col-lg-6 col-md-6 col-sm-6">
						<div className="single-funfacts-box">
							<h3>{enrolls}</h3>
							<p>{enrolledCourses}</p>
						</div>
					</div>

					<div className="col-lg-6 col-md-6 col-sm-6">
						<div className="single-funfacts-box">
							<h3>{instructors}</h3>
							<p>{onlineInstructors}</p>
						</div>
					</div>

					<div className="col-lg-6 col-md-6 col-sm-6">
						<div className="single-funfacts-box">
							<h3>{courses}</h3>
							<p>{onDemandCourses}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FunFacts;
