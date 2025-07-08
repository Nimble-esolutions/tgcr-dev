import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getLesson } from "@/actions/lesson/getLessons";
import { getDictionary } from "@/app/[lang]/dictionaries";
import FeedbackForm from "@/components/Student/FeedbackForm";
import { Role } from "@prisma/client";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.feedback.pageTitle,
	};
}

// capturing student's feedback for a lesson
const page = async ({ params }) => {
	const { lang, lessonId } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Student)) {
		redirect(`/${lang}/forbidden`);
	}

	const currentLesson = await getLesson(lessonId);
	const dict = await getDictionary(lang);

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
						<h4 className="mb-4">
							{currentLesson ? dict.feedback.pageTitle : dict.feedback.lessonIdE1}
						</h4>
					</div>
					<div className="row">
						<div className="col-lg-12">
							{currentLesson && (
								<FeedbackForm
									lang={lang}
									currentUser={currentUser}
									lessonId={lessonId}
									feedbackDict={dict.feedback}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
