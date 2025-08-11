// this page is not used anymore
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role } from "@prisma/client";
import CalendarWeeklyForm from "@/components/Teacher/CalendarWeeklyForm";
import AvailabilityLayout from "./availabilityLayout";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.weeklyCalendar.pageTitle,
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

	return (
		<>
			<AvailabilityLayout lang={lang}>
				<div className="row">
					<div className="col-lg-12">
						<CalendarWeeklyForm
							lang={lang}
							currentUser={currentUser}
							dict={dict.weeklyCalendar}
						/>
					</div>
				</div>
			</AvailabilityLayout>
		</>
	);
};

export default page;
