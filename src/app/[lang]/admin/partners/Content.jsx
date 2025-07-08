"use client";

import PartnerRow from "@/components/Admin/PartnerRow";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Content = ({ partners }) => {
	const router = useRouter();
	const handleDelete = async (partnerId) => {
		try {
			const response = await axios.delete(
				`/api/admin/partners/${partnerId}`
			);
			toast.success(response.data.message);
			router.refresh();
		} catch (err) {
			// console.log(err.data);
			toast.error(err.data.response.message);
		}
	};
	return (
		<table className="table align-middle table-hover fs-14">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Image</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				{partners.length > 0 ? (
					partners.map((partner) => (
						<PartnerRow
							key={partner.id}
							{...partner}
							onDelete={() => handleDelete(partner.id)}
						/>
					))
				) : (
					<tr>
						<td colSpan="4" className="text-center py-3">
							Empty!
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default Content;
