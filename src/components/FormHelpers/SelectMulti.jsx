"use client";

import React, { useId } from "react";
import Select from "react-select";

const SelectMulti = ({
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
	const value = watch ? watch(id) : []; // get the current value of this control

	// Convert displayOptions to the format required by react-select
	const options = displayOptions.map((option) => ({
		key: option.key,
		value: option.value,
		label: option.label,
	}));

	return (
		<div className="form-group">
			{labelShow && (
				<label className="input-label" htmlFor={id}>
					{label}
				</label>
			)}
			<Select
				//id={id}	// not sure why but inputId should be used here; otherwise the focus from label does not work
				inputId={id}
				instanceId={useId()} // this is required to avoid some console warnings/errors
				className={`form-select-multi ${
					errors[id] ? "is-invalid" : ""
				}`} // conditionally apply the is-invalid class
				{...register(id, { required, ...validationRules })}
				value={options.filter((option) => value.includes(option.value))}
				onChange={(selectedOptions) => {
					const selectedValues = selectedOptions
						? selectedOptions.map((option) => option.value)
						: [];
					if (setValue) {
						setValue(id, selectedValues);
					}
				}}
				onBlur={(e) => register(id).onBlur(e)}
				options={options}
				placeholder={helptext || label}
				isDisabled={disabled}
				closeMenuOnSelect={false}
				// styles={customStyles}
				theme={(theme) => ({
					...theme,
					border: 1,
					borderRadius: 2,
					colors: {
						...theme.colors,
						primary: "green",
						primary25: "#1967D2",
					},
				})}
				isMulti // Enable multiple selection
			/>

			{errors[id] && (
				<span className="form-control-error-message">
					{errors[id].message}
				</span>
			)}
		</div>
	);
};

export default SelectMulti;
