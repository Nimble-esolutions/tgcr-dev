"use client";

import React from "react";

const CouponRow = ({ id, code, discount, onDelete }) => {
	return (
		<tr>
			<td>{code}</td>
			<td>{discount}%</td>

			<td>
				<button
					onClick={() => onDelete(id)}
					type="button"
					className="btn btn-danger btn-sm fs-12"
				>
					Delete{" "}
				</button>
			</td>
		</tr>
	);
};

export default CouponRow;
