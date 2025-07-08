"use client";

import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const SetPrice = ({
	id,
	label,
	disabled,
	required,
	register,
	errors,
	value,
	onChange,
}) => {
	// const [value, setValue] = useState(0);

	const handleInput = (event) => {
		// Check if the entered value is negative
		const inputValue = parseInt(event.target.value, 10);
		const newValue = inputValue < 0 ? 0 : inputValue;

		// Update the state with the non-negative value
		onChange(newValue);
	};

	return (
		<div className="form-group">
			<label>{label}</label>

			<input
				type="number"
				id={id}
				value={value}
				onInput={handleInput}
				disabled={disabled}
				{...register(id, { required })}
				className="form-control"
			/>
		</div>
	);
};

export default SetPrice;
