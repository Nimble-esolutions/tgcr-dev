"use client";

import TestimonialRow from "@/components/Admin/TestimonialRow";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Content = ({ testimonials = [] }) => {
	const router = useRouter();
	const handleDelete = async (testId) => {
		try {
			const response = await axios.delete(
				`/api/admin/testimonials/${testId}`
			);
			toast.success(response.data.message);
			router.refresh();
		} catch (err) {
			toast.error(err.response.data.message);
		}
	};
	return (
		<div className="table-responsive">
			<table className="table table-hover align-middle fs-14">
				<thead>
					<tr>
						<th scope="col">Image</th>
						<th scope="col">Name</th>
						<th scope="col">Designation</th>
						<th scope="col">Text</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{testimonials.length > 0 ? (
						testimonials.map((test) => (
							<TestimonialRow
								{...test}
								key={test.id}
								onDelete={() => handleDelete(test.id)}
							/>
						))
					) : (
						<tr>
							<td colSpan="6" className="text-center py-3">
								Empty!
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Content;
