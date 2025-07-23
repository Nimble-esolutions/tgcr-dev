"use client";

import React from "react";
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import styles from "./css/InputStar.module.css";

interface InputStarProps {
	id: string;
	label?: string;
	labelShow?: boolean;
	helptext?: string;
	disabled?: boolean;
	register?: UseFormRegister<any>;
	required?: boolean;
	errors?: FieldErrors<any>;
	validationRules?: Record<string, any>;
	watch?: UseFormWatch<any>;
	setValue?: UseFormSetValue<any>;
	onChange?: (e: { target: { id: string; value: number } }) => void;
	alignRight?: boolean;
}

const InputStar: React.FC<InputStarProps> = ({
	id,
	label,
	labelShow = true,
	helptext = "",
	disabled = false,
	register,
	required = false,
	errors = {},
	validationRules = {},
	watch,
	setValue,
	onChange,
	alignRight,
}) => {
	const value = watch ? watch(id) : 0;

	const handleStarClick = (rating: number) => {
		if (disabled) return;
		if (setValue) setValue(id, rating, { shouldValidate: true });
		if (onChange) {
			// Create a synthetic event to mimic the change event structure
			const syntheticEvent = {
				target: {
					id,
					value: rating,
				},
			};
			onChange(syntheticEvent as any); // parent can use e.target.id and e.target.value
		}
	};

	return (
		<div className="form-group">
			<div className={styles.starRow}>
				{labelShow && alignRight && <label className="input-label">{label}</label>}
				<div className={styles.allStars}>
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							className={`bx ${value >= star ? "bxs-star checked" : "bxs-star"} ${
								styles.star
							} ${value >= star ? styles.checked : ""} ${
								disabled ? styles.disabled : ""
							}`}
							title={helptext}
							onClick={() => handleStarClick(star)}
							role="button"
							aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
							tabIndex={disabled ? -1 : 0}
						/>
					))}
				</div>
				{/* Hidden input for react-hook-form */}
				<input
					type="hidden"
					id={id}
					{...(register ? register(id, { required, ...validationRules }) : {})}
					value={value || ""}
					readOnly
				/>
				{labelShow && !alignRight && <label className="input-label">{label}</label>}
			</div>
			{errors && errors[id] && (
				<span className="form-control-error-message">{errors[id]?.message as string}</span>
			)}
		</div>
	);
};

export default InputStar;
