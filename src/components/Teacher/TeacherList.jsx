"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PROFILE_MAX_PRICE, SEARCH_QPARAMS } from "@/libs/constants";
import { PaginationFrontBack } from "@/components/FormHelpers/Pagination.tsx";
import TeacherSearchForm from "@/components/Teacher/TeacherSearchForm";
import TeacherCard from "@/components/Teacher/TeacherCard";

const TeacherList = ({
	lang,
	currentUser,
	teachersList,
	totalTeachers,
	totalPages,
	teacherSearchDict,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = parseInt(searchParams.get(SEARCH_QPARAMS.PAGE) || "1", 10);

	const handlePageChange = async (page) => {
		const queryParams = new URLSearchParams({
			[SEARCH_QPARAMS.SEARCH_KEYWORD]: searchParams.get(SEARCH_QPARAMS.SEARCH_KEYWORD) || "",
			[SEARCH_QPARAMS.CLASS_LEVEL]: searchParams.get(SEARCH_QPARAMS.CLASS_LEVEL) || "",
			[SEARCH_QPARAMS.PRICE]: searchParams.get(SEARCH_QPARAMS.PRICE) || PROFILE_MAX_PRICE,
			[SEARCH_QPARAMS.EDUCATIONAL_BOARD]:
				searchParams.get(SEARCH_QPARAMS.EDUCATIONAL_BOARD) || "",
			[SEARCH_QPARAMS.EDUCATIONAL_QUALI]:
				searchParams.get(SEARCH_QPARAMS.EDUCATIONAL_QUALI) || "",
			[SEARCH_QPARAMS.EXPERIENCE_LEVEL]:
				searchParams.get(SEARCH_QPARAMS.EXPERIENCE_LEVEL) || "",
			[SEARCH_QPARAMS.INSTRUCTION_MED]:
				searchParams.get(SEARCH_QPARAMS.INSTRUCTION_MED) || "",
			[SEARCH_QPARAMS.SORT_ORDER]: searchParams.get(SEARCH_QPARAMS.SORT_ORDER) || "",
			[SEARCH_QPARAMS.PAGE]: page.toString(),
		}).toString();
		router.push(pathname + "?" + queryParams);
	};

	return (
		<div className="subnav-form">
			{/* <p>{teacherSearchDict.pageTitleH}</p> */}
			<div className="row">
				<div className="col-md-3">
					<TeacherSearchForm lang={lang} teacherSearchDict={teacherSearchDict} />
				</div>
				<div className="col-md-9">
					{teachersList.length > 0 ? (
						teachersList.map((teacher) => (
							<TeacherCard
								key={teacher.id}
								currentUser={currentUser}
								teacher={teacher}
								lang={lang}
								teacherSearchDict={teacherSearchDict}
								detailMode={false}
							/>
						))
					) : (
						<p>{teacherSearchDict.noTeachersFound}</p>
					)}
				</div>
				{totalPages > 1 && (
					<div className="col-md-12">
						<div className="pagination-area text-center">
							<PaginationFrontBack
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TeacherList;
