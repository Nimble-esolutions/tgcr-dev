"use client";

import React from "react";
import useFavourite from "@/hooks/useFavorite";

const HeartButton = ({ currentUser, courseId }) => {
	const { hasFauvorited, toggleFavourite } = useFavourite({
		courseId,
		currentUser,
	});
	return (
		<button className="btn fav" onClick={toggleFavourite}>
			{hasFauvorited ? (
				<i className="bx bxs-heart"></i>
			) : (
				<i className="bx bx-heart"></i>
			)}
		</button>
	);
};

export default HeartButton;
