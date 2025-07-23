import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ChangePasswordForm from "@/components/Profile/ChangePasswordForm";
import { ImpersonationType } from "@/libs/types";
import ProfileLayout from "../profileLayout";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.profilePassword.pageTitle,
	};
}

const page = async ({ params }) => {
	// this page is not displayed to the admin user... so no impersonationType/AdminLayout used here
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		// cannot change password if there is no user
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);

	return (
		<>
			<ProfileLayout
				lang={lang}
				currentUser={currentUser}
				impersonationType={ImpersonationType.User}
			>
				<div className="row">
					<div className="col-lg-6 col-md-12">
						<ChangePasswordForm
							lang={lang}
							currentUser={currentUser}
							profilePasswordDict={dict.profilePassword}
						/>
					</div>
				</div>
			</ProfileLayout>
		</>
	);
};

export default page;
