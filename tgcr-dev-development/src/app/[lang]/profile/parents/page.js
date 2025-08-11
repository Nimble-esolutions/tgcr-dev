import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProfileLayout from "../profileLayout";
import ParentProfileForm from "@/components/Profile/ParentProfileForm";
import { Role } from "@prisma/client";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.profileParents.pageTitle,
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

	if (!(currentUser.role === Role.Student)) {
		// only visible for students
		redirect(`/${lang}/forbidden`);
	}

	return (
		<>
			<ProfileLayout lang={lang}>
				<div className="row">
					<div className="col-lg-12">
						<ParentProfileForm
							lang={lang}
							currentUser={currentUser}
							profileParents={dict.profileParents}
						/>
					</div>
				</div>
			</ProfileLayout>
		</>
	);
};

export default page;
