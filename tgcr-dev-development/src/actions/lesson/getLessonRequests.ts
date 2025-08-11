import { LessonRequest } from "@prisma/client";
import prisma from "@/libs/prismadb";

// fetching the attributes of LessonRequest for the given id
// basic atttributes of student, teacher and class are included
export async function getLessonRequestAttributes(id: string): Promise<LessonRequest | null> {
	try {
		const lessonRequest = await prisma.LessonRequest.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				requestedStart: true,
				requestedEnd: true,
				remarks: true,
				student: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				instructor: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				teacherClassLevelCost: {
					select: {
						classLevel: {
							select: { name: true },
						},
					},
				},
			},
		});

		if (!lessonRequest) {
			return null;
		}

		return lessonRequest;
	} catch (error) {
		return null;
	}
}
