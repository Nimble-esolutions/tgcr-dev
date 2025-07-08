// container page for all the subpages of profile section
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
	const subnav = [
		{
			// Personal Profile
			linkText: dict.profile.personalProfile,
			linkURL: `/${lang}/profile/personal`,
			iconClass: "fa fa-user",
		},
		{
			// Profile Picture
			linkText: dict.profile.profilePicture,
			linkURL: `/${lang}/profile/picture`,
			iconClass: "fa fa-camera",
		},
		...(currentUser.role === Role.Student || currentUser.role === Role.Instructor
			? [
					{
						// Location - required only for Student/Instructor and not for Admin/Helpdesk
						linkText: dict.profile.location,
						linkURL: `/${lang}/profile/location`,
						iconClass: "fa fa-map-marker",
					},
			  ]
			: []),
		...(currentUser.role === Role.Student
			? [
					{
						// Parent's Profile
						linkText: dict.profile.parentsProfile,
						linkURL: `/${lang}/profile/parents`,
						iconClass: "fa fa-users",
					},
					{
						// Schooling Information
						linkText: dict.profile.schoolingInformation,
						linkURL: `/${lang}/profile/school`,
						iconClass: "fa fa-graduation-cap",
					},
			  ]
			: []),
		...(currentUser.role === Role.Instructor
			? [
					{
						// Teaching Experience
						linkText: dict.profile.teachingExperience,
						linkURL: `/${lang}/profile/experience`,
						iconClass: "fa fa-briefcase",
					},
					{
						// Pricing
						linkText: dict.profile.pricing,
						linkURL: `/${lang}/profile/pricing`,
						iconClass: "fa fa-coins",
					},
			  ]
			: []),
		{
			// Change Password
			linkText: dict.profile.changePassword,
			linkURL: `/${lang}/profile/password`,
			iconClass: "fa fa-lock",
		},
	];

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<h2 className="mb-4">{dict.profile.pageTitle}</h2>
					<LinksBar links={subnav} />
					{children}
				</div>
			</div>
		</>
	);
};

export default ProfileLayout;
