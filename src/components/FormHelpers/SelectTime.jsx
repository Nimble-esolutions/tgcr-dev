"use client";

import React, { useState, useEffect } from "react";
import styles from "./css/SelectTime.module.css";

const SelectTime = ({
	id,
	label,
	labelShow = true,
	helptext = "", // there is no helptext to display - but leaving the prop here for consistency
	disabled,
	register,
	required,
	errors, // there are no errors to display from validationRules... this needs to be done by the calling program
	validationRules = {}, // there are no validationRules which can be applied here - but leaving the prop here for consistency
	watch,
	setValue,
}) => {
	const value = watch ? watch(id) ?? "01:00 AM" : "01:00 AM";
	const [valueHH, setValueHH] = useState();
	const [valueMM, setValueMM] = useState();
	const [valueAMPM, setValueAMPM] = useState();

	const hhOptions = [
		{ key: "01", value: "01", label: "01" },
		{ key: "02", value: "02", label: "02" },
		{ key: "03", value: "03", label: "03" },
		{ key: "04", value: "04", label: "04" },
		{ key: "05", value: "05", label: "05" },
		{ key: "06", value: "06", label: "06" },
		{ key: "07", value: "07", label: "07" },
		{ key: "08", value: "08", label: "08" },
		{ key: "09", value: "09", label: "09" },
		{ key: "10", value: "10", label: "10" },
		{ key: "11", value: "11", label: "11" },
		{ key: "12", value: "12", label: "12" },
	];
	const mmOptions = [
		{ key: "00", value: "00", label: "00" },
		{ key: "30", value: "30", label: "30" },
	];
	const ampmOptions = [
		{ key: "AM", value: "AM", label: "AM" },
		{ key: "PM", value: "PM", label: "PM" },
	];

	useEffect(() => {
		// HH:MM AM/PM is the format in which the information is stored
		let time, hours, minutes, period;
		const timeValue = watch ? watch(id) ?? "01:00 AM" : "01:00 AM";

		if (timeValue.includes(" ")) {
			// 12-hour format with AM/PM
			[time, period] = timeValue.split(" ");
			[hours, minutes] = time.split(":");
		} else {
			// 24-hour format
			[hours, minutes] = timeValue.split(":");
			period = hours >= 12 ? "PM" : "AM";
			hours = hours % 12 || 12; // Convert to 12-hour format
		}
		setValueHH(String(hours).padStart(2, "0"));
		setValueMM(String(minutes).padStart(2, "0"));
		setValueAMPM(period);
	}, [id, watch]);

	useEffect(() => {
		// HH:MM is the format in which the information is stored (no AM/PM)
		if (setValue) {
			// setValue(id, `${valueHH}:${valueMM} ${valueAMPM}`);

			var hh = valueHH;
			var mm = valueMM;
			if (hh === "12") {
				hh = "00";
			}

			if (valueAMPM === "PM") {
				hh = parseInt(hh, 10) + 12;
			}
			setValue(id, `${hh}:${mm}`);
		}
	}, [valueHH, valueMM, valueAMPM, id, setValue]);

	const handleChange = (e) => {
		// update the value of the control as the user selects individual components of time
		switch (e.target.id) {
			case id + "-hh":
				setValueHH(e.target.value);
				// if (setValue) {
				// 	setValue(id, `${e.target.value}:${valueMM} ${valueAMPM}`);
				// }
				break;
			case id + "-mm":
				setValueMM(e.target.value);
				// if (setValue) {
				// 	setValue(id, `${valueHH}:${e.target.value} ${valueAMPM}`);
				// }
				break;
			case id + "-ampm":
				setValueAMPM(e.target.value);
				// if (setValue) {
				// 	setValue(id, `${valueHH}:${valueMM} ${e.target.value}`);
				// }
				break;
		}
	};

	return (
		<div className="form-group">
			{labelShow && (
				<label className="input-label" htmlFor={id}>
					{label}
				</label>
			)}

			<div
				style={{
					position: "relative",
					display: "flex",
					alignItems: "center",
				}}
				id={id}
				className={styles[`selecttime-control ${errors[id] ? "is-invalid" : ""}`]}
				{...register(id, { required, ...validationRules })}
			>
				<div className="col-md-4" style={{ marginRight: "8px" }}>
					<select
						id={id + "-hh"}
						className={`form-select ${errors[id] ? "is-invalid" : ""}`}
						disabled={disabled}
						value={valueHH || ""}
						onChange={(e) => {
							handleChange(e);
						}}
					>
						{hhOptions.map((option) => (
							<option key={option.key} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				<div className="col-md-4" style={{ marginRight: "8px" }}>
					<select
						id={id + "-mm"}
						className={`form-select ${errors[id] ? "is-invalid" : ""}`}
						disabled={disabled}
						value={valueMM || ""}
						onChange={(e) => {
							handleChange(e);
						}}
					>
						{mmOptions.map((option) => (
							<option key={option.key} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				<div className="col-md-3" style={{ marginRight: "8px" }}>
					<select
						id={id + "-ampm"}
						className={`form-select ${errors[id] ? "is-invalid" : ""}`}
						disabled={disabled}
						value={valueAMPM || ""}
						onChange={(e) => {
							handleChange(e);
						}}
					>
						{ampmOptions.map((option) => (
							<option key={option.key} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>
			{errors[id] && <span className="form-control-error-message">{errors[id].message}</span>}
		</div>
	);
};

export default SelectTime;
