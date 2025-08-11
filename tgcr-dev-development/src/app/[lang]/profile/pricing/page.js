import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTeacherPricing } from "@/actions/teacher/getTeachers.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProfileLayout from "../profileLayout";
import { Role } from "@prisma/client";
import PricingForm from "@/components/Profile/PricingForm";

// PHASE-X: Implement discount options through coupon codes
export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.profileExperience.pageTitle,
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

	const currentUserPricing = await getTeacherPricing(currentUser.id);
	const dict = await getDictionary(lang);

	return (
		<>
			<ProfileLayout lang={lang}>
				<div className="row">
					<div className="col-lg-12">
						<PricingForm
							lang={lang}
							currentUser={currentUser}
							currentUserPricing={currentUserPricing}
							profilePricing={dict.profilePricing}
						/>
					</div>
				</div>
			</ProfileLayout>
		</>
	);
};

export default page;
