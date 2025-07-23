import prisma from "@/libs/prismadb";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getStudentSchoolInfo } from "@/actions/student/getStudents.ts";

export async function POST(request) {
	// post body
	// {
	//   email: 'bhallav25@student.com',
	//   educationalBoardId: '3',
	//   gradeId: '2',
	//   subjectList: [ 'Mathematics', 'Physics' ],
	//   bio: 'Additional remarks',
	//   instructionMedium: 'English',
	//   lang: 'en'
	// }

	const body = await request.json();
	const email = body.email ?? "";
	const educationalBoardId = body.educationalBoardId ?? "";
	const gradeId = body.gradeId ?? "";
	const subjectList = body.subjectList ?? "";
	const bio = body.bio ?? "";
	const instructionMedium = body.instructionMedium ?? "";
	const lang = body.lang ?? "en";
	const dict = await getDictionary(lang);

	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, dict.errors.noUser);
	}

	try {
		// standard validations - same as on the UI
		if (!email) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.errors.noEmail);
		} else if (!educationalBoardId) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileSchooling.educationalBoardE1);
		} else if (!gradeId) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileSchooling.gradeE1);
		} else if (!instructionMedium) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileSchooling.instructionE1);
		} else if (!subjectList || subjectList.length === 0) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileSchooling.subjectsE2);
		}

		// all validations succeeded; get the SchoolInfo
		const currentUserSchoolInfo = await getStudentSchoolInfo(currentUser.id);

		// create Profile if it does not exist; otherwise update it
		if (currentUser.profile) {
			await prisma.Profile.update({
				where: { userId: currentUser.id },
				data: {
					subjects: subjectList.join(";"),
					bio: bio === "" ? null : bio,
					instructionLanguages: instructionMedium,
				},
			});
		} else {
			await prisma.Profile.create({
				data: {
					userId: currentUser.id,
					subjects: subjectList.join(";"),
					bio: bio === "" ? null : bio,
					instructionLanguages: instructionMedium,
				},
			});
		}

		// create studentEducationalBoard if it does not exist; otherwise update it
		if (!currentUserSchoolInfo.studentEducationalBoard) {
			await prisma.StudentEducationalBoard.create({
				data: {
					studentId: currentUser.id,
					educationalBoardId: parseInt(educationalBoardId),
				},
			});
		} else {
			await prisma.StudentEducationalBoard.update({
				where: {
					studentId: currentUserSchoolInfo.studentEducationalBoard.studentId,
				},
				data: { educationalBoardId: parseInt(educationalBoardId) },
			});
		}

		// create ClassLevel if it does not exists; otherwise update it
		// for a student: the class level is stored in studentClassLevel
		if (!currentUserSchoolInfo.studentClassLevel) {
			await prisma.StudentClassLevel.create({
				data: {
					studentId: currentUser.id,
					classLevelId: parseInt(gradeId),
				},
			});
		} else {
			await prisma.StudentClassLevel.update({
				where: {
					studentId: currentUserSchoolInfo.studentClassLevel.studentId,
				},
				data: { classLevelId: parseInt(gradeId) },
			});
		}

		return apiResponse(APIStatus.OK, dict.profilePersonal.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
