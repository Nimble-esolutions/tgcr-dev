import AdminSideNav from "@/components/Layout/AdminSideNav";
import Link from "next/link";
import UpdateForm from "./UpdateForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getCategoryById } from "@/actions/admin/getCategories";

const page = async ({ params }) => {
	const lang = params;
	const currentUser = await getCurrentUser();
	const { category } = await getCategoryById(params);
	return (
		<>
			<div className="main-content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<AdminSideNav
								currentUser={currentUser}
								lang={lang}
							/>
						</div>

						<div className="col-lg-9 col-md-8">
							<div className="main-content-box">
								{/* Nav */}
								<ul className="nav-style1">
									<li>
										<Link
											href={`/${lang}/admin/categories/`}
										>
											Categories
										</Link>
									</li>
									<li>
										<Link
											href={`/${lang}/admin/categories/create/`}
										>
											Create
										</Link>
									</li>
									<li>
										<Link
											href={`/${lang}/admin/categories/${params.catId}/`}
											className="active"
										>
											Update
										</Link>
									</li>
								</ul>

								{/* Form */}
								<UpdateForm category={category} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
