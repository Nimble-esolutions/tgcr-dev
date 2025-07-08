"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Role } from "@prisma/client";
import { LESSON_TYPE_QVALUE } from "@/libs/constants";
import { UIDayDateTime } from "@/utils/dateUtils";
import { generateMeetingRoomName } from "@/utils/jitsi.ts";

// TODO: Workflow updates --> Cancellation etc.
const LessonRequestForm = ({ lang, currentUser, lessonRequests, lessonType, myLessonsDict }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const stLessonRequests =
		currentUser.role === Role.Instructor
			? lessonRequests.instructorLessonRequests
			: lessonRequests.studentLessonRequests;

	const {
		register,
		handleSubmit,
		setError,
		reset,
		setValue,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm({
		mode: "all",
		defaultValues: {
			email: "",
			lang: "en",
		},
	});

	useEffect(() => {
		setIsLoading(true);
		setValue("email", currentUser.email);
		setIsLoading(false);
	}, [currentUser, setValue]);

	const handleChange = (e) => {
		// nothing at this moment
	};

	const onSubmit = async (data) => {
		setIsLoading(true);
		// await axios
		// 	.post("/api/profile/pricing", {
		// 		...data,
		// 		lang,
		// 		classLevels,
		// 	})
		// 	.then((response) => {
		// 		toast.success(profilePricing.success);
		// 		router.refresh();
		// 	})
		// 	.catch((error) => {
		// 		toast.error(error.response?.data?.message || error.message);
		// 	})
		// 	.finally(() => {});
		setIsLoading(false);
	};

	return (
		<div className="subnav-form">
			<p>
				{lessonType === LESSON_TYPE_QVALUE.Completed
					? stLessonRequests.length === 0
						? myLessonsDict.noLessonsHC
						: myLessonsDict.pageTitleHC
					: stLessonRequests.length === 0
					? myLessonsDict.noLessonsHU
					: myLessonsDict.pageTitleHU}
			</p>

			{stLessonRequests.length > 0 && (
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* <div className="row">
						<div className="col-md-6">
							<Input
								id="email"
								type="email"
								label={myLessonsDict.email}
								disabled={true}
								register={register}
								errors={errors}
								watch={watch}
								setValue={setValue}
							/>
						</div>
					</div> */}
					<div className="row">
						<div className="col-md-12">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									borderBottom: "1px solid #ccc",
									marginBottom: "10px",
								}}
							>
								<label className="input-label" style={{ flex: 15 }}>
									{currentUser.role === Role.Instructor
										? myLessonsDict.student
										: myLessonsDict.teacher}
								</label>
								<label className="input-label" style={{ flex: 23 }}>
									{myLessonsDict.classLevel}
								</label>
								<label className="input-label" style={{ flex: 8 }}>
									{myLessonsDict.price}
								</label>
								<label className="input-label" style={{ flex: 17 }}>
									{myLessonsDict.start}
								</label>
								<label className="input-label" style={{ flex: 17 }}>
									{myLessonsDict.end}
								</label>
								<label className="input-label" style={{ flex: 10 }}>
									{myLessonsDict.status}
								</label>
								<label className="input-label" style={{ flex: 10 }}>
									{" "}
									{/* space for Join button */}
								</label>
							</div>
							{stLessonRequests.map((lReq, index) => {
								const meetingRoomName = generateMeetingRoomName(
									lReq.requestedStart,
									lReq.requestedEnd,
									lReq.id
								);
								return (
									<div
										key={`row-${index}`}
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<label className="form-label" style={{ flex: 15 }}>
											{currentUser.role === Role.Instructor
												? lReq.student.name
												: lReq.instructor.name}
										</label>
										<label className="form-label" style={{ flex: 23 }}>
											{lReq.teacherClassLevelCost.classLevel.name}
										</label>
										<label className="form-label" style={{ flex: 8 }}>
											{lReq.teacherClassLevelCost.costPerLesson.toFixed(2)}
										</label>
										<label className="form-label" style={{ flex: 17 }}>
											{UIDayDateTime(
												lReq.requestedStart,
												currentUser.timezone.tzIdentifier
											)}
										</label>
										<label className="form-label" style={{ flex: 17 }}>
											{UIDayDateTime(
												lReq.requestedEnd,
												currentUser.timezone.tzIdentifier
											)}
										</label>
										<label className="form-label" style={{ flex: 10 }}>
											{lReq.status}
										</label>
										<label className="form-label" style={{ flex: 10 }}>
											{meetingRoomName && (
												<Link
													href={`/${lang}/live-lesson/${meetingRoomName}`}
													className="default-btn"
												>
													{myLessonsDict.joinBtn}
												</Link>
											)}
										</label>
									</div>
								);
							})}
						</div>
						<div className="col-md-6"></div>
					</div>
					{/* <div className="col-12">
						<button type="submit" disabled={isLoading}>
							{isLoading ? myLessonsDict.pleaseWait : myLessonsDict.updateBtn}
						</button>
					</div> */}
				</form>
			)}
		</div>
	);
};

export default LessonRequestForm;
