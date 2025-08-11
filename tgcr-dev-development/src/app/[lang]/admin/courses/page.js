import Link from "next/link";
import CoursesTable from "./CoursesTable";
import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminSideNav from "@/components/Layout/AdminSideNav";
import { getCoursesAdmin } from "@/actions/admin/getCoursesAdmin";

const Page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const { courses } = await getCoursesAdmin();

	// console.log(courses);
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
										<Link href={`/${lang}/admin/courses/`} className="active">
											Courses
										</Link>
									</li>
									<li>
										<Link href={`/${lang}/admin/courses/new-arrival/`}>
											New Arrival
										</Link>
									</li>
								</ul>
								<CoursesTable courses={courses} lang={lang} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
