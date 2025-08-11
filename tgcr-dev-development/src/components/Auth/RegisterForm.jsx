"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../FormHelpers/Input";
import Checkbox from "../FormHelpers/Checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { REGEX_PASSWORD, REGEX_EMAIL } from "@/libs/constants";
import { Role } from "@prisma/client";

// TODO: Setting up Terms & Conditions and Privacy Policy
const RegisterForm = ({ lang, registerAs, registerForm }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [role, setRole] = useState(registerAs);
	const router = useRouter();

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
			email: "",
			password: "",
			confirmPassword: "",
			selectedRole: Role.Student,
			tnc: false,
			lang: "en",
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		await axios
			.post("/api/auth/register", {
				...data,
				selectedRole: role,
				lang,
			})
			.then((response) => {
				toast.success(registerForm.success, { duration: 6000 });
				//reset();
				router.push(`/${lang}/auth/login`);
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// Watch the password field to compare with confirm password
	const password = watch("password");

	const renderTnCnPP = () => {
		// Function to render the localized string with links
		const tncLink = (
			<Link href={`/${lang}/terms-conditions`} target="_blank">
				{registerForm.tnc}
			</Link>
		);
		const ppLink = (
			<Link href={`/${lang}/privacy-policy`} target="_blank">
				{registerForm.pp}
			</Link>
		);
		const readTnCUrl = registerForm.hasAccepted.split(/({TnC}|{PP})/);

		return (
			<span>
				{readTnCUrl.map((urlPart, index) => {
					if (urlPart === "{TnC}") {
						return <React.Fragment key={index}>{tncLink}</React.Fragment>;
					}
					if (urlPart === "{PP}") {
						return <React.Fragment key={index}>{ppLink}</React.Fragment>;
					}
					return urlPart;
				})}
			</span>
		);
	};

	return (
		<div className="register-form">
			<h2>
				{registerAs === Role.Student
					? registerForm.registerStudent
					: registerForm.registerTeacher}
			</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					id="email"
					label={registerForm.email}
					helptext={registerForm.emailH}
					type="email"
					disabled={isLoading}
					register={register}
					errors={errors}
					validationRules={{
						required: registerForm.mandatoryInput,
						pattern: {
							value: REGEX_EMAIL,
							message: registerForm.emailE1,
						},
					}}
					watch={watch}
					setValue={setValue}
				/>

				<Input
					id="password"
					type="password"
					label={registerForm.password}
					helptext={registerForm.passwordH}
					disabled={isLoading}
					register={register}
					errors={errors}
					validationRules={{
						required: registerForm.mandatoryInput,
						pattern: {
							value: REGEX_PASSWORD,
							message: registerForm.passwordE1,
						},
					}}
					watch={watch}
					setValue={setValue}
				/>

				<Input
					id="confirmPassword"
					type="password"
					label={registerForm.confirmPassword}
					helptext={registerForm.confirmPasswordH}
					disabled={isLoading}
					register={register}
					errors={errors}
					validationRules={{
						validate: (value) => value === password || registerForm.confirmPasswordE1,
					}}
					watch={watch}
					setValue={setValue}
				/>

				<div className="row align-items-start">
					<div className="col-12 tnc-wrap">
						<Checkbox
							id="tnc"
							label={renderTnCnPP()}
							helptext={""}
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: registerForm.hasAcceptedE1,
							}}
							watch={watch}
							setValue={setValue}
							clearErrors={clearErrors}
						/>
					</div>
				</div>

				<button type="submit" disabled={isLoading}>
					{isLoading ? registerForm.pleaseWait : registerForm.register}
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
