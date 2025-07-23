"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AvailabilityCalendar } from "@/components/Calendar/AvailabilityCalendar";
import { getWeekNumber, getDateFromWeekNumber } from "@/utils/rruleUtils";
import { UIDate } from "@/utils/dateUtils";
import styles from "./css/AvailabilityForm.module.css";

const AvailabilityForm = ({ lang, teacher, availabilityCal, availabilityCalendarDict }) => {
	const maxEndWeek =
		availabilityCal.length > 0 ? Math.max(...availabilityCal.map((event) => event.endWeek)) : 0;
	const currentWeek = getWeekNumber(new Date());
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		reset,
		setValue,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm({
		mode: "all",
		defaultValues: {
			email: "",
			calendar: "",
			lang: "en",
		},
	});

	useEffect(() => {
		setValue("email", teacher.email);
		setValue("calendar", availabilityCal);
	}, [availabilityCal, teacher, setValue]);

	const handleCalendarChange = (events) => {
		setValue("calendar", events); // Update form value
	};

	const onSubmit = async (data) => {
		setIsLoading(true);
		await axios
			.post("/api/teacher/availability", {
				...data,
				lang,
			})
			.then((response) => {
				toast.success(availabilityCalendarDict.success);
				// router.push(path);
				// router.replace(path);
				// router.refresh();
				// cannot fetch the date from the server properly - so reloading the page
				window.location.reload();
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {});
		setIsLoading(false);
	};

	return (
		<div className="subnav-form">
			<p>{availabilityCalendarDict.pageTitleH}</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-9">
						<AvailabilityCalendar
							lang={lang}
							teacher={teacher}
							id="calendar"
							value={availabilityCal}
							handleFieldChange={handleCalendarChange}
							availabilityCalendarDict={availabilityCalendarDict}
						/>
					</div>
					<div className="col-md-3">
						<label
							className={
								maxEndWeek === 0 || maxEndWeek < currentWeek
									? styles["cal-instructions-availability-red"]
									: styles["cal-instructions-availability"]
							}
						>
							{/* {maxEndWeek === 0 || maxEndWeek < currentWeek
								? availabilityCalendarDict.availabilityNotDefined
								: availabilityCalendarDict.availabilityDefined
										.replace("{week}", `${maxEndWeek.toString().slice(4)}`)
										.replace("{year}", `${maxEndWeek.toString().slice(0, 4)}`)} */}
							{maxEndWeek === 0 || maxEndWeek < currentWeek
								? availabilityCalendarDict.availabilityNotDefined
								: availabilityCalendarDict.availabilityEndDate.replace(
										"{date}",
										UIDate(getDateFromWeekNumber(`${maxEndWeek}`))
								  )}
						</label>
						<label className={styles["cal-instructions-header"]}>
							{availabilityCalendarDict.instructions}
						</label>
						<ul className={styles["cal-instructions-ul"]}>
							<li>{availabilityCalendarDict.instructionList.il0}</li>
							<li>{availabilityCalendarDict.instructionList.il1}</li>
							<li>{availabilityCalendarDict.instructionList.il2}</li>
							<li>{availabilityCalendarDict.instructionList.il3}</li>
							<li>{availabilityCalendarDict.instructionList.il4}</li>
						</ul>
					</div>
				</div>
				<div className="col-md-12">
					<button type="submit" disabled={isLoading}>
						{isLoading
							? availabilityCalendarDict.pleaseWait
							: availabilityCalendarDict.updateBtn}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AvailabilityForm;
