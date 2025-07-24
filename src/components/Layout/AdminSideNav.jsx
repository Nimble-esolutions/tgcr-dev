"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StickyBox from "react-sticky-box";

<<<<<<< HEAD
const AdminSideNav = ({ currentUser, lang, dashboardAdminDict }) => {
	const pathname = usePathname();
=======
const AdminSideNav = ({ lang, currentUser, back, adminDashboardDict }) => {
	// currentUser is the logged-in user
	const pathname = usePathname();
	back = back ?? "";
>>>>>>> origin/admin

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
<<<<<<< HEAD
					{dashboardAdminDict.menu}
=======
					{adminDashboardDict.menu}
>>>>>>> origin/admin
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
<<<<<<< HEAD
							<Link
								href={`/${lang}/admin/dashboard`}
								className={pathname == `/${lang}/admin/dashboard` ? "active" : null}
							>
								{dashboardAdminDict.dashboard}
							</Link>
							<Link
								href={`/${lang}/admin/teachers`}
								className={pathname == `/${lang}/admin/teachers` ? "active" : null}
							>
								{dashboardAdminDict.teachers}
							</Link>
							<Link
								href={`/${lang}/admin/students`}
								className={pathname == `/${lang}/admin/students` ? "active" : null}
							>
								{dashboardAdminDict.students}
							</Link>
							{/* <Link
								href={`/${lang}/admin/courses/`}
								className={pathname == `/${lang}/admin/courses` ? "active" : null}
							>
								Courses
							</Link> */}
							{/* <Link
								href={`/${lang}/admin/partners/`}
								className={pathname == `/${lang}/admin/partners` ? "active" : null}
							>
								Partners
							</Link> */}
=======
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

>>>>>>> origin/admin
							{/* <Link
								href={`/${lang}/admin/testimonials/`}
								className={
									pathname == `/${lang}/admin/testimonials` ? "active" : null
								}
							>
								Testimonials
							</Link> */}
							{/* <Link
<<<<<<< HEAD
								href={`/${lang}/admin/categories/`}
								className={
									pathname == `/${lang}/admin/categories` ? "active" : null
								}
							>
								Categories
							</Link> */}
							{/* <Link
=======
>>>>>>> origin/admin
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
