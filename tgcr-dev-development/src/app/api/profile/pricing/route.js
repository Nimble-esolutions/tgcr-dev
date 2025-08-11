import prisma from "@/libs/prismadb";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { REGEX_CURRENCY } from "@/libs/constants";

export async function POST(request) {
	// post body
	// {
	//   email: 'bhallav25@teacher.com',
	//   classLevels: [
	//     {
	//       index: 0,
	//       key: 1,
	//       value: 1,
	//       label: 'Lower Primary(6 - 8)',
	//       originalId: 10,
	//       originalSelected: true,
	//       selected: true,
	//       pricing: '1.11',
	//       currency: 'EUR'
	//     },
	//     {
	//       index: 1,
	//       key: 2,
	//       value: 2,
	//       label: 'Upper Primary(8 - 12)',
	//       originalId: 11,
	//       originalSelected: true,
	//       selected: true,
	//       pricing: '2.22',
	//       currency: 'EUR'
	//     },
	//     ...
	//   ],
	//   lang: 'en',
	//   ...
	// }

	const body = await request.json();
	const email = body.email ?? "";
	const classLevels = body.classLevels ?? [];
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
		} else if (!classLevels || classLevels.length === 0) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePricing.pricePerLessonE3);
		} else if (
			classLevels &&
			classLevels.filter((item) => item.selected === true).length === 0
		) {
			// no grade/class selected
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePricing.pricePerLessonE4);
		} else if (
			classLevels &&
			classLevels.filter(
				(item) => item.selected === true && !REGEX_CURRENCY.test(item.pricing)
			).length > 0
		) {
			// some of the class levels are selected but have invalid pricing
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePricing.pricePerLessonE5);
		}

		// update all the values in TeacherClassLevelCost for this user
		// TeacherClassLevelCost will have multiple enteries per teacher
		// delete: originalSelected = true & selected = false
		// update: originalSelected = true & selected = true
		// insert: originalSelected = false & selected = true
		const clDelete = classLevels
			.filter((item) => item.originalSelected === true && item.selected === false)
			.map((clRow) => parseInt(clRow.originalId));
		// await prisma.TeacherClassLevelCost.deleteMany({
		// 	where: {
		// 		userId: currentUser.id,
		// 		id: {
		// 			in: clDelete,
		// 		},
		// 	},
		// });

		const clUpdate = classLevels
			.filter((item) => item.originalSelected === true && item.selected === true)
			.map((clRow) => ({
				id: parseInt(clRow.originalId),
				classLevelId: parseInt(clRow.value),
				costPerLesson: parseFloat(clRow.pricing),
				currency: clRow.currency,
			}));
		// clUpdate.forEach(async (clRow) => {
		// 	await prisma.TeacherClassLevelCost.update({
		// 		where: {
		// 			userId: currentUser.id,
		// 			id: clRow.id,
		// 			classLevelId: clRow.classLevelId,
		// 		},
		// 		data: {
		// 			costPerLesson: clRow.costPerLesson,
		// 			currency: clRow.currency,
		// 		},
		// 	});
		// });

		const clInsert = classLevels
			.filter((item) => item.originalSelected === false && item.selected === true)
			.map((clRow) => ({
				teacherId: currentUser.id,
				classLevelId: parseInt(clRow.value),
				costPerLesson: parseFloat(clRow.pricing),
				currency: clRow.currency,
			}));
		// await prisma.TeacherClassLevelCost.createMany({
		// 	data: clInsert,
		// });

		// calculate the average cost for Profile.costAverage
		const costAverage =
			classLevels
				.filter((item) => item.selected === true)
				.map((clRow) => parseFloat(clRow.pricing))
				.reduce((a, b) => a + b, 0) /
			classLevels.filter((item) => item.selected === true).length;

		// execute DELETE, UPDATE, INSERT in a single transaction
		// update the Profile table with the average cost
		await prisma.$transaction(async (prisma) => {
			await prisma.TeacherClassLevelCost.deleteMany({
				where: {
					teacherId: currentUser.id,
					id: {
						in: clDelete,
					},
				},
			});

			for (const clRow of clUpdate) {
				await prisma.TeacherClassLevelCost.update({
					where: {
						teacherId: currentUser.id,
						id: clRow.id,
						classLevelId: clRow.classLevelId,
					},
					data: {
						costPerLesson: clRow.costPerLesson,
						currency: clRow.currency,
					},
				});
			}

			await prisma.TeacherClassLevelCost.createMany({
				data: clInsert,
			});

			await prisma.Profile.update({
				where: {
					userId: currentUser.id,
				},
				data: {
					costAverage: costAverage,
				},
			});
		});

		return apiResponse(APIStatus.OK, dict.profilePersonal.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
