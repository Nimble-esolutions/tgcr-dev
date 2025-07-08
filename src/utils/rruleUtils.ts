import { RRule, RRuleSet, Frequency, ByWeekday, rrulestr } from "rrule";
import { DateInput } from "@fullcalendar/core";

interface RRuleOptions {
	frequency: Frequency;
	startDate: Date;
	endDate: Date;
	interval: number;
	dayOfWeek: ByWeekday | ByWeekday[];
}

// generates the RRule string from the given options
const generateRRuleString = ({
	frequency,
	startDate,
	endDate,
	interval,
	dayOfWeek,
}: RRuleOptions): string => {
	const rrule = new RRule({
		freq: frequency,
		dtstart: startDate,
		until: endDate,
		interval: interval,
		byweekday: dayOfWeek,
	});

	return rrule.toString();
};

// Calculate the day of the week for a given date
const getDayOfWeek = (date: Date): ByWeekday => {
	// Array of weekday names
	const daysOfWeek = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];
	return daysOfWeek[date.getDay()];
};

// calculates the duration from the given start and end date in string (HH:MM) as well as date format
const getDuration = (
	startDate: Date,
	endDate: Date
): {
	duration: Date;
	hhmm: string;
} => {
	// Calculate the difference in milliseconds
	const durationMs = endDate.getTime() - startDate.getTime();

	// Convert the duration to hours and minutes
	const hours = Math.floor(durationMs / (1000 * 60 * 60));
	const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

	// Format the result as hh:mm
	const formattedHours = String(hours).padStart(2, "0");
	const formattedMinutes = String(minutes).padStart(2, "0");

	return {
		duration: new Date(0, 0, 0, hours, minutes),
		hhmm: `${formattedHours}:${formattedMinutes}`,
	};
};

// finds the week number of the year for a given date
const getWeekNumber = (date: Date) => {
	// the function assumes that the week starts on Monday and ends on Sunday
	const tempDate = new Date(date.getTime());

	// Adjust the date to the nearest Monday
	const day = tempDate.getDay();
	const diff = (day === 0 ? -6 : 1) - day; // If Sunday, set to Monday
	tempDate.setDate(tempDate.getDate() + diff);

	// Calculate the first Monday of the year
	const firstDayOfYear = new Date(tempDate.getFullYear(), 0, 1);
	const firstMonday = new Date(firstDayOfYear.getTime());
	const firstMondayDay = firstMonday.getDay();
	const firstMondayDiff = (firstMondayDay === 0 ? -6 : 1) - firstMondayDay;
	firstMonday.setDate(firstMonday.getDate() + firstMondayDiff);

	// Calculate the number of days between the first Monday and the given date
	const pastDaysOfYear = (tempDate.getTime() - firstMonday.getTime()) / 86400000;
	const weekNumber = Math.ceil((pastDaysOfYear + 1) / 7);

	const year = tempDate.getFullYear();
	const paddedWeekNumber = weekNumber.toString().padStart(2, "0");

	return parseInt(`${year}${paddedWeekNumber}`, 10);
};

// reverse calculation of getWeekNumber
const getDateFromWeekNumber = (yyyyww: string | number): Date => {
	const str = yyyyww.toString();
	const year = parseInt(str.slice(0, 4), 10);
	const week = parseInt(str.slice(4), 10);

	// Calculate the first Monday of the year (same as getWeekNumber)
	const firstDayOfYear = new Date(year, 0, 1);
	const firstMonday = new Date(firstDayOfYear.getTime());
	const firstMondayDay = firstMonday.getDay();
	const firstMondayDiff = (firstMondayDay === 0 ? -6 : 1) - firstMondayDay;
	firstMonday.setDate(firstMonday.getDate() + firstMondayDiff);

	// Calculate the Monday of the target week
	const monday = new Date(firstMonday.getTime());
	monday.setDate(firstMonday.getDate() + (week - 1) * 7);
	monday.setHours(0, 0, 0, 0);

	return monday;
};

// number of days between two dates
const getDayDiff = (startDate: Date, endDate: Date): number => {
	const diffMs = endDate.getTime() - startDate.getTime();
	return Math.round(diffMs / (1000 * 60 * 60 * 24));
};

// get occurrences, startDate and endDate for a given rrule string
const getRRuleAttributes = (rruleString: string, exDates: DateInput[]) => {
	const rruleSet = rrulestr(rruleString);
	let occurrences = rruleSet.all();

	// Convert exDates to Date objects
	const exDatesSet = new Set(exDates.map((dateInput) => new Date(dateInput as string).getTime()));

	// Filter out occurrences that match any exdate
	occurrences = occurrences.filter((date) => !exDatesSet.has(date.getTime()));

	const count = occurrences.length;
	const startDate = rruleSet.options.dtstart;
	const endDate = rruleSet.options.until || occurrences[occurrences.length - 1];

	return {
		count,
		startDate,
		endDate,
	};
};

// get all occurrences for the specified rruleString, exDate and duration (these values are available in the InstructorAvailability table)
// filterWeek is used to filter the occurrences to the specified week only
const getRRuleOccurances = (
	rruleString: string,
	exdate: string,
	duration: string,
	filterWeek: number
) => {
	const rruleSet = rrulestr(rruleString);
	let occurrences = rruleSet.all();

	// Convert exDate to Date objects
	const exDates: DateInput[] = exdate.split(";").map((date) => new Date(date));
	const exDatesSet = new Set(exDates.map((dateInput) => new Date(dateInput as string).getTime()));

	// Filter out occurrences that match any exdate
	occurrences = occurrences.filter((date) => !exDatesSet.has(date.getTime()));
	// Leave the dates which are in the current week
	occurrences = occurrences.filter((date) => getWeekNumber(date) === filterWeek);

	// Parse the duration string into hours and minutes
	const [hours, minutes] = duration.split(":").map(Number);

	// Add startTime and endTime to each occurrence
	const occurrencesWithTimes = occurrences.map((startTime) => {
		const endTime = new Date(startTime.getTime());
		endTime.setHours(endTime.getHours() + hours);
		endTime.setMinutes(endTime.getMinutes() + minutes);
		return { startTime, endTime };
	});

	return occurrencesWithTimes;
};

export {
	generateRRuleString,
	getDayOfWeek,
	getDuration,
	getWeekNumber,
	getDateFromWeekNumber,
	getDayDiff,
	getRRuleAttributes,
	getRRuleOccurances,
};
