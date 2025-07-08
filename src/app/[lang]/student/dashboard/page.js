import { redirect } from "next/navigation";
import { Dashboard } from "@/components/Layout/Dashboard";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getStudentLessonRequestRecent } from "@/actions/student/getStudents.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { UIDayDateTime } from "@/utils/dateUtils";
import { Role } from "@prisma/client";
import { LESSON_TYPE_QVALUE } from "@/libs/constants";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.dashboard.pageTitleStudent,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Student)) {
		// only visible for students
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);

	// profile checks
	const profileUrl =
		currentUser.firstName == null
			? `/${lang}/profile/personal`
			: currentUser.image == null
			? `/${lang}/profile/picture`
			: currentUser.timezoneId == null
			? `/${lang}/profile/location`
			: currentUser.profile?.parentsFullName == null
			? `/${lang}/profile/parents`
			: currentUser.profile?.instructionLanguages == null
			? `/${lang}/profile/school`
			: `/${lang}/profile/personal`;
	const profileValid =
		currentUser.firstName == null
			? false
			: currentUser.image == null
			? false
			: currentUser.timezoneId == null
			? false
			: currentUser.profile?.parentsFullName == null
			? false
			: currentUser.profile?.instructionLanguages == null
			? false
			: true;
	const profileMessage = profileValid
		? dict.dashboard.myProfileE0
		: dict.dashboard.myProfileE1.replace(
				"{item}",
				profileUrl.substring(profileUrl.lastIndexOf("/") + 1)
		  );

	// upcoming lessons checks
	const studentLessonRequest = await getStudentLessonRequestRecent(
		currentUser.id,
		LESSON_TYPE_QVALUE.Upcoming
	);

	const dashboardCardList = [
		{
			icon: "bx bxs-user-account",
			label: dict.dashboard.myProfile,
			url: profileUrl,
			valid: profileValid,
			message: profileMessage,
		},
		{
			label: dict.dashboard.myLessons,
			url: `/${lang}/student/lessons/upcoming`,
			icon: "bx bx-book",
			valid: studentLessonRequest?.studentLessonRequests?.length > 0 ? true : false,
			message:
				studentLessonRequest?.studentLessonRequests?.length > 0
					? dict.dashboard.myLessonsE0
							.replace(
								"{date}",
								UIDayDateTime(
									studentLessonRequest?.studentLessonRequests[0].requestedStart,
									currentUser.timezone.tzIdentifier
								)
							)
							.replace(
								"{name}",
								studentLessonRequest?.studentLessonRequests[0].instructor.name
							)
					: dict.dashboard.myLessonsE1,
		},
	];

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<h2 className="mb-4">
						{dict.dashboard.welcomeMessage.replace("{name}", currentUser.name ?? "")}
					</h2>
					<div className="row">
						<div className="col-lg-12">
							<Dashboard
								lang={lang}
								currentUser={currentUser}
								dashboardCardList={dashboardCardList}
								dashboardDict={dict.dashboard}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
