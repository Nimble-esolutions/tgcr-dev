import { redirect } from "next/navigation";
import { Jitsi } from "@/components/Lesson/Jitsi";
import BackButton from "@/components/FormHelpers/BackButton";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getLessonRequestAttributes } from "@/actions/lesson/getLessonRequests";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role } from "@prisma/client";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.myLessons.pageTitle,
	};
}

const page = async ({ params }) => {
	// lessonId (or the meetingRoom) is passed as a parameter
	const { lang, lessonId } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Student || currentUser.role === Role.Instructor)) {
		// only visible for students or teachers
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);
	const lessonRequest = await getLessonRequestAttributes(lessonId);

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
						<h4 className="mb-4">
							{lessonRequest
								? dict.liveLesson.liveLessonDetails
										.replace(
											"{name}",
											currentUser.role === Role.Student
												? lessonRequest.instructor.name
												: lessonRequest.student.name
										)
										.replace(
											"{class}",
											lessonRequest.teacherClassLevelCost.classLevel.name
										)
										.replace(
											"{remarks}",
											lessonRequest.remarks.trim().length === 0
												? dict.liveLesson.noRemarks
												: lessonRequest.remarks
										)
								: dict.liveLesson.invalidLessonRequestE1}
						</h4>
					</div>
				</div>
			</div>
			<div className="row">
				{lessonRequest && (
					<Jitsi
						lang={lang}
						currentUser={currentUser}
						lessonRequest={lessonRequest}
						liveLessonDict={dict.liveLesson}
					/>
				)}
			</div>
		</>
	);
};

export default page;
