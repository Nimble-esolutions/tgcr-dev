"use client";

import React from "react";
import CourseRow from "@/components/Admin/CourseRow";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CoursesTable = ({ courses, lang }) => {
	const router = useRouter();
	const handleCourseHome = async (courseId) => {
		try {
			const data = { apply: true };
			const response = await axios.post(`/api/admin/${courseId}`, data);
			toast.success(response.data.message);
			router.refresh();
		} catch (err) {
			console.log(err);
			// toast.error(message);
		}
	};

	const handleCourseRemoveHome = async (courseId) => {
		try {
			const data = { apply: false };
			const response = await axios.post(`/api/admin/${courseId}`, data);
			toast.success(response.data.message);
			router.refresh();
		} catch (err) {
			console.log(err);
			// toast.error(message);
		}
	};
	return (
		<div className="table-responsive">
			<table className="table align-middle table-hover fs-14">
				<thead>
					<tr>
						<th scope="col">Title</th>
						<th scope="col">Price</th>
						<th scope="col">Category</th>
						<th scope="col">Instructor</th>
						<th scope="col">Videos</th>
						<th scope="col">Homepage</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>
					{courses.length > 0 ? (
						courses.map((course) => (
							<CourseRow
								key={course.id}
								{...course}
								onHome={() => handleCourseHome(course.id)}
								onHomeRemove={() =>
									handleCourseRemoveHome(course.id)
								}
								lang={lang}
							/>
						))
					) : (
						<tr>
							<td colSpan="7" className="text-center py-3">
								Empty!
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default CoursesTable;
