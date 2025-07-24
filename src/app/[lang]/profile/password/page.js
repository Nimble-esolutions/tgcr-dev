import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
<<<<<<< HEAD
import ProfileLayout from "../profileLayout";
import ChangePasswordForm from "@/components/Profile/ChangePasswordForm";
=======
import ChangePasswordForm from "@/components/Profile/ChangePasswordForm";
import { ImpersonationType } from "@/libs/types";
import ProfileLayout from "../profileLayout";
>>>>>>> origin/admin

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.profilePassword.pageTitle,
	};
}

const page = async ({ params }) => {
<<<<<<< HEAD
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const dict = await getDictionary(lang);
=======
	// this page is not displayed to the admin user... so no impersonationType/AdminLayout used here
	const { lang } = await params;
	const currentUser = await getCurrentUser();
>>>>>>> origin/admin

	if (!currentUser) {
		// cannot change password if there is no user
		redirect(`/${lang}/forbidden`);
	}

<<<<<<< HEAD
	return (
		<>
			<ProfileLayout lang={lang}>
=======
	const dict = await getDictionary(lang);

	return (
		<>
			<ProfileLayout
				lang={lang}
				currentUser={currentUser}
				impersonationType={ImpersonationType.User}
			>
>>>>>>> origin/admin
				<div className="row">
					<div className="col-lg-6 col-md-12">
						<ChangePasswordForm
							lang={lang}
<<<<<<< HEAD
							user={currentUser}
=======
							currentUser={currentUser}
>>>>>>> origin/admin
							profilePasswordDict={dict.profilePassword}
						/>
					</div>
				</div>
			</ProfileLayout>
		</>
	);
};

export default page;
