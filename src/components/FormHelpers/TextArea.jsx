"use client";

import React from "react";

const TextArea = ({
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
}) => {
	const value = watch ? watch(id) : "";

	return (
		<div className="form-group">
			{labelShow && (
				<label className="input-label" htmlFor={id}>
					{label}
				</label>
			)}

			<textarea
				id={id}
				className={`form-control ${errors[id] ? "is-invalid" : ""}`}
				cols="30"
				rows="5"
				placeholder={helptext || label}
				{...register(id, { required, ...validationRules })}
				disabled={disabled}
				required={required ? true : false}
				value={value || ""}
				onChange={(e) => {
					if (setValue) {
						setValue(id, e.target.value.trimStart());
					}
				}}
				onBlur={(e) => register(id).onBlur(e)}
			/>
			{errors[id] && (
				<span className="form-control-error-message">
					{errors[id].message}
				</span>
			)}
		</div>
	);
};

export default TextArea;
