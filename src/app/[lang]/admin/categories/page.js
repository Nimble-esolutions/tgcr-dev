import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminSideNav from "@/components/Layout/AdminSideNav";
import Content from "./Content";
import Link from "next/link";
import { getCategories } from "@/actions/admin/getCategories";

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const { categories } = await getCategories();

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
								{/* Nav */}
								<ul className="nav-style1">
									<li>
										<Link
											href={`/${lang}/admin/categories/`}
											className="active"
										>
											Categories
										</Link>
									</li>
									<li>
										<Link href={`/${lang}/admin/categories/create/`}>
											Create
										</Link>
									</li>
								</ul>

								<Content categories={categories} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
