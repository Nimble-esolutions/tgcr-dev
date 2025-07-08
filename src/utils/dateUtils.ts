import { DateTime } from "luxon";

/*
 * Just a bunch of helper functions for date formatting while considering the timezones
 */

function toZonedDateTime(date: Date | string, timeZone: string | undefined): DateTime;
function toZonedDateTime(date: Date | string): DateTime;
function toZonedDateTime(date: Date | string, timeZone?: string): DateTime {
	// Helper to get a Luxon DateTime in the desired zone
	const dt =
		typeof date === "string"
			? DateTime.fromISO(date, { zone: "utc" })
			: DateTime.fromJSDate(date, { zone: "utc" });

	if (timeZone && timeZone !== "" && DateTime.local().setZone(timeZone).isValid) {
		return dt.setZone(timeZone);
	}
	return dt;
}

export function UIDayDate(date: Date | string, timeZone: string | undefined): string;
export function UIDayDate(date: Date | string): string;
export function UIDayDate(date: Date | string, timeZone?: string): string {
	// returns the specified date in {day dd-MMM} format
	const dt = toZonedDateTime(date, timeZone ? timeZone : undefined);
	const day = dt.toFormat("ccc"); // short day name
	const dd = dt.toFormat("dd");
	const month = dt.toFormat("LLL"); // abbreviated month
	return `${day} ${dd}-${month}`;
}

export function UIDate(date: Date | string, timeZone: string | undefined): string;
export function UIDate(date: Date | string): string;
export function UIDate(date: Date | string, timeZone?: string): string {
	// returns the specified date in {dd MMM yyyy}
	const dt = toZonedDateTime(date, timeZone ? timeZone : undefined);
	const year = dt.toFormat("yyyy");
	const month = dt.toFormat("LLL");
	const dd = dt.toFormat("dd");
	return `${dd} ${month} ${year}`;
}

export function UITime(date: Date | string, timeZone: string | undefined): string;
export function UITime(date: Date | string): string;
export function UITime(date: Date | string, timeZone?: string): string {
	// returns the specified time in {hh:mm AM/PM} in 12-hour format
	// Conversion to the timeZone is done when provided; otherwise no timezone conversion is done
	const dt = toZonedDateTime(date, timeZone ? timeZone : undefined);
	return dt.toFormat("hh:mm a");
}

export function UIDateTime(date: Date | string, timeZone: string | undefined): string;
export function UIDateTime(date: Date | string): string;
export function UIDateTime(date: Date | string, timeZone?: string): string {
	return (
		UIDate(date, timeZone ? timeZone : undefined) +
		" " +
		UITime(date, timeZone ? timeZone : undefined)
	);
}

export function UIDayDateTime(date: Date | string, timeZone: string | undefined): string;
export function UIDayDateTime(date: Date | string): string;
export function UIDayDateTime(date: Date | string, timeZone?: string): string {
	return (
		UIDayDate(date, timeZone ? timeZone : undefined) +
		" " +
		UITime(date, timeZone ? timeZone : undefined)
	);
}

export function GetDatepart(date: Date): Date {
	// returns date part of the supplied date
	var theDate: Date;
	if (typeof date === "string") {
		theDate = new Date(date);
	} else {
		theDate = date;
	}
	const year = theDate.getFullYear();
	const month = theDate.getMonth();
	const day = theDate.getDate();
	return new Date(year, month, day, 0, 0, 0, 0);
}

export function ParseTime(timeString: string): Date {
	// parses a time string in the format "hh:mm AM/PM" and returns a Date object
	const [time, modifier] = timeString.split(" ");
	let [hours, minutes] = time.split(":");
	let hh = parseInt(hours, 10);
	let mm = parseInt(minutes, 10);

	if (hh === 12) {
		hh = 0;
	}

	if (modifier === "PM") {
		hh = parseInt(hours, 10) + 12;
	}

	const date = new Date();
	date.setHours(hh);
	date.setMinutes(mm);
	date.setSeconds(0);
	date.setMilliseconds(0);

	return date;
}
