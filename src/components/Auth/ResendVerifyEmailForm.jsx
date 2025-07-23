"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../FormHelpers/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { REGEX_EMAIL } from "@/libs/constants";

const ResendVerifyEmailForm = ({ lang, resendVerifyEmail }) => {
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
			.post("/api/auth/resend-verify-email", {
				...data,
			})
			.then((response) => {
				toast.success(resendVerifyEmail.success, { duration: 6000 });
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
			<h2>{resendVerifyEmail.resendVerifyEmail}</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					id="email"
					label={resendVerifyEmail.email}
					helptext={resendVerifyEmail.emailH}
					type="email"
					disabled={isLoading}
					register={register}
					errors={errors}
					validationRules={{
						required: resendVerifyEmail.mandatoryInput,
						pattern: {
							value: REGEX_EMAIL,
							message: resendVerifyEmail.emailE1,
						},
					}}
					watch={watch}
					setValue={setValue}
				/>

				<button type="submit" disabled={isLoading}>
					{isLoading ? resendVerifyEmail.pleaseWait : resendVerifyEmail.verifyEmail}
				</button>
			</form>
		</div>
	);
};

export default ResendVerifyEmailForm;
