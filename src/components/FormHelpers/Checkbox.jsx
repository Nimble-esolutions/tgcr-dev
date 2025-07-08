"use client";

import React from "react";

const Checkbox = ({
	id,
	label,
	// labelShow = true,
	helptext = "",
	disabled,
	register,
	required,
	errors,
	validationRules = {},
	watch,
	setValue,
	clearErrors,
	onChange,
}) => {
	const value = watch ? watch(id) : false; // get the current value of this control

	return (
		<div className="form-group">
			<div
				style={{
					position: "relative",
					display: "flex",
					alignItems: "center",
				}}
			>
				<input
					id={id}
					type="checkbox"
					className={`form-check-input ${errors[id] ? "is-invalid" : ""}`} // conditionally apply the is-invalid class
					placeholder={helptext || label}
					{...register(id, { required, ...validationRules })}
					disabled={disabled}
					required={required ? true : false}
					checked={value || false}
					onChange={(e) => {
						if (setValue) {
							setValue(id, e.target.checked);
						}
						if (e.target.checked) {
							clearErrors(id);
						}
						if (onChange) {
							onChange(e); // Call the onClick handler passed from the form
						}
						register(id).onChange(e);
					}}
				/>
				<label className="input-label" htmlFor={id}>
					<span className="form-control-checkbox-label">{label}</span>
				</label>
			</div>
			{errors[id] && <span className="form-control-error-message">{errors[id].message}</span>}
		</div>
	);
};

export default Checkbox;
