import prisma from "@/libs/prismadb";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getTeacherExperience } from "@/actions/teacher/getTeachers.ts";
import { REGEX_LINKEDIN, REGEX_3WORDS } from "@/libs/constants";

export async function POST(request) {
	// post body
	// {
	//   email: 'bhallav25@teacher.com',
	//   linkedin: 'https://www.linkedin.com/in/bhallav',
	//   bioTitle: 'This is profile title',
	//   bio: 'This is brief introduction',
	//   nativeLanguage: 'English',
	//   teacherEducationalQualificationId: '1',
	//   teacherExperienceLevelId: '1',
	//   teacherEducationalBoardList: [ 1, 2 ],
	//   subjectList: [ 'Math', 'Physics' ],
	//   instructionMediumList: [ 'English', 'Hindi' ],
	//   lang: 'en'
	// }

	const body = await request.json();
	const email = body.email ?? "";
	const linkedin = body.linkedin ?? "";
	const bioTitle = body.bioTitle ?? "";
	const bio = body.bio ?? "";
	const nativeLanguage = body.nativeLanguage ?? "";
	const teacherEducationalQualificationId = body.teacherEducationalQualificationId ?? "";
	const teacherExperienceLevelId = body.teacherExperienceLevelId ?? "";
	const teacherEducationalBoardList = body.teacherEducationalBoardList ?? "";
	const subjectList = body.subjectList ?? "";
	const instructionMediumList = body.instructionMediumList ?? "";
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
		} else if (!linkedin) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.linkedinE2);
		} else if (linkedin && !REGEX_LINKEDIN.test(linkedin)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.linkedinE2);
		} else if (!bioTitle) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.profileTitleE2);
		} else if (bioTitle && !REGEX_3WORDS.test(bioTitle)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.profileTitleE2);
		} else if (!nativeLanguage) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.nativeLanguageE1);
		} else if (!teacherEducationalQualificationId) {
			return apiResponse(
				APIStatus.BAD_REQUEST,
				dict.profileExperience.educationalQualificationE1
			);
		} else if (!teacherExperienceLevelId) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.teachingExperienceE1);
		} else if (!teacherEducationalBoardList || teacherEducationalBoardList.length === 0) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.educationalBoardE2);
		} else if (!subjectList || subjectList.length === 0) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.subjectsE2);
		} else if (!instructionMediumList || instructionMediumList.length === 0) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileExperience.instructionE2);
		}

		// all validations succeeded; get the Teaching Experience
		const teachingExperience = await getTeacherExperience(currentUser.id);

		// create Profile if it does not exist; otherwise update it
		if (currentUser.profile) {
			await prisma.Profile.update({
				where: { userId: currentUser.id },
				data: {
					linkedin: linkedin,
					bioTitle: bioTitle,
					bio: bio === "" ? null : bio,
					subjects: subjectList.join(";"),
					nativeLanguage: nativeLanguage,
					instructionLanguages: instructionMediumList.join(";"),
				},
			});
		} else {
			await prisma.Profile.create({
				data: {
					userId: currentUser.id,
					linkedin: linkedin,
					bioTitle: bioTitle,
					bio: bio === "" ? null : bio,
					subjects: subjectList.join(";"),
					nativeLanguage: nativeLanguage,
					instructionLanguages: instructionMediumList.join(";"),
				},
			});
		}

		// create TeacherEducationalQualification if it does not exist; otherwise update it
		// note that TeacherEducationalQualification will have 1 entry per user
		if (teachingExperience.teacherEducationalQualifications.length === 0) {
			await prisma.TeacherEducationalQualification.create({
				data: {
					teacherId: currentUser.id,
					educationalQualificationId: parseInt(teacherEducationalQualificationId),
				},
			});
		} else {
			await prisma.TeacherEducationalQualification.update({
				where: {
					id: teachingExperience.teacherEducationalQualifications[0].id,
					teacherId: teachingExperience.teacherEducationalQualifications[0].teacherId,
				},
				data: {
					educationalQualificationId: parseInt(teacherEducationalQualificationId),
				},
			});
		}

		// create TeacherExperienceLevel if it does not exist; otherwise update it
		// note that TeacherExperienceLevel will have 1 entry per user
		if (teachingExperience.teacherExperienceLevels.length === 0) {
			await prisma.TeacherExperienceLevel.create({
				data: {
					teacherId: currentUser.id,
					experienceLevelId: parseInt(teacherExperienceLevelId),
				},
			});
		} else {
			await prisma.TeacherExperienceLevel.update({
				where: {
					id: teachingExperience.teacherExperienceLevels[0].id,
					teacherId: teachingExperience.teacherExperienceLevels[0].teacherId,
				},
				data: {
					experienceLevelId: parseInt(teacherExperienceLevelId),
				},
			});
		}

		// delete all the values for this user, and then reinsert all the provided values
		// note that TeacherEducationalBoard will have multiple enteries per teacher
		await prisma.TeacherEducationalBoard.deleteMany({
			where: {
				teacherId: currentUser.id,
			},
		});
		const ebList = teacherEducationalBoardList.map((boardId) => ({
			teacherId: currentUser.id,
			educationalBoardId: boardId,
		}));
		// executing all inserts
		await prisma.TeacherEducationalBoard.createMany({
			data: ebList,
		});

		return apiResponse(APIStatus.OK, dict.profilePersonal.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
