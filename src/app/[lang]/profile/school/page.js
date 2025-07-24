import { redirect } from "next/navigation";
<<<<<<< HEAD
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
=======
import { getCurrentUser, getUserById } from "@/actions/getCurrentUser";
import { getStudentSchoolInfo } from "@/actions/student/getStudents.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import SchoolInfoForm from "@/components/Profile/SchoolInfoForm";
import { Role } from "@prisma/client";
import { ImpersonationType } from "@/libs/types";
import ProfileLayout from "../profileLayout";
import { AdminLayout } from "@/app/[lang]/admin/adminLayout";

export async function generateMetadata({ params, searchParams }) {
	const { lang } = await params;
	const { id, bk } = await searchParams; // when id is supplied, the page works in "Admin" mode
	const dict = await getDictionary(lang);

	if (id) {
		return {
			title: dict.adminUserMgmt.userMgmt,
		};
	} else {
		return {
			title: dict.profileSchooling.pageTitle,
		};
	}
}

const page = async ({ params, searchParams }) => {
	const { lang } = await params;
	const { id, bk } = await searchParams; // when id is supplied, the page works in "Admin" mode
	var currentUser;

	if (id) {
		// id provided; get the user by id
		currentUser = await getUserById(id);
	} else {
		// no id provided; get the current user
		currentUser = await getCurrentUser();
	}

	if (!currentUser) {
		// do not proceed further if there is no user
>>>>>>> origin/admin
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Student)) {
		// only visible for students
		redirect(`/${lang}/forbidden`);
	}

<<<<<<< HEAD
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
=======
	const dict = await getDictionary(lang);
	// fetch additional attributes which are required to be shown on the screen
	const currentUserSchoolInfo = await getStudentSchoolInfo(currentUser.id);

	if (id) {
		return (
			<>
				<AdminLayout lang={lang} back={bk}>
					<ProfileLayout
						lang={lang}
						currentUser={currentUser}
						impersonationType={ImpersonationType.Admin}
					>
						<div className="row">
							<div className="col-lg-12">
								<SchoolInfoForm
									lang={lang}
									currentUser={currentUser}
									currentUserSchoolInfo={currentUserSchoolInfo}
									impersonationType={ImpersonationType.Admin}
									profileSchoolingDict={dict.profileSchooling}
								/>
							</div>
						</div>
					</ProfileLayout>
				</AdminLayout>
			</>
		);
	} else {
		return (
			<>
				<ProfileLayout
					lang={lang}
					currentUser={currentUser}
					impersonationType={ImpersonationType.User}
				>
					<div className="row">
						<div className="col-lg-12">
							<SchoolInfoForm
								lang={lang}
								currentUser={currentUser}
								currentUserSchoolInfo={currentUserSchoolInfo}
								impersonationType={ImpersonationType.User}
								profileSchoolingDict={dict.profileSchooling}
							/>
						</div>
					</div>
				</ProfileLayout>
			</>
		);
	}
>>>>>>> origin/admin
};

export default page;
