import React from "react";
import styles from "./css/Pagination.module.css";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className={styles["pagination"]}>
			{currentPage < totalPages && (
				<button
					type="button"
					title="Next"
					onClick={() => handlePageChange(currentPage + 1)}
				>
					<i className="fa-solid fa-arrows-down-to-line"></i>
				</button>
			)}
		</div>
	);
};

const PaginationFrontBack: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	// const renderPageNumbers = () => {
	// 	const pages = [];
	// 	for (let i = 1; i <= totalPages; i++) {
	// 		pages.push(
	// 			<button
	// 				key={i}
	// 				onClick={() => handlePageChange(i)}
	// 				className={i === currentPage ? "active" : ""}
	// 			>
	// 				{i}
	// 			</button>
	// 		);
	// 	}
	// 	return pages;
	// };

	return (
		<div className={styles["pagination"]}>
			<button
				type="button"
				title={`Page ${1}`}
				onClick={() => handlePageChange(1)}
				disabled={currentPage === 1}
			>
				<i className="fa-solid fa-backward-fast"></i>
			</button>
			<button
				type="button"
				title="Previous"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<i className="fa-solid fa-backward"></i>
			</button>
			<span className="page-info">
				{currentPage} / {totalPages}
			</span>
			<button
				type="button"
				title="Next"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<i className="fa-solid fa-forward"></i>
			</button>
			<button
				type="button"
				title={`Page ${totalPages}`}
				onClick={() => handlePageChange(totalPages)}
				disabled={currentPage === totalPages}
			>
				<i className="fa-solid fa-forward-fast"></i>
			</button>
		</div>
	);
};

export { PaginationFrontBack, Pagination };
