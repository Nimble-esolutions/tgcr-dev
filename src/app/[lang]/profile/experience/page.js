import { redirect } from "next/navigation";
import { getCurrentUser, getUserById } from "@/actions/getCurrentUser";
import { getTeacherExperience } from "@/actions/teacher/getTeachers.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ExperienceForm from "@/components/Profile/ExperienceForm";
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
			title: dict.profileExperience.pageTitle,
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
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Instructor)) {
		// only visible for instructors
		redirect(`/${lang}/forbidden`);
	}

	const teachingExperience = await getTeacherExperience(currentUser.id);
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
							<div className="col-lg-12">
								<ExperienceForm
									lang={lang}
									currentUser={currentUser}
									teachingExperience={teachingExperience}
									impersonationType={ImpersonationType.Admin}
									profileExperienceDict={dict.profileExperience}
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
							<ExperienceForm
								lang={lang}
								currentUser={currentUser}
								teachingExperience={teachingExperience}
								impersonationType={ImpersonationType.User}
								profileExperienceDict={dict.profileExperience}
							/>
						</div>
					</div>
				</ProfileLayout>
			</>
		);
	}
};

export default page;
