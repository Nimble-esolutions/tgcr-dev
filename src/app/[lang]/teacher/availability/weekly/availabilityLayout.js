// layout page for all the subpages of availability section
// childpages are rendered from the pages in the availability directory
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LinksBar from "@/components/Layout/LinksBar";
import { Role } from "@prisma/client";

const AvailabilityLayout = async ({ children, lang }) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Instructor)) {
		// only visible for instructors
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);
	const subnav = [
		{
			// Calendar
			linkText: dict.availability.calendar,
			linkURL: `/${lang}/teacher/availability/calendar`,
			iconClass: "bx bxs-calendar",
		},
		{
			// Recurring Events - defined weekly
			linkText: dict.availability.weekly,
			linkURL: `/${lang}/teacher/availability/weekly`,
			iconClass: " bx bxs-calendar-week",
		},
	];

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<h2 className="mb-4">{dict.availability.pageTitle}</h2>
					<LinksBar links={subnav} />
					{children}
				</div>
			</div>
		</>
	);
};

export default AvailabilityLayout;
