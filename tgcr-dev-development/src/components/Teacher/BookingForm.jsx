"use client";

import React, { useEffect, useState, useCallback } from "react";
import { UIDate, UIDayDate } from "@/utils/dateUtils";
import { LESSON_BOOKING_MAX_WEEKS } from "@/libs/constants";
import { generateLessonId } from "@/utils/cartUtils";
import { useCartStore } from "@/store/cartStore";
// import { useCouponStore } from "@/store/couponStore";
import BookingInfoCard from "@/components/Teacher/BookingInfoCard";
import styles from "./css/BookingForm.module.css";

// PHASE-X: Include the morning/afternoon/evening filters in the timeslots
// TODO: Disallow selection of the pre-selected timeslots.
const BookingForm = ({
	lang,
	student,
	studentSchoolInfo,
	teacher,
	costInfo,
	bookingState,
	dict,
}) => {
	const [currentWeekOffset, setCurrentWeekOffset] = useState(0); // offset from the currently selected week; 0 => current week, -1 = last week, 1 = next week, etc.
	const [teacherAvailability, setTeacherAvailability] = useState([]); // array of all teacher's available timeslots for the current week
	const [isLoading, setIsLoading] = useState(true);
	const [isWarningVisible, setIsWarningVisible] = useState(false); // show/hide the initial warning dialog
	const { add: addToCart, remove: removeFromCart, cart } = useCartStore((state) => state); // cart store is used to store the lesson booking information
	// const { discount } = useCouponStore((state) => state); // coupon store is used to store the discount information

	const fetchTeacherAvailability = useCallback(async () => {
		setIsLoading(true);
		try {
			const startDate = generateWeekStartDate(currentWeekOffset);
			const response = await fetch(
				`/api/teacher/weeklyts?lang=${lang}&id=${teacher.id}&sd=${
					startDate.toISOString().split("T")[0]
				}&ts=${new Date().toISOString()}`
			);
			if (!response.ok) {
				throw new Error(`${response.statusText}`);
			}
			const availability = await response.json();
			setTeacherAvailability(availability);
		} catch (error) {
			return null;
		} finally {
			setIsLoading(false);
		}
	}, [currentWeekOffset, lang, teacher.id]); // <-- include dependencies used inside

	const getAvailableTimeslotForDate = (date) => {
		// Filter the teacherAvailability and get all timeslots for the specified date
		// timeslots are not convered into readable format here
		if (!teacherAvailability || teacherAvailability.length === 0) {
			return [];
		}
		return teacherAvailability.filter((slot) => {
			return (
				new Date(slot.startTime).toISOString().split("T")[0] ===
				date.toISOString().split("T")[0]
			);
		});
		// .map((slot) =>
		// 	// Convert the start time to a readable format with AM/PM
		// 	new Date(slot.startTime).toLocaleTimeString([], {
		// 		hour: "2-digit",
		// 		minute: "2-digit",
		// 		hour12: true, // Display AM/PM
		// 	})
		// );
	};

	const generateWeekStartDate = (offset) => {
		// gets the start date of the week for the given offset (always set to Monday of the week)
		const today = new Date();
		const startDate = new Date(today);
		startDate.setDate(today.getDate() + offset * 7);
		// Adjust startDate to the nearest Monday
		const dayOfWeek = startDate.getDay();
		const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday (0) should go back 6 days, others go back dayOfWeek - 1
		startDate.setDate(startDate.getDate() - daysToMonday);
		return startDate;
	};

	const generateHeaderDates = (offset) => {
		// Generate an array of dates for the week starting from Monday + offset weeks. This is the header row for the calendar
		// Offset "0" means the current week, "1" means next week, "-1" means last week, etc.
		const dates = [];
		const startDate = generateWeekStartDate(offset);
		for (let i = 0; i < 7; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			dates.push(date);
		}
		return dates;
	};

	const handleLastWeek = () => {
		if (currentWeekOffset === 0) {
			// if the current week is the first week, do not allow to go back
			return;
		}
		setCurrentWeekOffset((prev) => prev - 1);
	};

	const handleToday = () => {
		// reset to the current week
		setCurrentWeekOffset(0);
	};

	const handleNextWeek = () => {
		if (currentWeekOffset === LESSON_BOOKING_MAX_WEEKS) {
			// if the current week is the last week, do not allow to go forward
			return;
		}
		setCurrentWeekOffset((prev) => prev + 1);
	};

	const handleDialogClose = () => {
		setIsWarningVisible(false);
	};

	const handleLessonBooking = (
		studentId,
		teacherId,
		teacherName,
		startTime,
		teacherClassLevelCostId,
		classLevelName,
		pricePerLesson,
		lessonId
	) => {
		// handle the booking of a lesson (acting as a toggle button for the cart)
		// information is only stored in cart for the moment - only persisted in the session and not the database
		if (cart.some((cartItem) => cartItem.id === lessonId)) {
			removeFromCart(lessonId);
		} else {
			addToCart({
				id: lessonId,
				studentId,
				teacherId,
				teacherName,
				startTime,
				studentTimezoneIdentifier: student.timezone.tzIdentifier, // for time transformation on UI
				teacherClassLevelCostId,
				classLevelName,
				price: pricePerLesson,
			});
		}
	};

	useEffect(() => {
		// initialize teacher's availability
		async function fetchAvailability() {
			await fetchTeacherAvailability();
		}
		if (!bookingState.requestState) {
			// show the warning dialog if the booking state is not valid
			setIsWarningVisible(true);
		}
		fetchAvailability();
	}, [bookingState, fetchTeacherAvailability]);

	useEffect(() => {
		// week has changed; fetch the new timeslots for the selected week
		async function fetchAvailability() {
			await fetchTeacherAvailability();
		}
		fetchAvailability();
	}, [currentWeekOffset, fetchTeacherAvailability]);

	const headerDates = generateHeaderDates(currentWeekOffset);
	console.log({ cart, teacherAvailability });

	return (
		<div className="row">
			{/* show the TeacherCard in detail */}
			<div className="col-lg-3 col-md-3 col-sm-3">
				<BookingInfoCard
					lang={lang}
					student={student}
					studentSchoolInfo={studentSchoolInfo}
					teacher={teacher}
					costInfo={costInfo}
					bookingState={bookingState}
					dict={dict}
				/>
			</div>
			{/* booking dates and timeslots */}
			<div className="col-lg-9 col-md-9 col-sm-9">
				<div className={styles["schedule-container"]}>
					<h4 className="mb-4">{dict.selectTimeslot}</h4>
					<p style={{ fontStyle: "italic" }}>{dict.selectTimeslotH}</p>
					{/* week navigation header */}
					<div className={styles["week-navigation"]}>
						<h5>
							{`${UIDate(headerDates[0], student.timezone.tzIdentifier)} - ${UIDate(
								headerDates[6],
								student.timezone.tzIdentifier
							)}`}
						</h5>
						<div>
							<button
								type="button"
								title={dict.lastWeek}
								onClick={handleLastWeek}
								disabled={currentWeekOffset === 0}
							>
								<i className="fa-solid fa-backward"></i>
							</button>
							<button type="button" title={dict.today} onClick={handleToday}>
								{dict.today}
							</button>
							<button
								type="button"
								title={dict.nextWeek}
								onClick={handleNextWeek}
								disabled={currentWeekOffset === LESSON_BOOKING_MAX_WEEKS}
							>
								<i className="fa-solid fa-forward"></i>
							</button>
						</div>
					</div>
					<div className={styles["dates-row"]}>
						{/* days' header row - always displayed */}
						{headerDates.map((date) => {
							return (
								<div
									key={date.toDateString()}
									className={styles["date-with-slots"]}
								>
									<div className={styles["date-label"]}>
										{UIDayDate(date, student.timezone.tzIdentifier)}
									</div>
								</div>
							);
						})}

						{isLoading || teacherAvailability.length === 0 ? (
							<div className={styles["message-row"]}>
								{isLoading
									? dict.fetchingAvailableSlots + " "
									: dict.noAvailableSlots}
								{isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
							</div>
						) : (
							<>
								{headerDates.map((date) => {
									const timeslots = getAvailableTimeslotForDate(date);
									return (
										<div
											key={date.toDateString()}
											className={styles["times-column"]}
										>
											{/* 
												timeslots - rendered conditionally...
												... student cannot book the lessons in the past
												... the lessons already in the cart are highlighted
											*/}
											{timeslots.length > 0 &&
												timeslots.map((timeslot) => {
													const startTime = new Date(timeslot.startTime);
													const lessonId = generateLessonId(
														student.id,
														teacher.id,
														startTime
													);
													const cssClassName =
														startTime.toISOString() >=
														new Date().toISOString()
															? cart.some(
																	(cartItem) =>
																		cartItem.id === lessonId
															  )
																? styles["time-slot-highlighted"]
																: styles["time-slot"]
															: styles["time-slot-disabled"];

													return (
														<button
															key={startTime.toISOString()}
															className={cssClassName}
															onClick={() =>
																startTime.toISOString() >=
																	new Date().toISOString() &&
																handleLessonBooking(
																	student.id,
																	teacher.id,
																	teacher.name,
																	startTime,
																	costInfo[0].id,
																	costInfo[0].classLevel.name,
																	costInfo[0].costPerLesson,
																	lessonId
																)
															}
														>
															{startTime.toLocaleTimeString([], {
																hour: "2-digit",
																minute: "2-digit",
																hour12: true,
															})}
														</button>
													);
												})}
										</div>
									);
								})}
							</>
						)}
					</div>
				</div>
			</div>
			{isWarningVisible && (
				<WarningDialog
					bookingState={bookingState}
					onClose={handleDialogClose}
					dict={dict}
				/>
			)}
		</div>
	);
};

// warning dialog helper function
const WarningDialog = ({ bookingState, onClose, dict }) => {
	return (
		<div className={styles["dialog"]}>
			<div id="warning" className={styles["dialog-overlay"]}>
				<div className={styles["dialog-content"]}>
					<label className={styles["dialog-text"]}>
						{dict.failedChecks}
						<ul className={styles["warning-list"]}>
							{!bookingState.checkLanguage && <li>{dict.noCommonLanguageH}</li>}
							{!bookingState.checkEducationalBoard && (
								<li>{dict.noCommonEducationalBoardH}</li>
							)}
							{!bookingState.checkCommonClassLevel && (
								<li>{dict.noCommonClassLevelH}</li>
							)}
							{!bookingState.checkCorrectClassLevel && (
								<li>{dict.noCorrectClassLevelH}</li>
							)}
							{!bookingState.checkSubjects && <li>{dict.noCommonSubjectsH}</li>}
						</ul>
					</label>
					<div className={styles["button-row"]}>
						<span className="default-btn-icon" title={dict.ok} onClick={onClose}>
							<i className="fas fa-check-square"></i>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingForm;
