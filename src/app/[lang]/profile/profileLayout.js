// container page for all the subpages of profile section
<<<<<<< HEAD
// this page just defines the layout of the profiles section
// childpages are rendered from the pages in the profiles directory
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LinksBar from "@/components/Layout/LinksBar";
import { Role } from "@prisma/client";

const ProfileLayout = async ({ children, lang }) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);
=======
// this page just defines the layout of the profiles section (works for both: Admin and User)
// childpages are rendered from the pages in the profiles directory
import { getDictionary } from "@/app/[lang]/dictionaries";
import LinksBar from "@/components/Layout/LinksBar";
import { Role } from "@prisma/client";
import { ImpersonationType } from "@/libs/types";
import BackButton from "@/components/FormHelpers/BackButton";

const ProfileLayout = async ({ children, lang, currentUser, impersonationType }) => {
	// for Admins (impersonationType===Admin), the currentUser contains the user being impersonated
	// for Users (impersonationType===User), the currentUser contains the logged-in user
	const dict = await getDictionary(lang);
	const urlParam = impersonationType === ImpersonationType.Admin ? `?id=${currentUser.id}` : "";

>>>>>>> origin/admin
	const subnav = [
		{
			// Personal Profile
			linkText: dict.profile.personalProfile,
<<<<<<< HEAD
			linkURL: `/${lang}/profile/personal`,
=======
			linkURL: `/${lang}/profile/personal${urlParam}`,
>>>>>>> origin/admin
			iconClass: "fa fa-user",
		},
		{
			// Profile Picture
			linkText: dict.profile.profilePicture,
<<<<<<< HEAD
			linkURL: `/${lang}/profile/picture`,
=======
			linkURL: `/${lang}/profile/picture${urlParam}`,
>>>>>>> origin/admin
			iconClass: "fa fa-camera",
		},
		...(currentUser.role === Role.Student || currentUser.role === Role.Instructor
			? [
					{
						// Location - required only for Student/Instructor and not for Admin/Helpdesk
						linkText: dict.profile.location,
<<<<<<< HEAD
						linkURL: `/${lang}/profile/location`,
=======
						linkURL: `/${lang}/profile/location${urlParam}`,
>>>>>>> origin/admin
						iconClass: "fa fa-map-marker",
					},
			  ]
			: []),
		...(currentUser.role === Role.Student
			? [
					{
						// Parent's Profile
						linkText: dict.profile.parentsProfile,
<<<<<<< HEAD
						linkURL: `/${lang}/profile/parents`,
=======
						linkURL: `/${lang}/profile/parents${urlParam}`,
>>>>>>> origin/admin
						iconClass: "fa fa-users",
					},
					{
						// Schooling Information
						linkText: dict.profile.schoolingInformation,
<<<<<<< HEAD
						linkURL: `/${lang}/profile/school`,
=======
						linkURL: `/${lang}/profile/school${urlParam}`,
>>>>>>> origin/admin
						iconClass: "fa fa-graduation-cap",
					},
			  ]
			: []),
		...(currentUser.role === Role.Instructor
			? [
					{
						// Teaching Experience
						linkText: dict.profile.teachingExperience,
<<<<<<< HEAD
						linkURL: `/${lang}/profile/experience`,
=======
						linkURL: `/${lang}/profile/experience${urlParam}`,
>>>>>>> origin/admin
						iconClass: "fa fa-briefcase",
					},
					{
						// Pricing
						linkText: dict.profile.pricing,
<<<<<<< HEAD
						linkURL: `/${lang}/profile/pricing`,
=======
						linkURL: `/${lang}/profile/pricing${urlParam}`,
>>>>>>> origin/admin
						iconClass: "fa fa-coins",
					},
			  ]
			: []),
<<<<<<< HEAD
		{
			// Change Password
			linkText: dict.profile.changePassword,
			linkURL: `/${lang}/profile/password`,
			iconClass: "fa fa-lock",
		},
=======
		...(impersonationType === ImpersonationType.User
			? [
					{
						// Change Password is added only for the real Users (not Admins)
						linkText: dict.profile.changePassword,
						linkURL: `/${lang}/profile/password${urlParam}`,
						iconClass: "fa fa-lock",
					},
			  ]
			: []),
>>>>>>> origin/admin
	];

	return (
		<>
			<div className="ptb-15">
				<div className="container">
<<<<<<< HEAD
					<h2 className="mb-4">{dict.profile.pageTitle}</h2>
=======
					{impersonationType === ImpersonationType.Admin && (
						// Admins have a back button to go back to the previous page
						<div
							style={{
								display: "flex",
								alignItems: "top",
								gap: "10px",
							}}
						>
							<BackButton
								href={
									currentUser.role === Role.Student
										? `/${lang}/admin/students`
										: `/${lang}/admin/teachers`
								}
							/>
							<h4 className="mb-4">{dict.profile.pageTitle}</h4>
						</div>
					)}
					{impersonationType === ImpersonationType.User && (
						// Display title only for the Users
						<h2 className="mb-4">{dict.profile.pageTitle}</h2>
					)}
					{/* Subnavigation links */}
>>>>>>> origin/admin
					<LinksBar links={subnav} />
					{children}
				</div>
			</div>
		</>
	);
};

export default ProfileLayout;
