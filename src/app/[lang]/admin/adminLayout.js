// container page for all the subpages of admin section
// this page just defines the layout of the admin section
// childpages are rendered from the pages in the admin directory
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role } from "@prisma/client";
import AdminSideNav from "@/components/Layout/AdminSideNav";

const AdminLayout = async ({ children, lang, back }) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Admin)) {
		// only visible for admins
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);

	return (
		<>
			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-2 col-md-3">
							<AdminSideNav
								lang={lang}
								currentUser={currentUser}
								back={back}
								adminDashboardDict={dict.adminDashboard}
							/>
						</div>

						<div className="col-lg-10 col-md-9">
							<div className="main-content-box">
								{children}
								{/* <div className="row justify-content-center">
									<div className="col-lg-4 col-sm-6">
										<div className="info-box-card">
											<i className="bx bx-group"></i>
											<h1>99</h1>
											<p>{dict.adminDashboard.students}</p>
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export { AdminLayout };
