"use client";

import React, { useState } from "react";
import Image from "next/image";
import { generateStars } from "@/utils/generateStars";
import styles from "./css/BookingInfoCard.module.css";

const BookingInfoCard = ({
	lang,
	student,
	studentSchoolInfo,
	teacher,
	costInfo,
	bookingState,
	dict,
}) => {
	// check whether there is a common language between the teacher and the student
	let checkClassLevelTitle = ""; // variables to store the title and value of class levels to be shown in the UI
	let checkClassLevelValue = "";
	if (bookingState.checkCommonClassLevel && bookingState.checkCorrectClassLevel) {
		checkClassLevelTitle = dict.classLevelH;
		checkClassLevelValue = costInfo[0].classLevel.name;
	} else if (bookingState.checkCommonClassLevel && !bookingState.checkCorrectClassLevel) {
		checkClassLevelTitle = dict.noCorrectClassLevelH;
		checkClassLevelValue = dict.noCorrectClassLevel;
	} else if (!bookingState.checkCommonClassLevel && bookingState.checkCorrectClassLevel) {
		checkClassLevelTitle = dict.noCommonClassLevelH;
		checkClassLevelValue = dict.noCommonClassLevel;
	} else {
		// display preference given to noCommonClassLevel error over noCorrectClassLevel error
		checkClassLevelTitle = dict.noCommonClassLevelH;
		checkClassLevelValue = dict.noCommonClassLevel;
	}

	return (
		<div>
			<div className={styles["booking-card"]}>
				<h4>{dict.yourTeacher}</h4>
				<div className={`${styles["row-center"]}`}>
					{/* column with the pic and name */}
					<div className={`${styles["column"]}`}>
						<div className={`${styles["teacher"]}`}>
							<Image
								width={200}
								height={200}
								src={teacher.image}
								alt={`${teacher.name}'s profile`}
							/>
							<span className={styles["teacher-name"]}>{`${teacher.name}`}</span>
						</div>
					</div>
				</div>

				<div className={styles["row-center"]}>
					<div className={`${styles["column"]}`}>
						<ul className={styles["column-content-0"]}>
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
												{dict.totalReviewsH.replace(
													"{number}",
													teacher.profile.totalReviews
												)}
											</div>
										)}
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className={styles["row-100"]}>
					<div className={`${styles["column"]}`}>
						<ul className={styles["column-content-20"]}>
							{/* check if there is a common language between the teacher and the student... if not, show a warning */}
							<li
								title={
									bookingState.checkLanguage
										? dict.spokenLanguageH
										: dict.noCommonLanguageH
								}
							>
								<i className="fa-regular fa-comment"></i>
								{bookingState.checkLanguage ? (
									student.profile.instructionLanguages.split(";")[0]
								) : (
									<>
										{dict.noCommonLanguage}
										<i
											className="fa-solid fa-triangle-exclamation"
											style={{ color: "red", marginLeft: "5px" }}
										></i>
									</>
								)}
							</li>
							{/* check if there is a common educational board between the teacher and the student... if not, show a warning */}
							<li
								title={
									bookingState.checkEducationalBoard
										? dict.educationalBoardH
										: dict.noCommonEducationalBoardH
								}
							>
								<i className="fa-solid fa-chalkboard-teacher"></i>
								{bookingState.checkEducationalBoard ? (
									bookingState.commonEducationalBoards.educationalBoard.name
								) : (
									<>
										{dict.noCommonEducationalBoard}
										<i
											className="fa-solid fa-triangle-exclamation"
											style={{ color: "red", marginLeft: "5px" }}
										></i>
									</>
								)}
							</li>
							{/* checking common grade/class */}
							<li title={checkClassLevelTitle}>
								<i className="fa-solid fa-layer-group"></i>
								{checkClassLevelValue}
								<>
									{!(
										bookingState.checkCommonClassLevel &&
										bookingState.checkCorrectClassLevel
									) && (
										<i
											className="fa-solid fa-triangle-exclamation"
											style={{ color: "red", marginLeft: "5px" }}
										></i>
									)}
								</>
							</li>
							{/* check if there are common subjects between the teacher and the student... if not, show a warning */}
							<li
								title={
									bookingState.checkSubjects
										? dict.subjectsH
										: dict.noCommonSubjectsH
								}
							>
								<i className="bx bx-book"></i>
								{bookingState.checkSubjects ? (
									bookingState.commonSubjects.join(", ")
								) : (
									<>
										{dict.noCommonSubjects}
										<i
											className="fa-solid fa-triangle-exclamation"
											style={{ color: "red", marginLeft: "5px" }}
										></i>
									</>
								)}
							</li>
							{/* pricing */}
							<div className={styles["price"]}>
								<li title={dict.pricePerLessonH}>
									<i className="fa-solid fa-coins"></i>
									{dict.pricePerLesson.replace(
										"{price}",
										costInfo[0].costPerLesson.toFixed(2)
									)}
								</li>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingInfoCard;
