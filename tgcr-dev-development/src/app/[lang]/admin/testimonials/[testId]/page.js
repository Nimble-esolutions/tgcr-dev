import Link from "next/link";
import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminSideNav from "@/components/Layout/AdminSideNav";
import UpdateForm from "./UpdateForm";
import { getTestimonialsById } from "@/actions/admin/getTestimonials";

const page = async ({ params }) => {
	const { lang } = params;
	const currentUser = await getCurrentUser();
	const { testimonial } = await getTestimonialsById(params);

	// const handleSubmit = async (data) => {};

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
											href={`/${lang}/admin/testimonials/`}
										>
											Testimonials
										</Link>
									</li>
									<li>
										<Link
											href={`/${lang}/admin/testimonials/create/`}
										>
											Create
										</Link>
									</li>
									<li>
										<Link
											href={`/${lang}/admin/testimonials/${testimonial.id}/`}
											className="active"
										>
											Update
										</Link>
									</li>
								</ul>

								{/* Form */}
								<UpdateForm testimonial={testimonial} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
