import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminSideNav from "@/components/Layout/AdminSideNav";
import Link from "next/link";
import CreateForm from "./CreateForm";

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

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
										<Link href={`/${lang}/admin/testimonials/`}>
											Testimonials
										</Link>
									</li>
									<li>
										<Link
											href={`/${lang}/admin/testimonials/create/`}
											className="active"
										>
											Create
										</Link>
									</li>
								</ul>

								{/* Form */}
								<CreateForm />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
