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
		</>
	);
};

export default Page;
