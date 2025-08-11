import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProfileLayout from "../profileLayout";
import ChangePasswordForm from "@/components/Profile/ChangePasswordForm";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.profilePassword.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const dict = await getDictionary(lang);

	if (!currentUser) {
		// cannot change password if there is no user
		redirect(`/${lang}/forbidden`);
	}

	return (
		<>
			<ProfileLayout lang={lang}>
				<div className="row">
					<div className="col-lg-6 col-md-12">
						<ChangePasswordForm
							lang={lang}
							user={currentUser}
							profilePasswordDict={dict.profilePassword}
						/>
					</div>
				</div>
			</ProfileLayout>
		</>
	);
};

export default page;
