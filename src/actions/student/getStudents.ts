import { User, Prisma } from "@prisma/client";
import prisma from "@/libs/prismadb";
import { LESSON_TYPE_QVALUE } from "@/libs/constants";

// fetching the School Info of the current user... function to be called after getCurrentUser() is successful
export async function getStudentSchoolInfo(id: string): Promise<User | null> {
	try {
		const currentUser = await prisma.User.findUnique({
			where: {
				id: id,
			},
			include: {
				studentClassLevel: true,
				studentEducationalBoard: true,
			},
		});

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (error) {
		return null;
	}
}

// fetching the Lesson Requests of the current user... function to be called after getCurrentUser() is successful
// corresponding teachers and the costs are also fetched
export async function getStudentLessonRequests(
	id: string,
	lessonType: keyof typeof LESSON_TYPE_QVALUE
): Promise<Prisma.UserGetPayload<{
	select: {
		name: true;
		email: true;
		studentLessonRequests: {
			include: {
				instructor: {
					select: {
						name: true;
						email: true;
					};
				};
				teacherClassLevelCost: {
					include: {
						classLevel: true;
					};
				};
			};
		};
	};
}> | null> {
	try {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set time to midnight

		const currentUser = await prisma.User.findUnique({
			where: {
				id: id,
			},
			select: {
				// selecting specific attributes from User table
				name: true,
				email: true,
				studentLessonRequests: {
					where: {
						requestedStart:
							lessonType === LESSON_TYPE_QVALUE.Completed
								? { lt: today }
								: { gte: today },
					},
					include: {
						instructor: {
							select: {
								// selecting specific attributes of instructor from User table
								name: true,
								email: true,
							},
						},
						teacherClassLevelCost: {
							include: {
								classLevel: true,
							},
						},
					},
					orderBy: [{ requestedStart: "asc" }],
				},
			},
		});

		if (!currentUser) {
			return null;
		}

		// convert costPerLesson (Decimal field) to Number
		return {
			...currentUser,
			studentLessonRequests: currentUser.studentLessonRequests.map((lReq: any) => ({
				...lReq,
				teacherClassLevelCost: lReq.teacherClassLevelCost
					? {
							...lReq.teacherClassLevelCost,
							costPerLesson:
								typeof lReq.teacherClassLevelCost.costPerLesson === "object" &&
								lReq.teacherClassLevelCost.costPerLesson.toNumber
									? lReq.teacherClassLevelCost.costPerLesson.toNumber()
									: lReq.teacherClassLevelCost.costPerLesson,
					  }
					: null,
			})),
		};
	} catch (error) {
		throw error;
	}
}

// fetching the recent upcoming or recent completed Lesson Requests of the current user
export async function getStudentLessonRequestRecent(
	id: string,
	lessonType: keyof typeof LESSON_TYPE_QVALUE
): Promise<Prisma.UserGetPayload<{
	select: {
		name: true;
		email: true;
		studentLessonRequests: {
			include: {
				instructor: {
					select: {
						name: true;
						email: true;
					};
				};
				teacherClassLevelCost: {
					include: {
						classLevel: true;
					};
				};
			};
		};
	};
}> | null> {
	try {
		const studentLessonRequests = await getStudentLessonRequests(id, lessonType);
		if (
			studentLessonRequests &&
			Array.isArray(studentLessonRequests.studentLessonRequests) &&
			studentLessonRequests.studentLessonRequests.length > 0
		) {
			// Return the user object with only the top-most (first) lesson request
			return {
				...studentLessonRequests,
				studentLessonRequests: [studentLessonRequests.studentLessonRequests[0]],
			};
		}
		return null;
	} catch (error) {
		throw error;
	}
}
