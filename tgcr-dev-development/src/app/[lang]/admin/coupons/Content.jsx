"use client";

import CouponRow from "@/components/Admin/CouponRow";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Content = ({ coupons }) => {
	const router = useRouter();
	const handleDelete = async (couponId) => {
		try {
			const response = await axios.delete(
				`/api/admin/coupons/${couponId}`
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
			<table className="table table-hover align-middle fs-14">
				<thead>
					<tr>
						<th scope="col">Coupons</th>
						<th scope="col">Discount</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{coupons.length > 0 ? (
						coupons.map((coupon) => (
							<CouponRow
								{...coupon}
								key={coupon.id}
								onDelete={() => handleDelete(coupon.id)}
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
