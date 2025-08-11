import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTeacherById, getTeacherFeedback } from "@/actions/teacher/getTeachers.ts";
import { getStudentSchoolInfo } from "@/actions/student/getStudents";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { stripHtmlAndTruncate } from "@/utils/utils";
import { PROFILE_BIO_MINWORDS } from "@/libs/constants";
import TeacherDetails from "@/components/Teacher/TeacherDetails";
import BackButton from "@/components/FormHelpers/BackButton";

export async function generateMetadata({ params }) {
	// teacher's name and bio are used for the metadata
	const { id } = await params;
	const teacher = await getTeacherById(id);

	if (!teacher) {
		return;
	}

	return {
		title: teacher.name,
		description: stripHtmlAndTruncate(teacher.profile?.bio, PROFILE_BIO_MINWORDS),
		openGraph: {
			images: [teacher.image],
		},
	};
}

const page = async ({ params }) => {
	const { lang, id } = await params;
	const teacher = await getTeacherById(id);
	const feedback = await getTeacherFeedback(id);
	const currentUser = await getCurrentUser();
	const dict = await getDictionary(lang); // teacherSearch is used as the dictionary
	const studentSchoolInfo = currentUser ? await getStudentSchoolInfo(currentUser.id) : null; // studentSchoolInfo is used to get the class level of the student

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<div
						style={{
							display: "flex",
							alignItems: "top",
							gap: "10px",
						}}
					>
						<BackButton />
						<h2 className="mb-4">
							{teacher
								? dict.teacherSearch.pageTitleDetail.replace("{name}", teacher.name)
								: dict.teacherSearch.teacherNotFound}
						</h2>
					</div>
					<div className="row">
						{teacher && (
							<div className="col-lg-12">
								<TeacherDetails
									lang={lang}
									currentUser={currentUser}
									teacher={teacher}
									feedback={feedback}
									studentClassLevel={
										studentSchoolInfo
											? studentSchoolInfo.studentClassLevel
											: null
									}
									teacherSearchDict={dict.teacherSearch}
									lookupAPIDict={dict.lookupAPI}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
