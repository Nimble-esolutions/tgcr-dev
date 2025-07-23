import prisma from "@/libs/prismadb";
import { Role, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getLesson } from "@/actions/lesson/getLessons";

export async function POST(request: NextRequest) {
	// post body
	// body: {
	//  email: 'bhallav25@student.com',
	//  lang: 'en',
	//  remarks: 'Test remarks',
	//  lessonId: '383bda55-1e49-4889-8b45-3888720ee3d7',
	//  feedback: [ [...userFeedback], [...userFeedback], ]
	//   }

	const body = await request.json();
	const email: string = body.email ?? "";
	const lang: string = body.lang ?? "en";
	const dict = await getDictionary(lang);
	const remarks: string = body.remarks ?? "";
	const lessonId: string = body.lessonId ?? "";
	const feedback: any[] = body.feedback ?? [];

	try {
		// standard validations - same as on the UI
		if (!email) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.errors.noEmail);
		}

		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, dict.errors.noUser);
		}
		if (!(currentUser.role === Role.Student)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.errors.noUser);
		}

		const currentLesson = await getLesson(lessonId);
		if (!currentLesson) {
			// lesson must exist in the Lesson table
			return apiResponse(
				APIStatus.BAD_REQUEST,
				dict.errors.invalidAPIParameter.replace("{param}", "lessonId")
			);
		}

		if (feedback.length === 0 && remarks.trim().length === 0) {
			// both feedback and remarks are empty... nothing to save
			return apiResponse(APIStatus.BAD_REQUEST, dict.feedback.noFeedback);
		}

		// executing all the queries in a transaction
		await prisma.$transaction(async (prisma: PrismaClient) => {
			if (currentLesson.feedback) {
				// feedback ideally should not exists...
				// ...but just in case if it does, delete it first
				await prisma.feedbackDetail.deleteMany({
					where: { feedbackId: currentLesson.feedback.id },
				});
				await prisma.feedback.deleteMany({
					where: { lessonId: currentLesson.id },
				});
			}

			// insert into Feedback -> insert into FeedbackDetails
			const feedbackRec = await prisma.feedback.create({
				data: {
					lessonId: currentLesson.id,
					remarks: remarks,
				},
			});

			// Insert FeedbackDetails for each feedback item
			for (const attr of feedback) {
				await prisma.feedbackDetail.create({
					data: {
						feedbackId: feedbackRec.id,
						feedbackAttributeId: Number(attr.id),
						feedbackAttributeKey: attr.key,
						feedbackAttributeValue: Number(attr.userFeedback),
					},
				});
			}

			return feedbackRec;
		});

		return apiResponse(APIStatus.OK, dict.feedback.success);
	} catch (error: any) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(String(error));
	}
}
