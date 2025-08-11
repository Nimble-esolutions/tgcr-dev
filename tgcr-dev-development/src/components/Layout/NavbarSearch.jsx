"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const NavbarSearch = ({ lang, dict }) => {
	const [subject, setSubject] = useState("");
	const router = useRouter();

	const handleSearch = (e) => {
		e.preventDefault();
		router.push(`/${lang}/teacher/search?sk=${subject}`);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch(e);
		}
	};

	return (
		<form className="search-box" onSubmit={handleSearch}>
			<input
				type="text"
				className="input-search"
				placeholder={dict.searchTeachers}
				name="subject"
				value={subject}
				onChange={(e) => setSubject(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button type="submit">
				<i className="flaticon-search" title={dict.findTeachers}></i>
			</button>
		</form>
	);
};

export default NavbarSearch;
