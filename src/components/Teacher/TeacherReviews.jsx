"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { UIDate } from "@/utils/dateUtils";
import { generateStars } from "@/utils/generateStars";
import styles from "./css/TeacherReviews.module.css";

const TeacherReviews = ({ lang, currentUser, feedback, teacherSearchDict, lookupAPIDict }) => {
	return (
		<div className={`${styles["review-comments"]}`}>
			<h4 className="mb-4">
				{feedback.length > 0
					? teacherSearchDict.totalReviewsH.replace("{number}", feedback.length)
					: teacherSearchDict.totalReviewsE1}
			</h4>
			{feedback &&
				feedback.length > 0 &&
				feedback.map((lessonRequest) => (
					<div key={lessonRequest.id} className={styles["user-review"]}>
						{/* LessonRequest level */}
						{lessonRequest.lesson.feedback && (
							// {/* Feedback (lesson.feedback) */}
							<div>
								<div className={styles["review-header"]}>
									<label className={styles["comments-bold"]}>
										{/* only date is displayed in UTC */}
										{UIDate(lessonRequest.lesson.feedback.createdOn)}
									</label>
									<label className={styles["comments"]}>{" | "}</label>
									<label className={styles["comments-bold"]}>
										{lessonRequest.student.name}
									</label>
									<label className={styles["comments"]}>{" | "}</label>
									<label className={styles["comments"]}>
										{lessonRequest.lesson.feedback.remarks}
									</label>
								</div>
								<br />
								{/* FeedbackDetails (lesson.feedback.feedbackDetails) */}
								{lessonRequest.lesson.feedback.feedbackDetails &&
								lessonRequest.lesson.feedback.feedbackDetails.length > 0 ? (
									<div className={styles["sub-ratings"]}>
										{lessonRequest.lesson.feedback.feedbackDetails.map(
											(detail) => (
												<div
													key={detail.id}
													className={styles["rating-col"]}
												>
													{/* FeedbackAttribute info */}
													{/* FeedbackDetail info */}
													<div>
														<div className={styles["review-rating"]}>
															<div className={styles["review-stars"]}>
																{generateStars(
																	detail.feedbackAttributeValue
																)}
																<label>
																	{
																		lookupAPIDict[
																			"feedback." +
																				detail
																					.feedbackAttribute
																					?.key
																		]
																	}
																</label>
															</div>
														</div>
													</div>
												</div>
											)
										)}
									</div>
								) : (
									<div>No feedback details.</div>
								)}
							</div>
						)}
					</div>
				))}
			{/* // TODO: show flagged testimonials (to be passed as a parameter) */}
			{/* <Swiper
				pagination={{
					dynamicBullets: true,
					clickable: true,
				}}
				modules={[Pagination]}
				className="mySwiper feedback-slides"
			>
				{testimonials.length > 0 &&
					testimonials.map((teste) => (
						<SwiperSlide key={teste.id}>
							<div className="single-feedback-item">
								<p>{teste.description}</p>

								<div className="client-info d-flex align-items-center">
									<Image
										src={teste.image}
										width={200}
										height={200}
										className="rounded-circle"
										alt="image"
									/>
									<div className="title">
										<h3>{teste.name}</h3>
										<span>{teste.bioTitle}</span>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
			</Swiper> */}
		</div>
	);
};

export default TeacherReviews;
