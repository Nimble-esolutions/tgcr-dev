"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { stripHtmlAndTruncate } from "@/utils/stripHtmlAndTruncate";
import HeartButton from "@/components/FormHelpers/HeartButton";

const CourseCard = ({
	currentUser,
	id,
	title,
	slug,
	overview,
	regular_price,
	before_price,
	lessons,
	image,
	user,
	enrolments,
	lang,
}) => {
	return (
		<div className="col-lg-4 col-md-6">
			<div className="single-courses-box">
				<div className="courses-image">
					<Link href={`/${lang}/course/${slug}`} className="d-block image">
						<Image width={750} height={599} src={image} alt={title} />
					</Link>

					<HeartButton currentUser={currentUser} courseId={id} />

					<>
						{before_price > 0 && (
							<div className="price shadow discount-price">
								<del>${before_price}</del>
							</div>
						)}
						<div className="price shadow">${regular_price}</div>
					</>
				</div>

				<div className="courses-content">
					<div className="course-author d-flex align-items-center">
						<Image
							src={user.profile_photo ? user.profile_photo : "/images/user6.jpg"}
							width={200}
							height={200}
							className="rounded-circle"
							alt="image"
						/>
						<span>{`${user.name}`}</span>
					</div>

					<h3>
						<Link href={`/${lang}/course/${slug}`} title={title}>
							{title.slice(0, 40)}...
						</Link>
					</h3>

					<p>{stripHtmlAndTruncate(overview, 20)}</p>

					<ul className="courses-box-footer d-flex justify-content-between align-items-center">
						<li>
							<i className="flaticon-agenda"></i> {lessons} Lessons
						</li>
						<li>
							<i className="flaticon-people"></i> {enrolments && enrolments.length}{" "}
							Students
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
