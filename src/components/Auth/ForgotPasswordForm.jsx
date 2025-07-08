"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../FormHelpers/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { REGEX_EMAIL } from "@/libs/constants";

const ForgotPasswordForm = ({ lang, forgotPassword }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		watch,
		reset,
		formState: { errors, isValid },
	} = useForm({
		mode: "all",
		defaultValues: {
			email: "",
			lang: "en",
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		await axios
			.post("/api/auth/forgot-password", {
				...data,
			})
			.then((response) => {
				toast.success(forgotPassword.success, { duration: 6000 });
				// reset();
				router.push(`/${lang}/auth/login`);
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			});

		setIsLoading(false);
	};
	return (
		<div className="login-form">
			<h2>{forgotPassword.retrieveYourPassword}</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					id="email"
					label={forgotPassword.email}
					helptext={forgotPassword.emailH}
					type="email"
					disabled={isLoading}
					register={register}
					errors={errors}
					validationRules={{
						required: forgotPassword.mandatoryInput,
						pattern: {
							value: REGEX_EMAIL,
							message: forgotPassword.emailE1,
						},
					}}
					watch={watch}
					setValue={setValue}
				/>

				<button type="submit" disabled={isLoading}>
					{isLoading ? forgotPassword.pleaseWait : forgotPassword.retrievePassword}
				</button>
			</form>
		</div>
	);
};

export default ForgotPasswordForm;
