"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StickyBox from "react-sticky-box";

const AdminSideNav = ({ lang, currentUser, back, adminDashboardDict }) => {
	// currentUser is the logged-in user
	const pathname = usePathname();
	back = back ?? "";

	// Sidebar Nav
	const [isActiveSidebarNav, setActiveSidebarNav] = useState("false");
	const handleToggleSidebarNav = () => {
		setActiveSidebarNav(!isActiveSidebarNav);
	};

	return (
		<>
			<div className="text-end d-md-none">
				{/* For mobile device */}
				<div className="sidebar-menu-button" onClick={handleToggleSidebarNav}>
					{adminDashboardDict.menu}
				</div>
			</div>

			<div className={`side-nav-wrapper ${isActiveSidebarNav ? "" : "active"}`}>
				<StickyBox className="sticky-box" offsetTop={50} offsetBottom={20}>
					<div className="close d-md-none" onClick={handleToggleSidebarNav}>
						{/* Close button */}
						<i className="bx bx-x"></i>
					</div>

					<div className="side-nav">
						{/* Nav */}
						<ul>
							<li>
								<Link
									href={`/${lang}/admin/dashboard`}
									className={
										pathname == `/${lang}/admin/dashboard` ? "active" : null
									}
								>
									{adminDashboardDict.dashboard}
								</Link>
							</li>
							<li>
								<Link
									href={`/${lang}/admin/students`}
									className={
										pathname == `/${lang}/admin/students` ? "active" : null
									}
								>
									{adminDashboardDict.students}
								</Link>
							</li>
							<li>
								<Link
									href={`/${lang}/admin/teachers`}
									className={
										pathname == `/${lang}/admin/teachers` ? "active" : null
									}
								>
									{adminDashboardDict.teachers}
								</Link>
							</li>

							{/* <Link
								href={`/${lang}/admin/testimonials/`}
								className={
									pathname == `/${lang}/admin/testimonials` ? "active" : null
								}
							>
								Testimonials
							</Link> */}
							{/* <Link
								href={`/${lang}/admin/coupons/`}
								className={pathname == `/${lang}/admin/coupons` ? "active" : null}
							>
								Coupons
							</Link> */}
						</ul>
					</div>
				</StickyBox>
			</div>
		</>
	);
};

export default AdminSideNav;
