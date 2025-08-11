import { redirect } from "next/navigation";
import { Dashboard } from "@/components/Layout/Dashboard";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import AdminSideNav from "@/components/Layout/AdminSideNav";
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
		// profile is valid; show the statistics
		return (
			<>
				<div className="main-content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-3 col-md-4">
								<AdminSideNav
									currentUser={currentUser}
									lang={lang}
									dashboardAdminDict={dict.dashboardAdmin}
								/>
							</div>

							<div className="col-lg-9 col-md-8">
								<div className="main-content-box">
									<div className="row justify-content-center">
										<div className="col-lg-4 col-sm-6">
											<div className="info-box-card">
												<i className="bx bx-group"></i>
												<h1>{students}</h1>
												<p>Total Students</p>
											</div>
										</div>

										<div className="col-lg-4 col-sm-6">
											<div className="info-box-card">
												<i className="bx bxs-file"></i>
												<h1>{courses}</h1>
												<p>Total Courses</p>
											</div>
										</div>

										<div className="col-lg-4 col-sm-6">
											<div className="info-box-card">
												<i className="bx bx-group"></i>
												<h1>{instructors}</h1>
												<p>Total Instructors</p>
											</div>
										</div>

										<div className="col-lg-4 col-sm-6">
											<div className="info-box-card">
												<i className="bx bx-cart"></i>
												<h1>{enrolments}</h1>
												<p>Course Enrolled</p>
											</div>
										</div>

										<div className="col-lg-4 col-sm-6">
											<div className="info-box-card">
												<i className="bx bx-cart"></i>
												<h1>${earningsTotal}</h1>
												<p>Total Sale</p>
											</div>
										</div>

										<div className="col-lg-4 col-sm-6">
											<div className="info-box-card">
												<i className="bx bx-cart"></i>
												<h1>{videos}</h1>
												<p>Course Videos</p>
											</div>
										</div>
										<div className="col-lg-4 col-sm-6">
											<div className="info-box-card">
												<i className="bx bx-cart"></i>
												<h1>{assets}</h1>
												<p>Course Assets</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default page;
