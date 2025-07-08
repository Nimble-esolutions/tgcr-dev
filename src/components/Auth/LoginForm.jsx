"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import Input from "@/components/FormHelpers/Input";
import Checkbox from "@/components/FormHelpers/Checkbox";
import { REGEX_PASSWORD, REGEX_EMAIL } from "@/libs/constants";

// common login form - used for both Student and Teacher entities
const LoginForm = ({ lang, loginDict }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm({
		mode: "all",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		// Check if "Remember Me" was previously set
		if (typeof window !== "undefined") {
			const rememberMeFlag = localStorage.getItem("rememberMe") === "true";
			setRememberMe(rememberMeFlag);
		}
	}, []);

	const onSubmit = (data) => {
		setIsLoading(true);

		// Store the rememberMe flag in localStorage
		if (typeof window !== "undefined") {
			if (rememberMe) {
				localStorage.setItem("rememberMe", "true");
			} else {
				localStorage.removeItem("rememberMe");
			}
		}

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.status !== 200) {
				toast.error(callback.error);
			}

			if (callback?.status === 200) {
				toast.success(loginDict.success);
				router.push(`/${lang}/dashboard`);
				router.refresh();
			}
		});

		setIsLoading(false);
	};

	return (
		<div className="login-form">
			<h2>{loginDict.login}</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					id="email"
					label={loginDict.email}
					helptext={loginDict.emailH}
					type="email"
					disabled={isLoading}
					register={register}
					errors={errors}
					validationRules={{
						required: loginDict.mandatoryInput,
						pattern: {
							value: REGEX_EMAIL,
							message: loginDict.emailE1,
						},
					}}
					watch={watch}
					setValue={setValue}
				/>

				<Input
					id="password"
					type="password"
					label={loginDict.password}
					helptext={loginDict.passwordH}
					disabled={isLoading}
					register={register}
					errors={errors}
					validationRules={{
						required: loginDict.mandatoryInput,
						pattern: {
							value: REGEX_PASSWORD,
							message: loginDict.passwordE1,
						},
					}}
					watch={watch}
					setValue={setValue}
				/>

				{/* included <Checkbox> control in place of this <input> control
				<div className="row align-items-center">
					<div className="col-12 remember-me-wrap">
						<p>
							<input 
								type="checkbox" 
								id="rememberMe" 
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
							/>
							<label htmlFor="rememberMe">{loginDict.rememberMe}</label>
						</p>
					</div>
				</div> 
				*/}

				<div className="row align-items-center">
					<div className="col-12 remember-me-wrap">
						<Checkbox
							id="rememberMe"
							label={loginDict.rememberMe}
							helptext={""}
							disabled={isLoading}
							register={register}
							errors={errors}
							watch={watch}
							setValue={setValue}
							clearErrors={clearErrors}
						/>
					</div>
				</div>

				<button type="submit" disabled={isLoading}>
					{isLoading ? loginDict.pleaseWait : loginDict.login}
				</button>

				<div className="row align-items-center">
					<div className="col-lg-5 lost-your-password-wrap">
						<Link href={`/${lang}/auth/forgot-password`}>
							{loginDict.forgotPassword}
						</Link>
					</div>
					<div className="col-lg-7 lost-your-password-wrap">
						<Link href={`/${lang}/auth/resend-verify-email`}>
							{loginDict.noVerifyEmail}
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
