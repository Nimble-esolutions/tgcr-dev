"use client";

import StudentsRaw from "@/components/Admin/StudentsRaw";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Table = ({ users }) => {
	const router = useRouter();
	const handleAdmin = async (userId, role) => {
		console.log(role);
		try {
			const data = { admin: role };
			const response = await axios.post(
				`/api/admin/users/${userId}`,
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
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Phone</th>
						<th scope="col">Status</th>
						<th scope="col">Text</th>
						<th scope="col">Make Admin</th>
					</tr>
				</thead>
				<tbody>
					{users.length > 0 ? (
						users.map((user) => (
							<StudentsRaw
								key={user.id}
								{...user}
								onAdmin={() => handleAdmin(user.id, user.role)}
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
