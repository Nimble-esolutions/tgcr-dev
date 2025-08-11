import React from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg, EventInput, DateInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import rrulePlugin from "@fullcalendar/rrule";
import { RRule, Frequency } from "rrule";
import { RecordType } from "@prisma/client";
import { GetDatepart, UIDateTime, UITime } from "@/utils/dateUtils";
import {
	generateRRuleString,
	getDuration,
	getWeekNumber,
	getRRuleAttributes,
} from "@/utils/rruleUtils";
import { generateUId } from "@/utils/utils";
import styles from "./css/AvailabilityCalendar.module.css";
import { set } from "react-hook-form";

/*
	Availability Calendar for a teacher
	Uses @fullcalendar (https://fullcalendar.io/) under MIT license
	Timezones are handled via moment-timezone plugin
	Overall the calendar is in one timezone... timeZone={teacher.timezone.tzIdentifier}... 
	...as a result, adjustments will be necessary to handle timezone changes 
*/

interface Dictionary {
	[key: string]: string;
}
interface AvailabilityCalendarProps {
	lang: string;
	teacher: any;
	id: string;
	value: EventInput[];
	handleFieldChange: (value: any) => void;
	// showBookings: boolean;
	availabilityCalendarDict: Dictionary;
	// other properties of useForm are not used
}

function AvailabilityCalendar({
	lang,
	teacher,
	id,
	value,
	handleFieldChange,
	// showBookings,
	availabilityCalendarDict,
}: AvailabilityCalendarProps) {
	const [displayedCalendarEvents, setDisplayedCalendarEvents] =
		React.useState<EventInput[]>(value);
	// displayedCalendarEvents
	// {
	// 	id: "1743625753915-mrl77s0am",
	// 	action: "NEW",
	// 	title: "Available",																							// fixed attribute read by <FullCalendar>
	// 	rrule: "DTSTART:20250407T060000Z\nRRULE:FREQ=WEEKLY;UNTIL=20250420T205959Z;INTERVAL=1;BYDAY=MO,WE,FR",		// fixed attribute read by <FullCalendar>
	// 	duration: "03:00",	// 	// duration: "03:00:00",	// fixed attribute read by the calendar					// fixed attribute read by <FullCalendar>
	// 	// exdate: [],																								// fixed attribute read by <FullCalendar>
	// 	// exdate: ["2025-04-09T06:00:00Z"],																		// note that exdate in DB is a CSV string
	// 	exdate: ["2025-04-09T06:00:00Z", "2025-04-11T06:00:00Z"],													// note the "Z" in the date string
	// 	startWeek: 202515,
	// 	endWeek: 202516,
	// },
	const [deletedCalendarEvents, setDeletedCalendarEvents] = React.useState<EventInput[]>([]); // events which are deleted from the UI... these should be passed onto the calling function for handling
	const [addDialog, setAddDialog] = React.useState<AddDialogProps>({
		visible: false,
		eventAdd: null,
		availabilityCalendarDict: availabilityCalendarDict,
		displayedCalendarEvents: displayedCalendarEvents,
		setDisplayedCalendarEvents: setDisplayedCalendarEvents,
		teacher: teacher,
		setAddDialogVisibility: setAddDialogVisibility,
	});
	const [deleteDialog, setDeleteDialog] = React.useState<DeleteDialogProps>({
		visible: false,
		eventDelete: null,
		availabilityCalendarDict: availabilityCalendarDict,
		displayedCalendarEvents: displayedCalendarEvents,
		setDisplayedCalendarEvents: setDisplayedCalendarEvents,
		deletedCalendarEvents: deletedCalendarEvents,
		setDeletedCalendarEvents: setDeletedCalendarEvents,
		teacher: teacher,
		setDeleteDialogVisibility: setDeleteDialogVisibility,
	});

	React.useEffect(() => {
		// load data and put it in useState
		var events: EventInput[] = value;

		// if (!showBookings) {
		// 	// remove bookings, and leave only the availabilities
		// 	events = events.filter(
		// 		(event) => event.title === AVAILABILITY
		// 	);
		// }

		setDisplayedCalendarEvents(events);
	}, [value]);

	function setAddDialogVisibility(visibility: boolean, eventData: null | DateSelectArg) {
		// resets the visibility of AddDialog and passes the eventData
		setAddDialog((prev) => ({
			...prev,
			visible: visibility,
			eventAdd: eventData,
		}));
	}

	function setDeleteDialogVisibility(visibility: boolean, eventData: null | EventClickArg) {
		// resets the visibility of DeleteDialog and passes the eventData
		setDeleteDialog((prev) => ({
			...prev,
			visible: visibility,
			eventDelete: eventData,
		}));
	}

	function handleSelectAllow(selectInfo: any) {
		// Check if the selection spans more than one day; and does not allow it
		const start = selectInfo.start;
		const end = selectInfo.end;
		return start.getDate() === end.getDate();
	}

	function getEventClassNames(eventInfo: any) {
		// finding the css class name between the deletable and non-deletable events
		if (eventInfo?.event?.title === RecordType.Availability) {
			// render availability
			if (
				canDeleteAvailability(
					eventInfo?.event?.title,
					eventInfo?.event?.start ?? new Date(),
					eventInfo?.event?.end ?? new Date(),
					displayedCalendarEvents
				)
			) {
				return styles["availability-deletable"];
			} else {
				return styles["availability-non-deletable"];
			}
		} else {
			// render booking
			return styles["booking"];
		}
	}

	function handleEventRender(eventInfo: any) {
		// rendering an event... this only renders the text, while getEventClassNames() renders the background color for the event (via styles[])
		// deletable events are rendered with a delete icon
		// the deletion of event is handled via the DeleteDialog/handleEventDelete and not via the <span onclick>
		return (
			<>
				{/* <>{eventInfo.timeText}</> */}
				{/* <i> {eventInfo.event.title}</i> */}
				{canDeleteAvailability(
					eventInfo.event.title,
					eventInfo.event.start,
					eventInfo.event.end,
					displayedCalendarEvents
				) && (
					<span
						className={styles["availability-delete-icon"]}
						title={availabilityCalendarDict.delete}
					>
						🗑️
					</span>
				)}
				<span className={styles["availability-text"]}>
					{`${UITime(eventInfo.event.start, teacher.timezone.tzIdentifier)} ~ ${UITime(
						eventInfo.event.end,
						teacher.timezone.tzIdentifier
					)}`}
				</span>
			</>
		);
	}

	React.useEffect(() => {
		// commit the data back to the calling page whenever the calendar event changes
		// make sure to combine the deleted events with the displayed events before sending it back to the calling page
		if (handleFieldChange) {
			const allEvents = [...displayedCalendarEvents, ...deletedCalendarEvents];
			handleFieldChange(allEvents);
		}
	}, [displayedCalendarEvents, deletedCalendarEvents, handleFieldChange]);

	return (
		<React.Fragment>
			<FullCalendar
				key={id}
				plugins={[
					dayGridPlugin,
					timeGridPlugin,
					interactionPlugin,
					momentPlugin,
					momentTimezonePlugin,
					rrulePlugin,
				]}
				headerToolbar={{
					left: "title",
					center: "",
					right: "prev,today,next",
				}}
				timeZone={teacher.timezone.tzIdentifier}
				initialView="timeGridWeek" // initial and the only possible view
				titleFormat="DD MMM YYYY" // top header date format
				dayHeaderFormat="ddd DD-MMM" // date format (in the weekday column)
				nowIndicator={true} // show the current time indicator
				weekNumbers={true} // show the week number in top left corner
				firstDay={1} // Monday is the first DOW // PHASE-X variable to be stored for a teacher
				allDaySlot={false} // do not show the all day slot - not allowed
				slotDuration="00:30:00" // minimum slot duration
				// slotMinTime="08:00:00" // PHASE-X variable to be stored for a teacher
				// slotMaxTime="18:00:00" // PHASE-X variable to be stored for a teacher
				editable={false} // events are non-editable - cannot be dragged/dropped/resized
				selectable={true} // events are selectable
				selectAllow={handleSelectAllow} // handles when events are being selected - specifically multi-day events are not allowed
				selectMirror={true} // shows a "placeholder" event when the user is dragging to select a time range.
				selectOverlap={false} // not allowed to select periods of time that overlap with existing events
				weekends={true} // show weekends; // PHASE-X variable to be stored for a teacher
				dayMaxEvents={true} // shows all the events
				height="441px" // max-height; width is auto adjusted
				select={(eventAdd: DateSelectArg) => {
					// show the AddDialog when a timeslot is selected
					setAddDialogVisibility(true, eventAdd);
				}}
				eventClick={(eventDelete: EventClickArg) => {
					// show the DeleteDialog when an event is selected; the function handles the deletion of past events.
					setDeleteDialogVisibility(true, eventDelete);
				}}
				eventContent={handleEventRender} // custom function to render events
				eventClassNames={getEventClassNames} // custom function to find the name of css classes (deletable vs. non-deletable)
				eventOverlap={false} // prevents overlapping of events
				events={displayedCalendarEvents} // initial set of events
			/>
			<AddDialog
				visible={addDialog.visible}
				eventAdd={addDialog.eventAdd}
				availabilityCalendarDict={availabilityCalendarDict}
				displayedCalendarEvents={displayedCalendarEvents}
				setDisplayedCalendarEvents={setDisplayedCalendarEvents}
				teacher={teacher}
				setAddDialogVisibility={setAddDialogVisibility}
			/>
			<DeleteDialog
				visible={deleteDialog.visible}
				eventDelete={deleteDialog.eventDelete}
				availabilityCalendarDict={availabilityCalendarDict}
				displayedCalendarEvents={displayedCalendarEvents}
				setDisplayedCalendarEvents={setDisplayedCalendarEvents}
				deletedCalendarEvents={deletedCalendarEvents}
				setDeletedCalendarEvents={setDeletedCalendarEvents}
				teacher={teacher}
				setDeleteDialogVisibility={setDeleteDialogVisibility}
			/>
		</React.Fragment>
	);
}

function canDeleteAvailability(
	title: string,
	start: Date,
	end: Date,
	displayedCalendarEvents: EventInput[]
): boolean {
	// checks if the availability can be deleted... the date is validated for "Booking" as well as future date
	// allows deletion of events after tomorrow // DISCUSS
	if (title === RecordType.Booking) {
		// cannot delete booking... only availabilities are deletable
		return false;
	}

	var bookings = displayedCalendarEvents.filter(
		(event) =>
			event.title === RecordType.Booking &&
			(event?.start ?? new Date()) >= start &&
			(event?.end ?? new Date()) <= end
	);
	var now = GetDatepart(new Date());
	var tomorrow = new Date(now);
	tomorrow.setDate(now.getDate() + 1);
	tomorrow.setHours(23, 59, 59, 999);

	if (bookings.length > 0) {
		// cannot delete if there are bookings within this availability window
		return false;
	}

	if (start && start <= tomorrow) {
		// cannot delete next day availability
		return false;
	}

	return true;
} // end of canDeleteAvailability///////////////////////////////////////////////////////////////////////////////////////////////////////

interface AddDialogProps {
	visible: boolean;
	eventAdd: null | DateSelectArg;
	availabilityCalendarDict: Dictionary;
	displayedCalendarEvents: any[];
	setDisplayedCalendarEvents: any;
	teacher: any;
	setAddDialogVisibility: (visibility: boolean, eventData: null | DateSelectArg) => void;
}
function AddDialog({
	visible,
	eventAdd,
	availabilityCalendarDict,
	displayedCalendarEvents,
	setDisplayedCalendarEvents,
	teacher,
	setAddDialogVisibility,
}: AddDialogProps) {
	// constructing the add event dialog. Initial values are taken from user interaction when the user selects a time slot
	// the dialog box asks for recurrance days and end date of the event
	// the end date reverts back to start date of the event if the user selects a date beyond 1 year from the start date
	const daysOfWeek = [
		availabilityCalendarDict.monday,
		availabilityCalendarDict.tuesday,
		availabilityCalendarDict.wednesday,
		availabilityCalendarDict.thursday,
		availabilityCalendarDict.friday,
		availabilityCalendarDict.saturday,
		availabilityCalendarDict.sunday,
	];
	const rruleWeekdays = {
		[availabilityCalendarDict.monday]: RRule.MO,
		[availabilityCalendarDict.tuesday]: RRule.TU,
		[availabilityCalendarDict.wednesday]: RRule.WE,
		[availabilityCalendarDict.thursday]: RRule.TH,
		[availabilityCalendarDict.friday]: RRule.FR,
		[availabilityCalendarDict.saturday]: RRule.SA,
		[availabilityCalendarDict.sunday]: RRule.SU,
	};

	const dow = eventAdd?.start.getDay() ?? 0; // returns 0 for Sunday and 6 for Saturday... we are mapping 0 to Monday and 6 to Sunday
	const dow1 = dow === 0 ? 6 : dow - 1; // convert to 0 for Monday and 6 for Sunday
	const startDay = daysOfWeek[dow1];

	const [selectedDays, setSelectedDays] = React.useState<string[]>([startDay]);
	const [endDate, setEndDate] = React.useState<Date>(new Date(eventAdd?.end ?? new Date())); // default to end date of the event
	const [error, setError] = React.useState<string | null>(null);

	if (!visible) return null;
	if (!eventAdd) return null;

	const convertToRRuleWeekdays = (selectedDays: string[]) => {
		// mapping between daysOfWeek and rruleWeekdays
		return selectedDays.map((day) => rruleWeekdays[day]);
	};

	const handleDayToggle = (day: string) => {
		// handles the checkboxes toggle
		// note that SU: 0, MO:1, TU:2, etc. as per RRule
		// in my case, SU is displayed in the end and needs to be handled properly
		if (day === startDay) return; // Prevent unchecking the start day

		setSelectedDays((prevDays) =>
			prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
		);
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// handles the end date change
		const newEndDate = new Date(e.target.value);
		newEndDate.setHours(23, 59, 59, 59);

		const maxEndDate = new Date(eventAdd.start);
		maxEndDate.setHours(23, 59, 59, 59);
		maxEndDate.setFullYear(maxEndDate.getFullYear() + 1);

		if (newEndDate > maxEndDate) {
			setError(availabilityCalendarDict.endDateE1);
			newEndDate.setDate(eventAdd.start.getDate()); // Reset to event start date
			setEndDate(newEndDate);
		} else {
			setError(null);
			setEndDate(newEndDate);
		}
	};

	const handleEventAdd = (
		eventAdd: null | DateSelectArg,
		selectedDays: string[],
		endDate: Date
	) => {
		// adds the calendar event to displayedCalendarEvents when the user clicks the confirm button
		// all events are added as recurrence with RRULE... single day events ends up being a recurrence of 1 day
		if (eventAdd) {
			var calendarApi = eventAdd.view.calendar;
			calendarApi.unselect();

			const newEvent = {
				id: generateUId(),
				action: "INSERT",
				title: availabilityCalendarDict.available,
				rrule: generateRRuleString({
					frequency: Frequency.WEEKLY,
					startDate: eventAdd.start, //new Date(eventAdd.startStr),
					endDate: endDate,
					interval: 1,
					dayOfWeek: convertToRRuleWeekdays(selectedDays),
				}),
				duration: getDuration(new Date(eventAdd.startStr), new Date(eventAdd.endStr)).hhmm, // duration between eventAdd.startStr and eventAdd.endStr... and not between eventAdd.startStr and endDate
				startWeek: getWeekNumber(eventAdd.start), // getWeekNumber(new Date(eventAdd.startStr)),
				endWeek: getWeekNumber(endDate),
				exdate: [],
			};

			setDisplayedCalendarEvents([...displayedCalendarEvents, newEvent]);
		}

		setAddDialogVisibility(false, null); // hide the dialog after adding the event
	};

	return (
		<div id="cal-addDialog" className={styles["dialog-overlay"]}>
			<div className={styles["dialog-content"]}>
				<label className={styles["dialog-text"]}>
					{availabilityCalendarDict.addAvailability
						.replace("{start}", UITime(eventAdd.start, teacher.timezone.tzIdentifier))
						.replace("{end}", UITime(eventAdd.end, teacher.timezone.tzIdentifier))}
				</label>
				<div className={styles["days-selection"]}>
					{daysOfWeek.map((day) => (
						<label key={day} className={styles["days-selection"]}>
							<input
								className={styles["day-checkbox"]}
								type="checkbox"
								checked={selectedDays.includes(day) || day === startDay}
								onChange={() => handleDayToggle(day)}
								disabled={day === startDay}
							/>
							{day}
						</label>
					))}
				</div>
				<div>
					<label className={styles["end-date-label"]}>
						{availabilityCalendarDict.endDate}
						<input
							type="date"
							value={endDate.toISOString().split("T")[0]}
							onChange={handleEndDateChange}
						/>
					</label>
					{error && <p className={styles["error-message"]}>{error}</p>}
				</div>
				<div className={styles["button-row"]}>
					<span
						className="default-btn-icon"
						title={availabilityCalendarDict.confirm}
						onClick={() => handleEventAdd(eventAdd, selectedDays, endDate)}
					>
						<i className="fas fa-check-square"></i>
					</span>
					<span
						className="default-btn-icon"
						title={availabilityCalendarDict.cancel}
						onClick={() => setAddDialogVisibility(false, null)}
					>
						<i className="fas fa-times"></i>
					</span>
				</div>
			</div>
		</div>
	);
} // end of AddDialog /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface DeleteDialogProps {
	visible: boolean;
	eventDelete: null | EventClickArg;
	availabilityCalendarDict: Dictionary;
	displayedCalendarEvents: any[];
	setDisplayedCalendarEvents: any;
	deletedCalendarEvents: any[];
	setDeletedCalendarEvents: any;
	teacher: any;
	setDeleteDialogVisibility: (visibility: boolean, eventData: null | EventClickArg) => void;
}
function DeleteDialog({
	visible,
	eventDelete,
	availabilityCalendarDict,
	displayedCalendarEvents,
	setDisplayedCalendarEvents,
	deletedCalendarEvents,
	setDeletedCalendarEvents,
	teacher,
	setDeleteDialogVisibility,
}: DeleteDialogProps) {
	// constructing the delete event dialog. Initial values are taken from the calling function
	// these initial values are simply returned back to the calling function if the user accepts; else the values are removed
	if (!visible) return null;
	if (!eventDelete) return null;
	if (!(eventDelete?.event?.id ?? null)) return null;
	if (!(eventDelete?.event?.start ?? null)) return null;
	if (!(eventDelete?.event?.end ?? null)) return null;
	const deletionTarget = displayedCalendarEvents.filter(
		(event) => event.id === eventDelete.event.id
	)[0];
	if (!deletionTarget) return null;
	const eventAttributes = getRRuleAttributes(
		deletionTarget.rrule as string,
		deletionTarget.exdate as DateInput[]
	);
	const startTime = UIDateTime(eventAttributes.startDate, teacher.timezone.tzIdentifier);
	const endTime = UIDateTime(eventAttributes.endDate, teacher.timezone.tzIdentifier);

	// function to track the deleted events properly
	const captureEventDelete = (deletedId: string) => {
		const eventToDelete = displayedCalendarEvents.find((event) => event.id === deletedId);

		if (eventToDelete) {
			// Save the event to deletedEvents with action set to "DELETE"
			setDeletedCalendarEvents((prevEvents: any[]) => [
				...prevEvents,
				{ ...eventToDelete, action: "DELETE" },
			]);

			// Update the displayedCalendarEvents state
			setDisplayedCalendarEvents(
				displayedCalendarEvents.filter((event) => event.id !== deletedId)
			);
		}
	};

	// function to delete an event
	const handleEventDelete = (eventDelete: EventClickArg, deleteAll: boolean) => {
		if (deleteAll) {
			// deleteAll: true => Deletion of All events (removed eventDelete.event.id) from the calendar
			captureEventDelete(eventDelete.event.id); // Capture the deleted event
		} else {
			// deleteAll: false => Deletion of single events
			if (eventAttributes.count === 1) {
				// delete the complete event if this is the only date left for this event
				captureEventDelete(eventDelete.event.id); // Capture the deleted event
			} else {
				// this is not the only date left for this event... add the deletedSelected as exdate in this event
				// set the action to UPDATE only if its not a newly inserted event
				const updatedEvents = displayedCalendarEvents.map((event) => {
					if (event.id === eventDelete.event.id) {
						const exDates = event.exdate as DateInput[];
						exDates.push((eventDelete.event.start as Date).toISOString());

						return {
							...event,
							action: event.action === "INSERT" ? "INSERT" : "UPDATE",
							exdate: exDates,
						};
					} else {
						return event;
					}
				});
				setDisplayedCalendarEvents(updatedEvents);
			}
		}

		setDeleteDialogVisibility(false, null);
	}; // end of handleEventDelete

	if (
		!canDeleteAvailability(
			eventDelete?.event?.title,
			eventDelete?.event?.start ?? new Date(),
			eventDelete?.event?.end ?? new Date(),
			displayedCalendarEvents
		)
	) {
		eventDelete.jsEvent.preventDefault(); // Prevent the default action
		return null;
	}

	return (
		<div id="cal-deleteDialog" className={styles["dialog-overlay"]}>
			<div className={styles["dialog-content"]}>
				<label className={styles["dialog-text"]}>
					{eventAttributes.count >= 2
						? availabilityCalendarDict.delete2
								.replace("{count}", eventAttributes.count.toString())
								.replace("{start}", startTime)
								.replace("{end}", endTime)
								.replace(
									"{selected}",
									UIDateTime(
										eventDelete.event.start as Date,
										teacher.timezone.tzIdentifier
									)
								)
						: availabilityCalendarDict.delete3.replace(
								"{selected}",
								UIDateTime(
									eventDelete.event.start as Date,
									teacher.timezone.tzIdentifier
								)
						  )}
				</label>
				<div className={styles["button-row"]}>
					<span
						// Delete All
						className="default-btn-icon"
						title={availabilityCalendarDict.deleteAllH
							.replace("{start}", startTime)
							.replace("{end}", endTime)}
						onClick={() => handleEventDelete(eventDelete, true)}
						hidden={eventAttributes.count <= 1}
					>
						<i className="fas fa-check-square"></i>
						{" " + availabilityCalendarDict.deleteAll}
					</span>
					<span
						// Delete Selected
						className="default-btn-icon"
						title={availabilityCalendarDict.deleteSelectedH.replace(
							"{selected}",
							UIDateTime(
								eventDelete.event.start as Date,
								teacher.timezone.tzIdentifier
							)
						)}
						onClick={() => handleEventDelete(eventDelete, false)}
					>
						<i className="fas fa-check-square"></i>
						{eventAttributes.count > 1
							? " " + availabilityCalendarDict.deleteSelected
							: ""}
					</span>
					<span
						// Cancel
						className="default-btn-icon"
						title={availabilityCalendarDict.cancel}
						onClick={() => setDeleteDialogVisibility(false, null)}
					>
						<i className="fas fa-times"></i>
					</span>
				</div>
			</div>
		</div>
	);
} // end of DeleteDialog //////////////////////////////////////////////////////////////////////////////////////////////////////////////

export { AvailabilityCalendar };
