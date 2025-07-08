import Link from "next/link";
import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminSideNav from "@/components/Layout/AdminSideNav";
import Content from "./Content";
import { getPartners } from "@/actions/admin/getPartners";

const Page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const { partners } = await getPartners();

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
										<Link href={`/${lang}/admin/partners/`} className="active">
											Partners
										</Link>
									</li>
									<li>
										<Link href={`/${lang}/admin/partners/create/`}>Create</Link>
									</li>
								</ul>

								<div className="table-responsive">
									<Content partners={partners} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
