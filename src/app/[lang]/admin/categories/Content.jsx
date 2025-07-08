"use client";

import CatRow from "@/components/Admin/CatRow";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Content = ({ categories }) => {
	const handleDelete = async (catId) => {
		try {
			const response = await axios.delete(
				`/api/admin/categories/${catId}`
			);
			toast.success(response.data.message);
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
			<table className="table table-hover align-middle fs-14">
				<thead>
					<tr>
						<th scope="col">Categories</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{categories.length > 0 ? (
						categories.map((cat) => (
							<CatRow
								{...cat}
								key={cat.id}
								onDelete={() => handleDelete(cat.id)}
							/>
						))
					) : (
						<tr>
							<td colSpan="3" className="text-center py-3">
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
