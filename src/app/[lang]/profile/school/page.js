import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getStudentSchoolInfo } from "@/actions/student/getStudents.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProfileLayout from "../profileLayout";
import SchoolInfoForm from "@/components/Profile/SchoolInfoForm";
import { Role } from "@prisma/client";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.profileSchooling.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Student)) {
		// only visible for students
		redirect(`/${lang}/forbidden`);
	}

	// fetch additional attributes which are required to be shown on the screen
	const currentUserSchoolInfo = await getStudentSchoolInfo(currentUser.id);
	const dict = await getDictionary(lang);

	return (
		<>
			<ProfileLayout lang={lang}>
				<div className="row">
					<div className="col-lg-12">
						<SchoolInfoForm
							lang={lang}
							currentUser={currentUser}
							currentUserSchoolInfo={currentUserSchoolInfo}
							profileSchooling={dict.profileSchooling}
						/>
					</div>
				</div>
			</ProfileLayout>
		</>
	);
};

export default page;
