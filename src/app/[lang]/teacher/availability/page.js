import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getAvailability } from "@/actions/teacher/getCalendar.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role, RecordType } from "@prisma/client";
import AvailabilityForm from "@/components/Teacher/AvailabilityForm";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.availabilityCalendar.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Instructor)) {
		// only visible for instructors
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);
	const availabilityCal = await getAvailability(currentUser.id);
	// const availabilityCal = {
	// 	id: "d7f7072d-ffcc-4782-ad52-2ac9fba709d0",
	// 	name: "Vikram Teacher ",
	// 	instructorAvailability: [
	// 		{
	// 			id: "1743625753915-mrl77s0am",
	// 			action: "NEW",
	// 			title: "Available",
	// 			rrule: "DTSTART:20250407T060000Z\nRRULE:FREQ=WEEKLY;UNTIL=20250420T205959Z;INTERVAL=1;BYDAY=MO,WE,FR",
	// 			duration: "03:00",
	// 			startWeek: 202515,
	// 			endWeek: 202516,
	// 			// exdate: [],
	// 			// exdate: ["2025-04-09T06:00:00"],
	// 			// exdate: ["2025-04-09T06:00:00", "2025-04-11T06:00:00"],
	// 			exdate: ["2025-04-09T06:00:00Z", "2025-04-11T06:00:00Z"],
	// 		},
	// 	],
	// };

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<h2 className="mb-4">{dict.availability.pageTitle}</h2>
					<div className="row">
						<div className="col-lg-12">
							<AvailabilityForm
								lang={lang}
								teacher={currentUser}
								availabilityCal={availabilityCal.instructorAvailability}
								availabilityCalendarDict={dict.availabilityCalendar}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
