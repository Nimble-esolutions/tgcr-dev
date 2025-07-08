import prisma from "@/libs/prismadb";
import { NextRequest } from "next/server";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role, LessonRequestStatus, PrismaClient } from "@prisma/client";
import { apiResponse, APIStatus } from "@/utils/apiResponse";

export async function POST(request: NextRequest) {
	// create a record in Lesson table
	// lessonCounter is incremented every time this API is called (reattempting to start a session)
	const body = await request.json();
	const { lang, uid, name, email, role, lessonId, timestamp } = body;
	const dict = await getDictionary(lang ?? "en");

	if (!uid || !name || !email || !role || !lessonId || !timestamp) {
		// one (or more) parameters is missing... find it and throw an error
		throw new Error(
			dict.liveLesson.sessionStartE1.replace(
				"{param}",
				Object.entries({ uid, name, email, role, lessonId, timestamp }).find(
					([_, v]) => !v
				)?.[0]
			)
		);
	}

	try {
		// check if the lessonId exists in Lesson table
		const existingLesson = await prisma.Lesson.findUnique({
			where: { lessonRequestId: lessonId },
		});

		if (!existingLesson) {
			// Lesson not found
			await prisma.$transaction(async (prisma: PrismaClient) => {
				// Start the LessonRequest
				await prisma.lessonRequest.update({
					where: { id: lessonId },
					data: { status: LessonRequestStatus.Started },
				});

				// create a record in Lesson table with timestamp
				await prisma.lesson.create({
					data: {
						lessonRequestId: lessonId,
						teacherStart: role === Role.Instructor ? new Date(timestamp) : null,
						studentStart: role === Role.Student ? new Date(timestamp) : null,
						lessonCounter: 1,
					},
				});
			});
		} else {
			// Lesson found... update the Lesson
			await prisma.Lesson.update({
				where: { lessonRequestId: lessonId },
				data: {
					teacherStart:
						role === Role.Instructor
							? existingLesson.teacherStart === null
								? new Date(timestamp)
								: existingLesson.teacherStart
							: existingLesson.teacherStart,
					studentStart:
						role === Role.Student
							? existingLesson.studentStart === null
								? new Date(timestamp)
								: existingLesson.studentStart
							: existingLesson.studentStart,
					lessonCounter: { increment: 1 },
				},
			});
		}
		return apiResponse(APIStatus.OK, dict.liveLesson.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(String(error));
	}
}
