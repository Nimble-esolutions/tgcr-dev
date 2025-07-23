import { redirect } from "next/navigation";
import { Dashboard } from "@/components/Layout/Dashboard";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDashboardStats } from "@/actions/admin/getDashboardStats";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { AdminLayout } from "../adminLayout";
import { Role } from "@prisma/client";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.dashboard.pageTitleAdmin,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Admin)) {
		// only visible for admins
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);

	// profile checks (only checking the personal profile and image)
	const profileValid =
		currentUser.firstName == null ? false : currentUser.image == null ? false : true;

	if (!profileValid) {
		// if profile is not valid, standard dashboard cards are displayed
		const profileUrl =
			currentUser.firstName == null
				? `/${lang}/profile/personal`
				: currentUser.image == null
				? `/${lang}/profile/picture`
				: `/${lang}/profile/personal`;

		const profileMessage = profileValid
			? dict.dashboard.myProfileE0
			: dict.dashboard.myProfileE1.replace(
					"{item}",
					profileUrl.substring(profileUrl.lastIndexOf("/") + 1)
			  );

		const dashboardCardList = [
			{
				icon: "bx bxs-user-account",
				label: dict.dashboard.myProfile,
				url: profileUrl,
				valid: profileValid,
				message: profileMessage,
			},
		];

		return (
			<>
				<div className="ptb-15">
					<div className="container">
						<h2 className="mb-4">
							{dict.dashboard.welcomeMessage.replace(
								"{name}",
								currentUser.name ?? ""
							)}
						</h2>
						<div className="row">
							<div className="col-lg-12">
								<Dashboard
									lang={lang}
									currentUser={currentUser}
									dashboardCardList={dashboardCardList}
									dashboardDict={dict.dashboard}
								/>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		// profile is valid; show the statistics in AdminLayout (with side navigation)
		const dashboardStats = await getDashboardStats();

		const adminDashboardCardList = [
			{
				icon: "bx bxs-user-account",
				label: dict.adminDashboard.students,
				url: `/${lang}/admin/students`,
				valid: null,
				message: dict.adminDashboard.studentsH
					.replace("{students}", dashboardStats.students.toString())
					.replace("{astudents}", dashboardStats.activeStudents.toString())
					.replace("{vstudents}", dashboardStats.validStudents.toString()),
			},
			{
				icon: "bx bxs-user-account",
				label: dict.adminDashboard.teachers,
				url: `/${lang}/admin/teachers`,
				valid: null,
				message: dict.adminDashboard.teachersH
					.replace("{teachers}", dashboardStats.teachers.toString())
					.replace("{ateachers}", dashboardStats.activeTeachers.toString())
					.replace("{vteachers}", dashboardStats.validTeachers.toString()),
			},
		];

		return (
			<>
				<AdminLayout lang={lang}>
					<Dashboard
						lang={lang}
						currentUser={currentUser}
						dashboardCardList={adminDashboardCardList}
						dashboardDict={dict.adminDashboard}
					/>
				</AdminLayout>
			</>
		);
	}
};

export default page;
