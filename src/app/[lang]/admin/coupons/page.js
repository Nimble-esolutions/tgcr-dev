import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminSideNav from "@/components/Layout/AdminSideNav";
import Link from "next/link";
import Content from "./Content";
import { getCoupons } from "@/actions/admin/getCoupons";

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const { coupons } = await getCoupons();

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
										<Link href={`/${lang}/admin/coupons/`} className="active">
											Coupons
										</Link>
									</li>
									<li>
										<Link href={`/${lang}/admin/coupons/create/`}>Create</Link>
									</li>
								</ul>

								<Content coupons={coupons} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
