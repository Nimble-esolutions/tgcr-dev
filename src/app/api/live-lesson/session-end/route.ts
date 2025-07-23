import prisma from "@/libs/prismadb";
import { Role, LessonRequestStatus, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";

export async function POST(request: NextRequest) {
	// update Lesson table with end times... and LessonRequest table LessonRequestStatus.Completed
	const body = await request.json();
	const { lang, uid, name, email, role, lessonId, timestamp } = body;
	const dict = await getDictionary(lang ?? "en");

	if (!uid || !name || !email || !role || !lessonId || !timestamp) {
		// one (or more) parameters is missing... find it and throw an error
		throw new Error(
			dict.liveLesson.sessionEndE1.replace(
				"{param}",
				Object.entries({ uid, name, email, role, lessonId, timestamp }).find(
					([_, v]) => !v
				)?.[0]
			)
		);
	}

	try {
		// find the lessonId from Lesson table
		const existingLesson = await prisma.Lesson.findUnique({
			where: { lessonRequestId: lessonId },
		});

		if (!existingLesson) {
			// Lesson not found... throw an error
			throw new Error(dict.liveLesson.sessionEndE1.replace("{param}", "lessonId"));
		} else {
			// Lesson found
			await prisma.$transaction(async (prisma: PrismaClient) => {
				// update the record with end times
				const updatedLesson = await prisma.lesson.update({
					where: { lessonRequestId: lessonId },
					data: {
						teacherEnd:
							role === Role.Instructor
								? new Date(timestamp)
								: existingLesson.teacherEnd,
						studentEnd:
							role === Role.Student ? new Date(timestamp) : existingLesson.studentEnd,
					},
				});

				if (
					updatedLesson.teacherStart &&
					updatedLesson.teacherEnd &&
					updatedLesson.studentStart &&
					updatedLesson.studentEnd
				) {
					// Complete the LessonRequest only if both Start/End for the teacher as well as the student exists
					await prisma.lessonRequest.update({
						where: { id: lessonId },
						data: { status: LessonRequestStatus.Completed },
					});
				}
			});
		}
		return apiResponse(APIStatus.OK, dict.liveLesson.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(String(error));
	}
}
