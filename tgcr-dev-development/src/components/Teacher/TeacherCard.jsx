"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { stripHtmlAndTruncate } from "@/utils/utils";
// TODO: Implementation of HeartButton
import HeartButton from "@/components/FormHelpers/HeartButton";
import { PROFILE_BIO_MINWORDS, PROFILE_MAX_PRICE } from "@/libs/constants";
import { Role } from "@prisma/client";
import { generateStars, calculateAverageRating } from "@/utils/generateStars";
import styles from "./css/TeacherCard.module.css";

const TeacherCard = ({ currentUser, teacher, lang, teacherSearchDict, detailMode }) => {
	// the control is displayed from 2 pages...
	// <TeacherList> (detailMode = false)
	// <TeacherDetails> (detailMode = true)

	// variable minCost, maxCost stores the minimum and maximum cost for the teacher
	const costs = teacher.teacherClassLevelCosts.map((cost) => cost.costPerLesson);
	const minCost = Math.min(...costs); // Get the minimum cost
	const maxCost = Math.max(...costs); // Get the maximum cost

	return (
		<div className="col-lg-12 col-md-12 col-sm-12">
			<div className={styles["teacher-card"]}>
				<div className={styles["row"]}>
					{/* column with the pic and name */}
					<div className={`${styles["column"]} col-lg-3 col-md-3 col-sm-3`}>
						<div className={styles["teacher"]}>
							<Image
								src={teacher.image ? teacher.image : "/images/avatar.jpg"}
								width={200}
								height={200}
								alt={`${teacher.name}'s profile`}
							/>
							<span className={styles["teacher-name"]}>{`${teacher.name}`}</span>
						</div>
					</div>

					{/* column with deeplinks, subjects and language skills */}
					<div className={`${styles["column"]} col-lg-5 col-md-5 col-sm-5`}>
						<ul className={styles["column-content"]}>
							{/* linkedin profile */}
							{teacher.profile.linkedin && (
								<li>
									<i className="bx bxl-linkedin-square"></i>
									<Link
										href={teacher.profile.linkedin}
										target="_new"
										className={styles["action-link"]}
									>
										{teacherSearchDict.linkedinH}
									</Link>
									<i
										className="fas fa-external-link-alt"
										style={{
											fontSize: "10px",
											marginLeft: "5px",
										}}
									></i>
								</li>
							)}
							{/* subjects */}
							{teacher.profile.subjects && (
								<li title={teacherSearchDict.subjectsH}>
									<i className="bx bx-book"></i>
									{teacher.profile.subjects.split(";").join(", ")}
								</li>
							)}
							{/* native and spoken languages */}
							{teacher.profile.nativeLanguage && (
								<li title={teacherSearchDict.nativeLanguageH}>
									<i className="fa-regular fa-comment"></i>
									{teacher.profile.nativeLanguage}
								</li>
							)}
							{teacher.profile.instructionLanguages && (
								<li title={teacherSearchDict.spokenLanguagesH}>
									<i className="fa-solid fa-language"></i>
									{teacher.profile.instructionLanguages.split(";").join(", ")}
								</li>
							)}
							{/* educational qualification, teaching experience and educational boards - shown only in detailed mode */}
							{detailMode && (
								<>
									{teacher.userEducationalQualifications && (
										<li title={teacherSearchDict.educationalQualificationH}>
											<i className="fa-solid fa-graduation-cap"></i>
											{
												teacher.userEducationalQualifications[0]
													.educationalQualification.name
											}
										</li>
									)}
									{teacher.userExperienceLevels && (
										<li title={teacherSearchDict.experienceLevelH}>
											<i className="fa-solid fa-briefcase"></i>
											{teacher.userExperienceLevels[0].experienceLevel.name}
										</li>
									)}
									{teacher.userEducationalBoards && (
										<li title={teacherSearchDict.educationalBoardH1}>
											<i className="fa-solid fa-chalkboard-teacher"></i>
											{teacher.userEducationalBoards
												.map((board) => board.educationalBoard.name) // Extract the name of each educational board
												.join(", ")}
										</li>
									)}
								</>
							)}
						</ul>
					</div>

					{/* column with ratings, reviews etc.  */}
					<div className={`${styles["column"]} col-lg-4 col-md-4 col-sm-4`}>
						<ul className={styles["column-content"]}>
							<div className="text-end">
								{/* average rating and total reviews */}
								{teacher.profile.averageRating && (
									<li>
										{/* <div className={styles["square-rating"]}>
											{teacher.profile.averageRating}
										</div> */}
										<div className={styles["star-rating"]}>
											{generateStars(teacher.profile.averageRating)}
											<span>{`(${teacher.profile.averageRating.toFixed(
												1
											)})`}</span>{" "}
											{teacher.profile.totalReviews && (
												<div className={styles["reviews"]}>
													{teacherSearchDict.totalReviewsH.replace(
														"{number}",
														teacher.profile.totalReviews
													)}
												</div>
											)}
										</div>
									</li>
								)}
								{/* total lessons & active students */}
								{(teacher.profile.totalLessons ||
									teacher.profile.activeStudents) && (
									<li>
										{teacher.profile.totalLessons && (
											<>
												<i
													className="fa-solid fa-users-rectangle fs-6"
													title={teacherSearchDict.totalLessonsH}
												></i>
												{teacher.profile.totalLessons}
											</>
										)}{" "}
										{teacher.profile.activeStudents && (
											<>
												<i
													className="fa-solid fa-users-line"
													style={{ fontSize: "0.85rem" }}
													title={teacherSearchDict.activeStudentsH}
												></i>
												{teacher.profile.activeStudents}
											</>
										)}
									</li>
								)}
								{/* show this only when a student has logged in */}
								{/* range is not displayed in detailMode  */}
								{currentUser && currentUser.role === Role.Student && (
									<>
										{/* prices */}
										{teacher.teacherClassLevelCosts.length > 0 ? (
											<>
												<li>
													<i
														className="fa-solid fa-coins"
														title={teacherSearchDict.pricePerLessonAvgH}
													></i>
													{teacherSearchDict.pricePerLessonAvg.replace(
														"{avg}",
														teacher.profile.costAverage.toFixed(2)
													)}
												</li>
												{!detailMode && (
													<li>
														<i
															className="fa-solid fa-coins"
															title={
																teacherSearchDict.pricePerLessonRange
															}
														></i>
														{teacherSearchDict.pricePerLesson.replace(
															"{range}",
															minCost === maxCost
																? minCost.toFixed(2)
																: `${minCost.toFixed(
																		2
																  )} - ${maxCost.toFixed(2)}`
														)}
													</li>
												)}
											</>
										) : (
											<li>
												<i
													className="fa-solid fa-coins"
													title={teacherSearchDict.pricePerLessonAvgH}
												></i>
												{teacherSearchDict.pricePerLessonE1}
											</li>
										)}
									</>
								)}
								{/* view profile button not to be displayed in the detailMode */}
								{!detailMode && (
									<li>
										<Link
											href={`/${lang}/teacher/${teacher.id}`}
											className="default-btn mt-1"
										>
											{teacherSearchDict.detailsH}
										</Link>
									</li>
								)}
							</div>
						</ul>
					</div>
				</div>

				{/* last row with the bio. Entire bio is displayed in detailMode */}
				<div className={styles["row"]}>
					<div className={styles["column"]}>
						<i className="fa-regular fa-address-card"></i>
						<span className={styles["bio-title"]}>{teacher.profile.bioTitle}</span>
						<span className={styles["bio"]}>
							{": " +
								stripHtmlAndTruncate(
									teacher.profile.bio,
									detailMode
										? teacher.profile.bio.length
										: PROFILE_BIO_MINWORDS * 2
								)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherCard;
