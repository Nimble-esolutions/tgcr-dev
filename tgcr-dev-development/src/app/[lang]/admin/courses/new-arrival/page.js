import React from "react";
import Link from "next/link";
import Table from "./Table";
import AdminSideNav from "@/components/Layout/AdminSideNav";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getNewCourses } from "@/actions/admin/getCoursesAdmin";

const Page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const { courses } = await getNewCourses();
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
										<Link href={`/${lang}/admin/courses/`}>Courses</Link>
									</li>
									<li>
										<Link
											href={`/${lang}/admin/courses/new-arrival/`}
											className="active"
										>
											New Arrival
										</Link>
									</li>
								</ul>

								<Table courses={courses} lang={lang} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
