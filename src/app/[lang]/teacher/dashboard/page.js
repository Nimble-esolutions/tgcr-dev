import { redirect } from "next/navigation";
import { Dashboard } from "@/components/Layout/Dashboard";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTeacherPricing, getTeacherLessonRequestRecent } from "@/actions/teacher/getTeachers.ts";
import { getMaxAvailability } from "@/actions/teacher/getCalendar.ts";
import { getDateFromWeekNumber, getDayDiff } from "@/utils/rruleUtils";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role } from "@prisma/client";
import { UIDate, UIDayDateTime } from "@/utils/dateUtils";
import { LESSON_TYPE_QVALUE } from "@/libs/constants";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.dashboard.pageTitleTeacher,
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

	const dict = await getDictionary(lang);

	// profile checks
	// the same profile checks are performed on getTeacher() as well
	const profileUrl =
		currentUser.firstName == null
			? `/${lang}/profile/personal`
			: currentUser.image == null
			? `/${lang}/profile/picture`
			: currentUser.timezoneId == null
			? `/${lang}/profile/location`
			: currentUser.profile?.subjects == null
			? `/${lang}/profile/experience`
			: `/${lang}/profile/personal`;
	const profileValid =
		currentUser.firstName == null
			? false
			: currentUser.image == null
			? false
			: currentUser.timezoneId == null
			? false
			: currentUser.profile?.subjects == null
			? false
			: true;
	const profileMessage = profileValid
		? dict.dashboard.myProfileE0
		: dict.dashboard.myProfileE1.replace(
				"{item}",
				profileUrl.substring(profileUrl.lastIndexOf("/") + 1)
		  );

	// calendar check
	const maxCal = await getMaxAvailability(currentUser.id);
	const calValid =
		maxCal == null
			? false
			: getDayDiff(new Date(), getDateFromWeekNumber(maxCal)) <= 60
			? false
			: true;
	const calMessage =
		maxCal == null
			? dict.dashboard.myAvailabilityCalE1
			: getDayDiff(new Date(), getDateFromWeekNumber(maxCal)) <= 60
			? dict.dashboard.myAvailabilityCalE4.replace(
					"{date}",
					UIDate(getDateFromWeekNumber(`${maxCal}`))
			  )
			: dict.dashboard.myAvailabilityCalE3.replace(
					"{date}",
					UIDate(getDateFromWeekNumber(`${maxCal}`))
			  );

	// pricing check
	const teacherPricing = await getTeacherPricing(currentUser.id);
	// upcoming lessons checks
	const teacherLessonRequest = await getTeacherLessonRequestRecent(
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
			icon: "bx bx-calendar",
			label: dict.dashboard.myAvailabilityCal,
			url: `/${lang}/teacher/availability`,
			valid: calValid,
			message: calMessage,
		},
		{
			icon: "bx bxs-coin-stack",
			label: dict.dashboard.myPricing,
			url: `/${lang}/profile/pricing`,
			valid: teacherPricing.teacherClassLevelCosts.length > 0 ? true : false,
			message:
				teacherPricing.teacherClassLevelCosts.length > 0
					? dict.dashboard.myPricingE0
					: dict.dashboard.myPricingE1,
		},
		{
			icon: "bx bx-book",
			label: dict.dashboard.myLessons,
			url: `/${lang}/teacher/lessons/upcoming`,
			valid: teacherLessonRequest?.instructorLessonRequests?.length > 0 ? true : false,
			message:
				teacherLessonRequest?.instructorLessonRequests?.length > 0
					? dict.dashboard.myLessonsE0
							.replace(
								"{date}",
								UIDayDateTime(
									teacherLessonRequest?.instructorLessonRequests[0]
										.requestedStart,
									currentUser.timezone.tzIdentifier
								)
							)
							.replace(
								"{name}",
								teacherLessonRequest?.instructorLessonRequests[0].student.name
							)
					: dict.dashboard.myLessonsE2,
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
