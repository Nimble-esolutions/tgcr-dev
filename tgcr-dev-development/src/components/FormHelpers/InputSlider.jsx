"use client";

import React, { useState } from "react";
import styles from "./css/InputSlider.module.css";

const InputSlider = ({
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
	minValue,
	maxValue,
	stepValue,
	onChange,
}) => {
	const value = watch ? watch(id) : ""; // get the current value of this control
	const [sliderValue, setSliderValue] = useState(maxValue);

	const handleSliderChange = (e) => {
		setSliderValue(e.target.value);
	};

	return (
		<div className="form-group">
			{
				<label className={styles["slider-label"]} htmlFor={id}>
					{labelShow && label + ": "}
					<span className={styles["slider-value"]}>
						{minValue.toString() + " - " + sliderValue.toString()}
					</span>
				</label>
			}

			<div
				style={{
					position: "relative",
					display: "flex",
					alignItems: "center",
				}}
			>
				<input
					id={id}
					type="range"
					className={`form-range ${errors[id] ? "is-invalid" : ""}`} // conditionally apply the is-invalid class
					title={helptext || label}
					// {...register(id, { required, ...validationRules })}
					{...(register ? register(id, { required, ...validationRules }) : {})}
					disabled={disabled}
					required={required ? true : false}
					value={value || ""}
					onChange={(e) => {
						if (setValue) {
							setValue(id, e.target.value);
						}
						handleSliderChange(e);
						if (onChange) {
							onChange(e); // Call the onClick handler passed from the form
						}
						register(id).onChange(e);
					}}
					min={minValue}
					max={maxValue}
					step={stepValue}
				/>
			</div>
			{errors[id] && <span className="form-control-error-message">{errors[id].message}</span>}
		</div>
	);
};

export default InputSlider;
