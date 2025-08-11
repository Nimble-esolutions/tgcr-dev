import { User, LessonRequestStatus, Prisma } from "@prisma/client";
import prisma from "@/libs/prismadb";
import { PROFILE_MAX_PRICE, SEARCH_PAGE_SIZE, LESSON_TYPE_QVALUE } from "@/libs/constants";

// Define types for function parameters and return values
type SortOrder = "priceLoHi" | "priceHiLo" | "ratingLoHi" | "ratingHiLo" | string;

interface GetTeachersResult {
	teachers: User[];
	totalPages: number;
	totalTeachers: number;
}

// Minimum criteria for all queries when fetching teachers
const defaultWhereClause = {
	isActive: true,
	emailConfirmed: true,
	isInstructor: true,
};

export async function getTeachers(
	// Fetching all the teachers matching the search criteria
	sk: string | null, // search keyword
	cl: number | null, // class level
	pr: number | null, // price
	eb: number | null, // educational board
	eq: number | null, // educational qualification
	el: number | null, // experience level
	im: string | null, // instruction medium
	so: SortOrder, // sort order
	pageNo: number = 1 // page number
): Promise<GetTeachersResult> {
	const getOrderByClause = (so: SortOrder) => {
		// Determine the order by clause
		switch (so) {
			case "priceLoHi":
				return [{ profile: { costAverage: "asc" } }, { name: "asc" }];
			case "priceHiLo":
				return [{ profile: { costAverage: "desc" } }, { name: "asc" }];
			case "ratingLoHi":
				return [{ profile: { averageRating: "asc" } }, { name: "asc" }];
			case "ratingHiLo":
				return [{ profile: { averageRating: "desc" } }, { name: "asc" }];
			default:
				return [{ name: "asc" }];
		}
	};

	const parsedPage = parseInt(pageNo.toString(), 10);
	const skip = (parsedPage - 1) * SEARCH_PAGE_SIZE;
	let whereClause: typeof defaultWhereClause & { AND?: any[] } = defaultWhereClause;
	// Filtering the partially completed Teacher's profile from Search Page...
	// Note the profile check - similar to one on teacher\dashboard\page.js is performed here as well
	// Although image is ignored, but the profile check from:
	// Personal Page --> Display Name and Contact Number is must
	// Location --> Timezone is must
	// Teaching Experience --> Subjects etc. are must
	// Pricing --> Is not checked at teacher search... but then on the booking page, navigation is disabled
	// Calendar --> Is not checked at teacher search... but then no slots are available while booking
	whereClause = {
		...whereClause,
		AND: [
			...(whereClause.AND || []),
			{
				firstName: { not: null },
				// image: { not: null },
				timezoneId: { not: null },
				profile: {
					subjects: { not: null },
				},
			},
		],
	};

	if (sk) {
		// apply search keyword
		whereClause = {
			...whereClause,
			AND: [
				...(whereClause.AND || []),
				{
					profile: {
						OR: [{ subjects: { contains: sk } }, { bio: { contains: sk } }],
					},
				},
			],
		};
	}

	if (cl) {
		// apply class level filter in conjunction with price filter
		whereClause = {
			...whereClause,
			AND: [
				...(whereClause.AND || []),
				{
					teacherClassLevelCosts: {
						some: {
							classLevelId: cl,
							costPerLesson: {
								lte: pr,
							},
						},
					},
				},
			],
		};
	} else if (pr !== PROFILE_MAX_PRICE) {
		// no class level filter is provided; apply price in this case only when its not the max price
		whereClause = {
			...whereClause,
			AND: [
				...(whereClause.AND || []),
				{
					teacherClassLevelCosts: {
						some: {
							costPerLesson: {
								lte: pr,
							},
						},
					},
				},
			],
		};
	}

	if (eb) {
		// apply educational board filter
		whereClause = {
			...whereClause,
			AND: [
				...(whereClause.AND || []),
				{
					teacherEducationalBoards: {
						some: {
							educationalBoardId: eb,
						},
					},
				},
			],
		};
	}

	if (eq) {
		// apply educational qualification filter
		whereClause = {
			...whereClause,
			AND: [
				...(whereClause.AND || []),
				{
					teacherEducationalQualifications: {
						some: {
							educationalQualificationId: eq,
						},
					},
				},
			],
		};
	}

	if (el) {
		// apply experience level filter
		whereClause = {
			...whereClause,
			AND: [
				...(whereClause.AND || []),
				{
					teacherExperienceLevels: {
						some: {
							experienceLevelId: el,
						},
					},
				},
			],
		};
	}

	if (im) {
		// apply instruction medium filter; both native and instruction language are searched for the selected language
		whereClause = {
			...whereClause,
			AND: [
				...(whereClause.AND || []),
				{
					profile: {
						OR: [
							{ instructionLanguages: { contains: im } },
							{ nativeLanguage: { contains: im } },
						],
					},
				},
			],
		};
	}

	try {
		const [totalTeachers, teachersRaw] = await prisma.$transaction([
			prisma.User.count({
				where: whereClause,
			}),
			prisma.User.findMany({
				where: whereClause,
				skip: skip,
				take: SEARCH_PAGE_SIZE,
				orderBy: getOrderByClause(so),
				include: {
					profile: true,
					teacherClassLevelCosts: true,
				},
			}),
		]);

		// Convert costPerLesson (Decimal field) to Number
		const teachers = teachersRaw.map((teacher: any) => ({
			...teacher,
			teacherClassLevelCosts: teacher.teacherClassLevelCosts.map((cost: any) => ({
				...cost,
				costPerLesson:
					typeof cost.costPerLesson === "object" && cost.costPerLesson.toNumber
						? cost.costPerLesson.toNumber()
						: cost.costPerLesson,
			})),
		}));

		const totalPages = Math.ceil(totalTeachers / SEARCH_PAGE_SIZE);
		return { teachers, totalPages, totalTeachers };
	} catch (error) {
		throw error;
	}
}

export async function getTeacherById(id: string): Promise<User | null> {
	// Fetching a single teacher by id
	let whereClause = {
		...defaultWhereClause,
		id: id, // Add the id filter
	};

	try {
		const teacher = await prisma.User.findUnique({
			where: whereClause,
			include: {
				profile: true,
				teacherEducationalQualifications: {
					include: {
						educationalQualification: true,
					},
				},
				teacherEducationalBoards: {
					include: {
						educationalBoard: true,
					},
				},
				teacherExperienceLevels: {
					include: {
						experienceLevel: true,
					},
				},
				teacherClassLevelCosts: {
					include: {
						classLevel: true,
					},
				},
				instructorLessonRequests: {
					include: {
						lesson: {
							include: {
								feedback: {
									include: {
										feedbackDetails: {
											include: {
												feedbackAttribute: true,
											},
										},
									},
								},
							},
						},
					},
					orderBy: {
						updatedOn: "desc",
					},
				},
			},
		});

		if (!teacher) {
			return null;
		}

		// convert costPerLesson (Decimal field) to Number
		return {
			...teacher,
			teacherClassLevelCosts: teacher.teacherClassLevelCosts.map((cost: any) => ({
				...cost,
				costPerLesson:
					typeof cost.costPerLesson === "object" && cost.costPerLesson.toNumber
						? cost.costPerLesson.toNumber()
						: cost.costPerLesson,
			})),
		};
	} catch (error) {
		// console.error("Error fetching teacher by ID:", error);
		//return null;
		throw error; // Rethrow the error to be handled by the caller
	}
}

export async function getTeacherPricing(id: string): Promise<User | null> {
	// fetching the Pricing of the current user... function to be called after getCurrentUser() is successful
	let whereClause = {
		...defaultWhereClause,
		id: id, // Add the id filter
	};

	try {
		const teacher = await prisma.User.findUnique({
			where: whereClause,
			include: {
				teacherClassLevelCosts: true,
			},
		});

		if (!teacher) {
			return null;
		}

		// convert costPerLesson (Decimal field) to Number
		return {
			...teacher,
			teacherClassLevelCosts: teacher.teacherClassLevelCosts.map((cost: any) => ({
				...cost,
				costPerLesson:
					typeof cost.costPerLesson === "object" && cost.costPerLesson.toNumber
						? cost.costPerLesson.toNumber()
						: cost.costPerLesson,
			})),
		};
	} catch (error) {
		// console.error("Error fetching teacher pricing:", error);
		return null;
	}
}

export async function getTeacherExperience(id: string): Promise<User | null> {
	// fetching the Teaching Experience of the current user... function to be called after getCurrentUser() is successful
	let whereClause = {
		...defaultWhereClause,
		id: id, // Add the id filter
	};

	try {
		const currentUser = await prisma.User.findUnique({
			where: whereClause,
			include: {
				teacherEducationalQualifications: true,
				teacherExperienceLevels: true,
				teacherEducationalBoards: true,
			},
		});

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (error) {
		// console.error("Error fetching teacher experience:", error);
		return null;
	}
}

export async function getTeacherFeedback(id: string): Promise<Prisma.LessonRequestGetPayload<{
	include: {
		lesson: {
			include: {
				feedback: {
					include: {
						feedbackDetails: {
							include: {
								feedbackAttribute: true;
							};
						};
					};
				};
			};
		};
		student: {
			select: {
				name: true;
				email: true;
			};
		};
	};
}> | null> {
	// Fetching the feedback of a teacher by id
	// return type is matching the return from the query to ensure type safety
	let whereClause = {
		...defaultWhereClause,
		id: id, // Add the id filter
	};

	try {
		const teacher = await prisma.User.findUnique({
			where: whereClause,
		});

		if (!teacher) {
			// nothing to return if this teacher does not exist or fails the where clause
			return null;
		}

		// Fetch the teacher with feedback details
		// To get the feedback, we need to start from LessonRequest -> Lesson -> Feedback -> FeedbackDetails -> FeedbackAttribute
		const feedbacks = await prisma.LessonRequest.findMany({
			where: {
				instructorId: id,
				status: LessonRequestStatus.Completed, // Only fetch completed lesson requests
			},
			include: {
				lesson: {
					include: {
						feedback: {
							include: {
								feedbackDetails: {
									include: {
										feedbackAttribute: true,
									},
								},
							},
						},
					},
				},
				student: {
					select: {
						name: true,
						email: true,
					},
				},
			},
			orderBy: {
				lesson: {
					updatedOn: "desc", // or "asc"
				},
			},
		});

		if (!feedbacks) {
			return null;
		}

		return feedbacks;
	} catch (error) {
		throw error; // Rethrow the error to be handled by the caller
	}
}

export async function getTeacherLessonRequests(
	id: string,
	lessonType: keyof typeof LESSON_TYPE_QVALUE
): Promise<Prisma.UserGetPayload<{
	select: {
		name: true;
		email: true;
		instructorLessonRequests: {
			include: {
				student: {
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
	// fetching the Lesson Requests of the current user... function to be called after getCurrentUser() is successful
	// corresponding costs are also fetched
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
				instructorLessonRequests: {
					where: {
						requestedStart:
							lessonType === LESSON_TYPE_QVALUE.Completed
								? { lt: today }
								: { gte: today },
					},
					include: {
						student: {
							select: {
								// selecting specific attributes of student from User table
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
			instructorLessonRequests: currentUser.instructorLessonRequests.map((lReq: any) => ({
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
export async function getTeacherLessonRequestRecent(
	id: string,
	lessonType: keyof typeof LESSON_TYPE_QVALUE
): Promise<Prisma.UserGetPayload<{
	select: {
		name: true;
		email: true;
		instructorLessonRequests: {
			include: {
				student: {
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
		const teacherLessonRequests = await getTeacherLessonRequests(id, lessonType);
		if (
			teacherLessonRequests &&
			Array.isArray(teacherLessonRequests.instructorLessonRequests) &&
			teacherLessonRequests.instructorLessonRequests.length > 0
		) {
			// Return the user object with only the top-most (first) lesson request
			return {
				...teacherLessonRequests,
				instructorLessonRequests: [teacherLessonRequests.instructorLessonRequests[0]],
			};
		}
		return null;
	} catch (error) {
		throw error;
	}
}
