"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Role } from "@prisma/client";

const ProfileDropdown = ({ currentUser, lang, profileDropdown }) => {
	const isAdmin = currentUser?.role === Role.Admin;
	const isInstructor = currentUser?.role === Role.Instructor;
	const isStudent = currentUser?.role === Role.Student;
	const dashboardUrl = isAdmin
		? `/${lang}/admin/dashboard`
		: isInstructor
		? `/${lang}/teacher/dashboard`
		: `/${lang}/student/dashboard`;

	return (
		<>
			<div className="dropdown profile-dropdown">
				<div className="img ptb-15">
					<Image
						src={currentUser.image ? currentUser.image : "/images/avatar.jpg"}
						width={200}
						height={200}
						alt={currentUser.name ?? ""}
					/>
				</div>

				<ul className="dropdown-menu">
					<li>
						<Link
							href={`/${lang}/profile/personal`}
							className="dropdown-item author-dropdown-item"
						>
							<div className="d-flex align-items-center">
								<div className="img">
									<Image
										src={
											currentUser.image
												? currentUser.image
												: "/images/avatar.jpg"
										}
										width={200}
										height={200}
										alt={currentUser.name ?? ""}
									/>
								</div>

								<span className="ps-3">
									<span className="fw-semibold fs-16 mb-1 d-block">
										{currentUser.name}
									</span>
									<span className="d-block fs-13 mt-minus-2">
										{currentUser.email}
									</span>
								</span>
							</div>
						</Link>
					</li>

					<li>
						<hr className="dropdown-divider" />
					</li>

					<li>
						<Link href={dashboardUrl} className="dropdown-item">
							<i className="bx bxs-dashboard"></i>
							{profileDropdown.myDashboard}
						</Link>
					</li>

					{isInstructor && (
						<>
							<li>
								<Link
									href={`/${lang}/teacher/lessons/upcoming`}
									className="dropdown-item"
								>
									<i className="bx bx-book"></i>
									{profileDropdown.myLessons}
								</Link>
							</li>
							<li>
								<Link
									href={`/${lang}/teacher/availability`}
									className="dropdown-item"
								>
									<i className="bx bxs-calendar"></i>
									{profileDropdown.myAvailabilityCal}
								</Link>
							</li>
							<li>
								<Link href={`/${lang}/profile/pricing`} className="dropdown-item">
									<i className="bx bxs-coin-stack"></i>
									{profileDropdown.myPricing}
								</Link>
							</li>
						</>
					)}

					{isStudent && (
						<>
							<li>
								<Link
									href={`/${lang}/student/lessons/upcoming`}
									className="dropdown-item"
								>
									<i className="bx bx-book"></i>
									{profileDropdown.myLessons}
								</Link>
							</li>
						</>
					)}

					<li>
						<Link href={`/${lang}/profile/password`} className="dropdown-item">
							<i className="bx bxs-lock"></i>
							{profileDropdown.changePassword}
						</Link>
					</li>

					<li>
						<Link href={`/${lang}/profile/personal`} className="dropdown-item">
							<i className="bx bxs-user-account"></i>{" "}
							{profileDropdown.accountSettings}
						</Link>
					</li>

					<li>
						<hr className="dropdown-divider" />
					</li>

					<li>
						<button
							type="submit"
							onClick={() =>
								signOut({
									callbackUrl: `${window.location.origin}`,
									redirect: true,
								})
							}
							className="dropdown-item"
						>
							<i className="bx bx-log-out"></i>
							{profileDropdown.logout}
						</button>
					</li>
				</ul>
			</div>
		</>
	);
};

export default ProfileDropdown;
