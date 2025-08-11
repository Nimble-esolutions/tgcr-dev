"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./css/BackButton.module.css";

const BackButton = () => {
	const router = useRouter();

	const handleBackClick = () => {
		router.back(); // Navigates to the previous page
	};

	return (
		<span className={styles["default-back-btn"]} onClick={handleBackClick}>
			<i className="fa-solid fa-arrow-left"></i>
		</span>
	);
};

export default BackButton;
