import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getWeekNumber, getRRuleOccurances } from "@/utils/rruleUtils";

// fetching available timeslots for a user for the week containing the specified startDate
// array of dates with timeslots is returned
// GET format: /api/teacher/weeklyts?lang=en&id=teacherId&sd=startDateISO&ts=timestamp
export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id") as string;
	const startDate = new Date(searchParams.get("sd") as string);
	const timestamp = new Date(searchParams.get("ts") as string);
	const lang = (searchParams.get("lang") as string) || "en";
	const dict = await getDictionary(lang);

	try {
		const weekNumber = getWeekNumber(startDate);

		if (!id || !startDate || !weekNumber || !timestamp) {
			// these parameters are must be present in the request
			return apiResponse(
				APIStatus.BAD_REQUEST,
				dict.errors.invalidAPIParameter.replace(
					"{param}",
					Object.entries({ id, startDate, weekNumber, timestamp }).find(
						([_, v]) => !v
					)?.[0]
				)
			);
		}

		// fetch the InstructorAvailability for the user for the week containing the startDate
		const availabilityCal = await prisma.InstructorAvailability.findMany({
			where: {
				userId: id,
				startWeek: {
					lte: weekNumber,
				},
				endWeek: {
					gte: weekNumber,
				},
			},
		});

		// flatten the InstructorAvailability to get the timeslots for the week
		// note that the output of this function are timeslots as they are visible on the availablity calendar for that week
		let rawTimeslots: { startTime: Date; endTime: Date }[] = [];
		availabilityCal.forEach(
			(record: { rrule: any; exdate: any; duration: any; startWeek: any }) => {
				const occurance = getRRuleOccurances(
					record.rrule,
					record.exdate,
					record.duration,
					weekNumber
				);
				// // do not show the occurances if they are before the timestamp
				// rawTimeslots = rawTimeslots.concat(
				// 	occurance.filter((slot: { startTime: Date }) => {
				// 		const slotDate = new Date(slot.startTime);
				// 		return slotDate > timestamp;
				// 	})
				// );
				rawTimeslots = rawTimeslots.concat(occurance);
			}
		);

		// iterate over each of the rawTimeslots and get hourly timeslots spaced over 30 minutes
		let returnTimeslots: { startTime: Date; endTime: Date }[] = [];
		rawTimeslots.forEach(({ startTime, endTime }) => {
			let currentStartTime = new Date(startTime);
			const end = new Date(endTime);

			while (currentStartTime < end) {
				const currentEndTime = new Date(currentStartTime);
				currentEndTime.setHours(currentEndTime.getHours() + 1);

				if (currentEndTime > end) {
					break;
				}

				returnTimeslots.push({
					startTime: new Date(currentStartTime),
					endTime: new Date(currentEndTime),
				});

				currentStartTime.setMinutes(currentStartTime.getMinutes() + 30);
			}
		});

		// Sort the returnTimeslots by startTime before sending it back to the UI
		returnTimeslots.sort(
			(a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
		);

		return NextResponse.json<{ startTime: Date; endTime: Date }[]>(returnTimeslots, {
			status: 200,
		});
	} catch (error: any) {
		return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error.message);
	}
}
