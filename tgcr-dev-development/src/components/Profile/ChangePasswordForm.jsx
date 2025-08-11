"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/FormHelpers/Input";
import { REGEX_PASSWORD, REGEX_EMAIL } from "@/libs/constants";

const ChangePasswordForm = ({ lang, user, profilePasswordDict }) => {
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		reset,
		setValue,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm({
		mode: "all",
		defaultValues: {
			email: user.email,
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
			lang: "en",
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		await axios
			.post("/api/auth/change-password", {
				...data,
				lang,
			})
			.then((response) => {
				toast.success(profilePasswordDict.success);
				reset();
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// Watch the password field to compare with confirm password
	const newPassword = watch("newPassword");

	return (
		<div className="subnav-form">
			{/* <p>{profilePasswordDict.pageTitleH}</p> */}
			<p>{profilePasswordDict.passwordE1}</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					id="email"
					type="email"
					label={profilePasswordDict.email}
					disabled={true}
					register={register}
					errors={errors}
					watch={watch}
					setValue={setValue}
				/>

				<Input
					id="currentPassword"
					type="password"
					label={profilePasswordDict.currentPassword}
					helptext={profilePasswordDict.currentPasswordH}
					disabled={isLoading}
					register={register}
					errors={errors}
					required={true}
					validationRules={{
						required: profilePasswordDict.mandatoryInput,
						pattern: {
							value: REGEX_PASSWORD,
							message: profilePasswordDict.passwordE1,
						},
					}}
					watch={watch}
					setValue={setValue}
				/>

				<Input
					id="newPassword"
					type="password"
					label={profilePasswordDict.newPassword}
					helptext={profilePasswordDict.newPasswordH}
					disabled={isLoading}
					register={register}
					errors={errors}
					required={true}
					validationRules={{
						required: profilePasswordDict.mandatoryInput,
						pattern: {
							value: REGEX_PASSWORD,
							message: profilePasswordDict.newPasswordE1,
						},
					}}
					watch={watch}
					setValue={setValue}
				/>

				<Input
					id="confirmPassword"
					type="password"
					label={profilePasswordDict.confirmPassword}
					helptext={profilePasswordDict.confirmPasswordH}
					disabled={isLoading}
					register={register}
					errors={errors}
					required={true}
					validationRules={{
						validate: (value) =>
							value === newPassword || profilePasswordDict.confirmPasswordE1,
					}}
					watch={watch}
					setValue={setValue}
				/>
				<button type="submit" disabled={isLoading}>
					{isLoading
						? profilePasswordDict.pleaseWait
						: profilePasswordDict.changePasswordBtn}
				</button>
			</form>
		</div>
	);
};

export default ChangePasswordForm;
