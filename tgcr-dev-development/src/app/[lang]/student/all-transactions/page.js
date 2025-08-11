// Import necessary helpers and components
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role } from "@prisma/client";
import LessonTransactionTable from "@/components/AllTransaction/AllTransaction";

// Dynamically set the page metadata (like <title>) using i18n dictionary
export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	return {
		title: dict.dashboard.myLessons, // You can adjust this to another key if needed
	};
}

// Server component for the page
const Page = async ({ params }) => {
	const { lang } = await params;

	// Get current user from session or cookie
	const currentUser = await getCurrentUser();

	// If user is not logged in, redirect to forbidden page
	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}

	// Only allow users with the Student role to access this page
	if (!(currentUser.role === Role.Student)) {
		redirect(`/${lang}/forbidden`);
	}

	// Fetch localization strings for the current language
	const dict = await getDictionary(lang);

	return (
		<div className="ptb-15">
			<div className="container">
				{/* Render the reusable transaction table component with required props */}
				<LessonTransactionTable
					lang={lang}
					currentUser={currentUser}
					myLessonsDict={dict.allTransaction}
				/>
			</div>
		</div>
	);
};

export default Page;
