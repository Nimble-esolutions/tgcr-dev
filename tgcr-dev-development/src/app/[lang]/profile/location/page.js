import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProfileLayout from "../profileLayout";
import LocationForm from "@/components/Profile/LocationForm";
import { Role } from "@prisma/client";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.profileLocation.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const dict = await getDictionary(lang);

	if (!currentUser) {
		// do not proceed further if there is no user
		redirect(`/${lang}/forbidden`);
	}

	if (!(currentUser.role === Role.Student || currentUser.role === Role.Instructor)) {
		// only visible for students and instructors
		redirect(`/${lang}/forbidden`);
	}

	return (
		<>
			<ProfileLayout lang={lang}>
				<div className="row">
					<div className="col-lg-6 col-md-12">
						<LocationForm
							lang={lang}
							currentUser={currentUser}
							profileLocation={dict.profileLocation}
						/>
					</div>
				</div>
			</ProfileLayout>
		</>
	);
};

export default page;
