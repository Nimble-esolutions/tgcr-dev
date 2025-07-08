"use client";

import CourseRow from "@/components/Admin/CourseRow";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Table = ({ courses, lang }) => {
	const router = useRouter();
	const handleApprove = async (courseId) => {
		try {
			const data = { approved: true };
			const response = await axios.post(
				`/api/admin/${courseId}/requests`,
				data
			);
			toast.success(response.data.message);
			router.refresh();
		} catch (err) {
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message);
		}
	};

	const handleDeny = async (courseId) => {
		try {
			const data = { approved: false };
			const response = await axios.post(
				`/api/admin/${courseId}/requests`,
				data
			);
			toast.success(response.data.message);
			router.refresh();
		} catch (err) {
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message);
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
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{courses.length > 0 ? (
						courses.map((course) => (
							<CourseRow
								key={course.id}
								{...course}
								onApprove={() => handleApprove(course.id)}
								onDeny={() => handleDeny(course.id)}
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

export default Table;
