"use client";

import Image from "next/image";
import React from "react";

const PartnerRow = ({ id, name, image, onDelete }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>
				<Image
					width={150}
					height={60}
					src={image}
					alt="image"
					className="w-100px"
				/>
			</td>
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

export default PartnerRow;
