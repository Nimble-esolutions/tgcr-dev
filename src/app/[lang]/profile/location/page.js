import { redirect } from "next/navigation";
import { getCurrentUser, getUserById } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LocationForm from "@/components/Profile/LocationForm";
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
			title: dict.profileLocation.pageTitle,
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
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Student || currentUser.role === Role.Instructor)) {
		// only visible for students and instructors
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);

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
							<div className="col-lg-6 col-md-12">
								<LocationForm
									lang={lang}
									currentUser={currentUser}
									impersonationType={ImpersonationType.Admin}
									profileLocationDict={dict.profileLocation}
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
						<div className="col-lg-6 col-md-12">
							<LocationForm
								lang={lang}
								currentUser={currentUser}
								impersonationType={ImpersonationType.User}
								profileLocationDict={dict.profileLocation}
							/>
						</div>
					</div>
				</ProfileLayout>
			</>
		);
	}
};

export default page;
