<<<<<<< HEAD
import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminSideNav from "@/components/Layout/AdminSideNav";
import Table from "./Table";
import Link from "next/link";
import { getUsers } from "@/actions/admin/getUser";

const Page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const { users } = await getUsers();
	// console.log(users);

	return (
		<>
			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<AdminSideNav currentUser={currentUser} lang={lang} />
						</div>

						<div className="col-lg-9 col-md-8">
							<div className="main-content-box">
								<ul className="nav-style1">
									<li>
										<Link href={`/${lang}/admin/students/`} className="active">
											Students
										</Link>
									</li>
									{/* <li>
										<Link
											href={`/${lang}/admin/students/site-admins/`}
										>
											Admins
										</Link>
									</li> */}
								</ul>

								<Table users={users} />
							</div>
						</div>
					</div>
				</div>
			</div>
=======
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { AdminLayout } from "../adminLayout";
import { Role } from "@prisma/client";
import { UserGrid } from "@/components/Admin/UserGrid";
import { getUsers } from "@/actions/admin/getUser";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.adminUserMgmt.pageTitle,
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
	const users = await getUsers(Role.Student);

	return (
		<>
			<AdminLayout lang={lang}>
				<UserGrid
					lang={lang}
					currentUser={currentUser}
					users={users}
					adminUserMgmtDict={dict.adminUserMgmt}
				/>
			</AdminLayout>
>>>>>>> origin/admin
		</>
	);
};

<<<<<<< HEAD
export default Page;
=======
export default page;
>>>>>>> origin/admin
