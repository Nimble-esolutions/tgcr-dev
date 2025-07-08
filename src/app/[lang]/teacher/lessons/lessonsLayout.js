// container page for teacher's lessons section
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LinksBar from "@/components/Layout/LinksBar";
import { Role } from "@prisma/client";

const LessonsLayout = async ({ children, lang }) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Instructor)) {
		// only visible for teachers
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);
	const subnav = [
		{
			// Upcoming Lessons
			linkText: dict.myLessons.todayUpcoming,
			linkURL: `/${lang}/teacher/lessons/upcoming`,
			iconClass: "fa fa-calendar-day",
		},
		{
			// Completed Lessons
			linkText: dict.myLessons.completed,
			linkURL: `/${lang}/teacher/lessons/completed`,
			iconClass: "fa fa-clock-rotate-left",
		},
	];

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<h2 className="mb-4">{dict.myLessons.pageTitle}</h2>
					<LinksBar links={subnav} />
					{children}
				</div>
			</div>
		</>
	);
};

export default LessonsLayout;
