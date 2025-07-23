"use client";

import React from "react";

const Input = ({
	id,
	type = "text",
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
	onChange,
	onBlur,
	alignRight,
}) => {
	const [inputType, setInputType] = React.useState(type);
	const value = watch ? watch(id) : ""; // get the current value of this control

	const togglePasswordVisibility = () => {
		setInputType((prevType) => (prevType === "password" ? "text" : "password"));
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
			>
				<input
					id={id}
					type={inputType}
					className={`form-control ${errors[id] ? "is-invalid" : ""}`} // conditionally apply the is-invalid class
					style={{
						textAlign: alignRight ? "right" : "left",
						marginRight: alignRight ? "10px" : "",
					}}
					placeholder={helptext || label}
					// {...register(id, { required, ...validationRules })}
					{...(register ? register(id, { required, ...validationRules }) : {})}
					disabled={disabled}
					required={required ? true : false}
					value={value || ""}
					onChange={(e) => {
						if (setValue) {
							setValue(id, e.target.value.trimStart());
						}
						if (onChange) {
							onChange(e); // Call the onClick handler passed from the form
						}
						register(id).onChange(e);
					}}
					onBlur={(e) => {
						if (onBlur) {
							onBlur(e); // Call the onBlur handler passed from the form
						}
						register(id).onBlur(e);
					}}
				/>
				{type === "password" && (
					<span className="default-btn-togglePassword" onClick={togglePasswordVisibility}>
						{/* {inputType === "password" ? "Show" : "Hide"} */}
						<i
							className={inputType === "password" ? "fas fa-eye" : "fas fa-eye-slash"}
						></i>
					</span>
				)}
			</div>
			{errors[id] && <span className="form-control-error-message">{errors[id].message}</span>}
		</div>
	);
};

export default Input;
