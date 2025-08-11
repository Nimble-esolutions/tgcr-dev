"use client";

import React from "react";
import Link from "next/link";
import { UIDayDateTime } from "@/utils/dateUtils";

// displayed from the CheckoutForm (navItem=false) and the Navigation bar (navItem=true)
const CartItem = ({ lang, index, cartItem, dict, onRemove, navItem }) => {
	return (
		<>
			<div key={cartItem.teacherId}>
				{index === 0 && (
					<div style={{ margin: navItem ? "inherit" : "0px 0px 10px 0px" }}>
						{/* // Display the teacher name only once */}
						<Link
							className={navItem ? "fw-bold mb-3 ms-2" : "fw-bold mb-3"}
							style={{ fontSize: navItem ? "10px" : "inherit" }}
							href={`/${lang}/teacher/${cartItem.teacherId}`}
						>
							{cartItem.teacherName}
						</Link>
					</div>
				)}
				<div className="d-flex flex-column">
					<div
						key={cartItem.id}
						className="d-flex justify-content-between"
						style={{ margin: navItem ? "0px 12px 5px 12px" : "inherit" }}
					>
						<div style={{ flex: 35 }}>
							<p
								key={cartItem.id + "0"}
								style={{ fontSize: navItem ? "10px" : "inherit" }}
							>
								{UIDayDateTime(
									cartItem.startTime,
									cartItem.studentTimezoneIdentifier
								)}
							</p>
						</div>
						<div style={{ flex: 48 }}>
							<p
								key={cartItem.id + "1"}
								className="text-left"
								style={{ fontSize: navItem ? "10px" : "inherit" }}
							>
								{cartItem.classLevelName}
							</p>
						</div>
						<div style={{ flex: 17 }}>
							<p
								key={cartItem.id + "2"}
								className="text-end"
								style={{ fontSize: navItem ? "10px" : "inherit" }}
							>
								{dict.lessonPrice.replace("{price}", cartItem.price.toFixed(2))}
							</p>
						</div>
						{!navItem && (
							<div className="action-button" style={{ flex: 10 }}>
								<button
									onClick={() => onRemove(cartItem.id)}
									className="btn btn-danger remove mb-1"
								>
									<i className="bx bx-trash"></i>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			{!navItem && <hr />}
		</>
	);
};

export default CartItem;
