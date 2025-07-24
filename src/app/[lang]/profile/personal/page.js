import { redirect } from "next/navigation";
<<<<<<< HEAD
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProfileLayout from "../profileLayout";
import PersonalProfileForm from "@/components/Profile/PersonalProfileForm";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.profilePersonal.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const dict = await getDictionary(lang);
=======
import { getCurrentUser, getUserById } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import PersonalProfileForm from "@/components/Profile/PersonalProfileForm";
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
			title: dict.profilePersonal.pageTitle,
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
>>>>>>> origin/admin

	if (!currentUser) {
		// do not proceed further if there is no user
		redirect(`/${lang}/forbidden`);
	}

<<<<<<< HEAD
	return (
		<>
			<ProfileLayout lang={lang}>
				<div className="row">
					<div className="col-lg-12">
						<PersonalProfileForm
							lang={lang}
							currentUser={currentUser}
							profilePersonalDict={dict.profilePersonal}
						/>
					</div>
				</div>
			</ProfileLayout>
		</>
	);
=======
	const dict = await getDictionary(lang);

	if (id) {
		// show as Admin page
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
								<PersonalProfileForm
									lang={lang}
									currentUser={currentUser}
									profilePersonalDict={dict.profilePersonal}
									impersonationType={ImpersonationType.Admin}
								/>
							</div>
						</div>
					</ProfileLayout>
				</AdminLayout>
			</>
		);
	} else {
		// show as User page
		return (
			<>
				<ProfileLayout
					lang={lang}
					currentUser={currentUser}
					impersonationType={ImpersonationType.User}
				>
					<div className="row">
						<div className="col-lg-12">
							<PersonalProfileForm
								lang={lang}
								currentUser={currentUser}
								impersonationType={ImpersonationType.User}
								profilePersonalDict={dict.profilePersonal}
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
