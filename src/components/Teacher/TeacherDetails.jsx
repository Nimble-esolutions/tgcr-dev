"use client";

import React from "react";
import Link from "next/link";
import TeacherCard from "@/components/Teacher/TeacherCard";
import TeacherReviews from "@/components/Teacher/TeacherReviews";
import { Role } from "@prisma/client";
import { SEARCH_QPARAMS } from "@/libs/constants";
import styles from "./css/TeacherDetails.module.css";

const TeacherDetails = ({
	lang,
	currentUser,
	teacher,
	feedback,
	studentClassLevel,
	teacherSearchDict,
	lookupAPIDict,
}) => {
	// this is just a dummy queryParams... need to replace() "classLevel" etc. for querystring
	const queryParams = new URLSearchParams({
		[SEARCH_QPARAMS.CLASS_LEVEL]: "classLevel",
	}).toString();

	return (
		<>
			{/* show the TeacherCard in detail */}
			<TeacherCard
				currentUser={currentUser}
				teacher={teacher}
				lang={lang}
				teacherSearchDict={teacherSearchDict}
				detailMode={true}
			/>
			{/* show pricing information - show this only when a student has logged in */}
			{currentUser && currentUser.role === Role.Student && (
				<div className="mt-4 mb-4">
					<div className={styles["pricing-container"]}>
						<h4 className="mb-4">
							{teacher.teacherClassLevelCosts.length > 0
								? teacherSearchDict.pricePerLessonH
								: teacherSearchDict.pricePerLessonE1}
						</h4>
						<p style={{ fontStyle: "italic" }}>{teacherSearchDict.pricePerLessonH1}</p>
						<div className={styles["pricing-header"]}>
							<div className={`${styles["pricing-cell"]} text-start`}>
								{teacherSearchDict.classLevel}
							</div>
							<div className={`${styles["pricing-cell"]} text-end`}>
								{teacherSearchDict.price}
							</div>
							{/* <div className={styles["pricing-cell"]}>Currency</div> */}
							<div className={styles["pricing-cell"]}> </div>
						</div>
						{teacher.teacherClassLevelCosts
							.sort((a, b) => a.classLevel.position - b.classLevel.position)
							.map((cost) => (
								<div
									key={cost.id}
									className={
										studentClassLevel &&
										studentClassLevel.classLevelId === cost.classLevelId
											? styles["pricing-row-highlighted"]
											: styles["pricing-row"]
									}
								>
									<div className={`${styles["pricing-cell"]} text-start`}>
										{cost.classLevel.name}
									</div>
									<div className={`${styles["pricing-cell"]} text-end`}>
										{cost.costPerLesson.toFixed(2)}
									</div>
									{/* <div className={styles["pricing-cell"]}>{cost.currency}</div> */}
									<div className={`${styles["pricing-cell"]} text-end`}>
										<Link
											href={`/${lang}/teacher/book/${
												teacher.id
											}?${queryParams.replace(
												"classLevel",
												cost.classLevelId
											)}`}
											className="default-btn mt-2"
										>
											{teacherSearchDict.bookLesson}
										</Link>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
			{/* Show reviews */}
			<div className="mt-4 mb-4">
				<TeacherReviews
					lang={lang}
					currentUser={currentUser}
					feedback={feedback}
					teacherSearchDict={teacherSearchDict}
					lookupAPIDict={lookupAPIDict}
				/>
			</div>
		</>
	);
};

export default TeacherDetails;
