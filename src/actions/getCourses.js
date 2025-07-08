import prisma from "@/libs/prismadb";

export async function getCourses(params) {
	const { q, sort, page = 1, pageSize = 15 } = params;

	const getOrderByClause = () => {
		switch (sort) {
			case "desc":
				return { createdOn: "desc" };
			case "asc":
				return { createdOn: "asc" };
			case "price_low":
				return { regular_price: "asc" };
			case "price_high":
				return { regular_price: "desc" };
			default:
				return { createdOn: "desc" }; // Default sorting option
		}
	};

	const parsedPage = parseInt(page, 10);
	const parsedPageSize = parseInt(pageSize, 10);
	const skip = (parsedPage - 1) * parsedPageSize;

	try {
		let where = {};
		if (q) {
			where.OR = [
				{
					title: {
						contains: q,
					},
				},
				{
					overview: {
						contains: q,
					},
				},
			];
		}
		where.approved = true;

		const totalCourses = await prisma.course.count({
			where,
		});
		const totalPages = Math.ceil(totalCourses / parsedPageSize);

		const courses = await prisma.course.findMany({
			where,
			skip: skip,
			take: parsedPageSize,
			orderBy: getOrderByClause(),
			include: {
				user: true,
				// enrolments: {
				// 	select: {
				// 		id: true,
				// 	},
				// },
			},
		});

		// console.log(courses);

		return { courses, totalPages, totalCourses };
	} catch (error) {
		console.error("Error fetching counts:", error);
	}
}

export async function getHomepageCourses() {
	try {
		const home_courses = await prisma.course.findMany({
			where: { approved: true },
			take: 3,
			orderBy: {
				id: "asc",
			},
			include: {
				user: true,
				// enrolments: {
				// 	select: {
				// 		id: true,
				// 	},
				// },
			},
		});

		// console.log(courses);

		return { home_courses };
	} catch (error) {
		console.error("Error fetching counts:", error);
	}
}

export async function getBannerCourses() {
	try {
		const courses = await prisma.course.findMany({
			where: { approved: true, in_home_page: true },
			take: 2,
			orderBy: {
				id: "desc",
			},
			include: {
				user: true,
				// enrolments: {
				//   select: {
				//     id: true,
				//   },
				// },
			},
		});

		// console.log(courses);

		return { courses };
	} catch (error) {
		console.error("Error fetching counts:", error);
	}
}
