import prisma from "@/libs/prismadb";
import { getWeekNumber, getRRuleOccurances } from "@/utils/rruleUtils";

// redefining the interfaces for InstructorAvailability as the interface in the DB is not aligned with the application model
interface Event {
	id: string;
	action: string;
	exdate: string[];
	[key: string]: any;
}

interface AvailabilityCal {
	instructorAvailability: Event[];
	[key: string]: any;
}

// fetching availability calendar for the user
export async function getAvailability(id: string): Promise<AvailabilityCal | null> {
	try {
		const availabilityCal = await prisma.User.findUnique({
			where: {
				id: id,
			},
			include: {
				instructorAvailability: true,
			},
		});

		if (!availabilityCal) {
			return null;
		}

		// Add action column; split exdate; convert id to string as ID for INSERTED events is string, while its INT in the DB
		const processedAvailability = availabilityCal.instructorAvailability.map((event: any) => ({
			...event,
			id: event.id.toString(),
			action: "",
			exdate: event.exdate ? event.exdate.split(";") : [],
		}));

		return {
			...availabilityCal,
			instructorAvailability: processedAvailability,
		};
	} catch (error) {
		return null;
	}
}

// getting maximum availability calendar for the user
export async function getMaxAvailability(id: string): Promise<Number | null> {
	try {
		const maxEndWeek = await prisma.InstructorAvailability.aggregate({
			where: { userId: id },
			_max: { endWeek: true },
		});

		return maxEndWeek._max.endWeek;
	} catch (error) {
		return null;
	}
}
