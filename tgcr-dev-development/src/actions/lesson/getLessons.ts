import { Prisma } from "@prisma/client";
import prisma from "@/libs/prismadb";

export async function getLesson(
	lessonId: string
): Promise<Prisma.LessonGetPayload<{ include: { feedback: true } }> | null> {
	// fetching the Lesson and corresponding Feedback for the given lessonId
	try {
		const existingLesson = await prisma.Lesson.findUnique({
			where: { lessonRequestId: lessonId },
			include: {
				feedback: true,
			},
		});

		if (!existingLesson) {
			return null;
		}

		return existingLesson;
	} catch (error) {
		return null;
	}
}

export async function getFeedback(
	lessonId: string
): Promise<Prisma.FeedbackGetPayload<{ include: { feedbackDetails: true } }> | null> {
	// fetching the feedback for the given lesson id
	try {
		const feedback = await prisma.Feedback.findUnique({
			where: { lessonId: lessonId },
			include: {
				feedbackDetails: true,
			},
		});

		if (!feedback) {
			return null;
		}

		return feedback;
	} catch (error) {
		return null;
	}
}
