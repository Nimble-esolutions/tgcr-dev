import prisma from "@/libs/prismadb";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { RecordType } from "@prisma/client";

export async function POST(request) {
	// post body
	// {
	//   email: 'bhallav25@teacher.com',
	//   calendar: [
	//     {
	//       id: '1743968777550-sc4wfv874',
	//       action: 'INSERT',
	//       title: 'Available',
	//       rrule: 'DTSTART:20250408T050000Z\n' +
	//         'RRULE:FREQ=WEEKLY;UNTIL=20250408T050000Z;INTERVAL=1;BYDAY=TU,TH',
	//       duration: '03:30',
	//       startWeek: 202515,
	//       endWeek: 202515,
	//       exdate: []
	//     }
	//   ],
	//   lang: 'en'
	// }

	const body = await request.json();
	const email = body.email ?? "";
	const calendar = body.calendar ?? [];
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
		}

		// executing all the queries in a transaction
		await prisma.$transaction(async (prisma) => {
			// DELETE the calendar events
			const calendarDelete = calendar
				.filter((item) => item.action === "DELETE")
				.map((calRow) => parseInt(calRow.id));
			if (calendarDelete.length > 0) {
				await prisma.InstructorAvailability.deleteMany({
					where: {
						userId: currentUser.id,
						id: {
							in: calendarDelete,
						},
					},
				});
			}

			// UPDATE the calendar events
			const calendarUpdate = calendar
				.filter((item) => item.action === "UPDATE")
				.map((calRow) => ({
					id: parseInt(calRow.id),
					title: RecordType.Availability, // calRow.title,
					rrule: calRow.rrule,
					duration: calRow.duration,
					startWeek: calRow.startWeek,
					endWeek: calRow.endWeek,
					exdate: calRow.exdate.join(";"),
				}));
			if (calendarUpdate.length > 0) {
				for (const calRow of calendarUpdate) {
					await prisma.InstructorAvailability.update({
						where: {
							userId: currentUser.id,
							id: calRow.id,
						},
						data: {
							title: calRow.title,
							rrule: calRow.rrule,
							duration: calRow.duration,
							startWeek: calRow.startWeek,
							endWeek: calRow.endWeek,
							exdate: calRow.exdate,
						},
					});
				}
			}

			// INSERT the calendar events
			const calendarInsert = calendar
				.filter((item) => item.action === "INSERT")
				.map((calRow) => ({
					userId: currentUser.id,
					title: RecordType.Availability, // calRow.title,
					rrule: calRow.rrule,
					duration: calRow.duration,
					startWeek: calRow.startWeek,
					endWeek: calRow.endWeek,
					exdate: calRow.exdate.join(";"),
				}));
			if (calendarInsert.length > 0) {
				await prisma.InstructorAvailability.createMany({ data: calendarInsert });
			}
		});

		return apiResponse(APIStatus.OK, dict.profilePersonal.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
