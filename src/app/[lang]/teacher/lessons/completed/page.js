import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTeacherLessonRequests } from "@/actions/teacher/getTeachers.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LessonsLayout from "@/app/[lang]/teacher/lessons/lessonsLayout";
import LessonRequestForm from "@/components/Lesson/LessonRequestForm";
import { Role } from "@prisma/client";
import { LESSON_TYPE_QVALUE } from "@/libs/constants";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.myLessons.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Instructor)) {
		// only visible for teachers
		redirect(`/${lang}/forbidden`);
	}

	// fetch additional attributes which are required to be shown on the screen
	const teacherLessonRequests = await getTeacherLessonRequests(
		currentUser.id,
		LESSON_TYPE_QVALUE.Completed
	);
	const dict = await getDictionary(lang);

	return (
		<>
			<LessonsLayout lang={lang}>
				<div className="row">
					<div className="col-lg-12">
						<LessonRequestForm
							lang={lang}
							currentUser={currentUser}
							lessonRequests={teacherLessonRequests}
							lessonType={LESSON_TYPE_QVALUE.Completed}
							myLessonsDict={dict.myLessons}
						/>
					</div>
				</div>
			</LessonsLayout>
		</>
	);
};

export default page;
