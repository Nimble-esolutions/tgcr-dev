import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTeacherById } from "@/actions/teacher/getTeachers.ts";
import { getStudentSchoolInfo } from "@/actions/student/getStudents.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role } from "@prisma/client";
import { SEARCH_QPARAMS } from "@/libs/constants";
import BookingForm from "@/components/Teacher/BookingForm";
import BackButton from "@/components/FormHelpers/BackButton";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.bookLesson.pageTitle,
	};
}

const page = async ({ params, searchParams }) => {
	// teacherSearch is used as the dictionary
	const { lang, id } = await params;
	const { cl } = await searchParams;

	const dict = await getDictionary(lang);

	const currentUser = await getCurrentUser();
	if (!currentUser) {
		// this is a protected route; user must be logged-in
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Student)) {
		// only visible for students
		redirect(`/${lang}/forbidden`);
	}

	const teacher = await getTeacherById(id);
	if (!teacher) {
		// cannot proceed if there is no teacher
		redirect(`/${lang}/forbidden`);
	}
	if (teacher.teacherClassLevelCosts.length === 0) {
		// cannot proceed if the price for this user is not defined
		redirect(`/${lang}/forbidden`);
	}

	const classLevelId = parseInt(cl || "", 10);
	const costInfo = teacher.teacherClassLevelCosts.filter(
		(cost) => cost.classLevelId === classLevelId
	);

	if (costInfo.length === 0) {
		// this validation is necessary to confirm that the URL is not malformed
		// teacher.teacherClassLevelCosts.filter() if successful will only return 1 value
		redirect(`/${lang}/forbidden`);
	}

	const studentSchoolInfo = await getStudentSchoolInfo(currentUser.id);

	const findBookingState = () => {
		// multiple conditions are checked here and passed onto the BookingForm for display
		const student = currentUser; // student is the current user

		// Language check: whether there is a common language between the teacher and the student
		const checkLanguage = (
			teacher.profile.nativeLanguage +
			";" +
			teacher.profile.instructionLanguages
		)
			.split(";")
			.includes(student.profile.instructionLanguages.split(";")[0])
			? true
			: false;

		// EducationalBoards check: whether there are common educational boards between the teacher and the student
		const commonEducationalBoards = teacher.teacherEducationalBoards.find(
			(tboard) =>
				tboard.educationalBoardId ===
				studentSchoolInfo.studentEducationalBoard.educationalBoardId
		);
		const checkEducationalBoard = commonEducationalBoards ? true : false;

		// ClassLevels check: whether there are common class levels between the teacher and the student
		// there can be a situation when the teacher is teaching the class of the student but the student is not booking that class from the teacher due to cost differences
		const commonClassLevel = teacher.teacherClassLevelCosts.find(
			(tclassLevel) =>
				tclassLevel.classLevelId === studentSchoolInfo.studentClassLevel.classLevelId
		);
		const checkCommonClassLevel = commonClassLevel ? true : false; // whether there is a common class level between the teacher and the student
		const checkCorrectClassLevel =
			costInfo[0].classLevelId === studentSchoolInfo.studentClassLevel.classLevelId; // whether the student is booking the correct class level

		// check whether there are common subjects between the teacher and the student
		const commonSubjects = teacher.profile.subjects
			.split(";")
			.filter((subject) => student.profile.subjects.split(";").includes(subject));
		const checkSubjects = commonSubjects.length > 0 ? true : false;

		console.log({ commonSubjects, checkSubjects });
		return {
			requestState:
				checkLanguage &&
				checkEducationalBoard &&
				checkCommonClassLevel &&
				checkCorrectClassLevel &&
				checkSubjects,
			checkLanguage,
			commonEducationalBoards,
			checkEducationalBoard,
			commonClassLevel,
			checkCommonClassLevel,
			checkCorrectClassLevel,
			commonSubjects,
			checkSubjects,
		};
	};
	const bookingState = findBookingState();

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<div
						style={{
							display: "flex",
							alignItems: "top",
							gap: "10px",
						}}
					>
						<BackButton />
						<h2 className="mb-4">{dict.bookLesson.pageTitle}</h2>
					</div>
					<div>
						{teacher && (
							<div>
								<BookingForm
									lang={lang}
									student={currentUser}
									studentSchoolInfo={studentSchoolInfo}
									teacher={teacher}
									costInfo={costInfo}
									bookingState={bookingState}
									dict={dict.bookLesson}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
