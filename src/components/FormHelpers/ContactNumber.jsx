"use client";

// just a composite control for Contact Number
// contains a label, Select for country code, Input for contact number and an error control
// most of the properties are set by this control itself
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LookupTable } from "@/libs/types";

const ContactNumber = ({
	idCC,
	idCN,
	label,
	labelShow = true,
	helptextCC = "",
	helptextCN = "",
	validationRulesCC = {},
	validationRulesCN = {},
	lang,
	disabled,
	register,
	required,
	errors,
	watch,
	setValue,
}) => {
	const valueCC = watch ? watch(idCC) : ""; // get the current value for Country Code
	const valueCN = watch ? watch(idCN) : ""; // get the current value for Contact Number
	const [countryCodes, setCountryCodes] = useState([]);

	useEffect(() => {
		const fetchCountryCodes = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.Country,
				},
			});
			setCountryCodes(response.data);
		};

		fetchCountryCodes();
	}, [lang]);

	return (
		<div className="form-group">
			{labelShow && (
				<label className="input-label" htmlFor={idCC}>
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
				<div className="col-md-5" style={{ marginRight: "8px" }}>
					{/* Country Code (CC) */}
					<select
						id={idCC}
						className={`form-select ${errors[idCC] ? "is-invalid" : ""}`} // conditionally apply the is-invalid class
						{...register(idCC, { required, ...validationRulesCC })}
						disabled={disabled}
						value={valueCC || ""}
						onChange={(e) => {
							if (setValue) {
								setValue(idCC, e.target.value);
							}
						}}
						onBlur={(e) => register(idCC).onBlur(e)}
					>
						{required ? (
							<option value="" disabled hidden className="display-none">
								{helptextCC || ""}
							</option>
						) : (
							<option value="">{helptextCC || ""}</option>
						)}
						{countryCodes.map((country) => (
							<option key={country.id} value={country.id}>
								{country.name} ({country.dialCode})
							</option>
						))}
					</select>
				</div>
				<div className="col-md-7">
					{/* Contact Number (CN) */}
					<input
						id={idCN}
						type="text"
						className={`form-control ${errors[idCN] ? "is-invalid" : ""}`} // conditionally apply the is-invalid class
						placeholder={helptextCN || ""}
						{...register(idCN, { required, ...validationRulesCN })}
						disabled={disabled}
						required={required ? true : false}
						value={valueCN || ""}
						onChange={(e) => {
							if (setValue) {
								setValue(idCN, e.target.value.trimStart());
							}
						}}
						onBlur={(e) => register(idCN).onBlur(e)}
					/>
				</div>
			</div>
			{errors[idCC] ? (
				<span className="form-control-error-message">{errors[idCC].message}</span>
			) : errors[idCN] ? (
				<span className="form-control-error-message">{errors[idCN].message}</span>
			) : (
				""
			)}
		</div>
	);
};

export default ContactNumber;
