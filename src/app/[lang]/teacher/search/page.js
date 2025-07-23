import React from "react";
import { getTeachers } from "@/actions/teacher/getTeachers.ts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { PROFILE_MAX_PRICE, SEARCH_QPARAMS } from "@/libs/constants";
import TeacherList from "@/components/Teacher/TeacherList";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.teacherSearch.pageTitle,
	};
}

const page = async ({ params, searchParams }) => {
	const { lang } = await params;
	const { sk, cl, pr, eb, eq, el, im, so, pg } = await searchParams; // sk=&cl=&pr=1000&eb=&eq=&el=&im=&so=&pg=1
	const currentUser = await getCurrentUser();
	const dict = await getDictionary(lang);

	const { teachers, totalPages, totalTeachers } = await getTeachers(
		sk || "", // searchParams[SEARCH_QPARAMS.SEARCH_KEYWORD] || "",
		parseInt(cl || "", 10), // parseInt(searchParams[SEARCH_QPARAMS.CLASS_LEVEL] || "", 10),
		parseFloat(pr || PROFILE_MAX_PRICE), // parseFloat(searchParams[SEARCH_QPARAMS.PRICE] || PROFILE_MAX_PRICE),
		parseInt(eb || "", 10), // parseInt(searchParams[SEARCH_QPARAMS.EDUCATIONAL_BOARD] || "", 10),
		parseInt(eq || "", 10), // parseInt(searchParams[SEARCH_QPARAMS.EDUCATIONAL_QUALI] || "", 10),
		parseInt(el || "", 10), // parseInt(searchParams[SEARCH_QPARAMS.EXPERIENCE_LEVEL] || "", 10),
		im || "", // searchParams[SEARCH_QPARAMS.INSTRUCTION_MED] || "",
		so || "", // searchParams[SEARCH_QPARAMS.SORT_ORDER] || "",
		parseInt(pg || "1", 10) // parseInt(searchParams[SEARCH_QPARAMS.PAGE] || "1", 10)
	);

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<h2 className="mb-4">{dict.teacherSearch.pageTitle}</h2>
					<div className="row">
						<div className="col-lg-12">
							<TeacherList
								lang={lang}
								currentUser={currentUser}
								teachersList={teachers}
								totalTeachers={totalTeachers}
								totalPages={totalPages}
								teacherSearchDict={dict.teacherSearch}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
