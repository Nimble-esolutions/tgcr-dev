"use client";

import React from "react";

const Select = ({
	id,
	label,
	labelShow = true,
	helptext = "",
	disabled,
	register,
	required,
	errors,
	validationRules = {},
	watch,
	setValue,
	displayOptions = [], // [{key: "", value: "", label: ""}]
}) => {
	const value = watch ? watch(id) : ""; // get the current value of this control

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
			>
				<select
					id={id}
					className={`form-select ${errors[id] ? "is-invalid" : ""}`} // conditionally apply the is-invalid class
					{...register(id, { required, ...validationRules })}
					disabled={disabled}
					value={value || ""}
					onChange={(e) => {
						if (setValue) {
							setValue(id, e.target.value);
						}
					}}
					onBlur={(e) => register(id).onBlur(e)}
				>
					{required ? (
						<option
							value=""
							disabled
							hidden
							className="display-none"
						>
							{helptext || label}
						</option>
					) : (
						<option value="">{helptext || label}</option>
					)}
					{displayOptions.map((option) => (
						<option key={option.key} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			{errors[id] && (
				<span className="form-control-error-message">
					{errors[id].message}
				</span>
			)}
		</div>
	);
};

export default Select;
