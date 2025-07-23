"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/FormHelpers/Input";
import ContactNumber from "@/components/FormHelpers/ContactNumber";
import { REGEX_EMAIL, REGEX_PHONE } from "@/libs/constants";
import { ImpersonationType } from "@/libs/types";

const ParentProfileForm = ({ lang, currentUser, impersonationType, profileParentsDict }) => {
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
			email: "",
			parentsFullName: "",
			parentsEmail: "",
			parentsCountryId: "",
			parentsContact: "",
			lang: "en",
		},
	});

	useEffect(() => {
		setValue("email", currentUser.email);
		setValue("parentsFullName", currentUser.profile?.parentsFullName || "");
		setValue("parentsEmail", currentUser.profile?.parentsEmail || "");
		setValue("parentsCountryId", currentUser.profile?.parentsCountryId || "");
		setValue("parentsContact", currentUser.profile?.parentsContact || "");
	}, [currentUser, setValue]);

	const onSubmit = async (data) => {
		setIsLoading(true);

		await axios
			.post("/api/profile/parents", {
				...data,
				lang,
			})
			.then((response) => {
				toast.success(profileParentsDict.success);
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {});

		setIsLoading(false);
	};

	return (
		<div className="subnav-form">
			{impersonationType === ImpersonationType.User && <p>{profileParentsDict.pageTitleH}</p>}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-6">
						{impersonationType === ImpersonationType.Admin && (
							<Input
								id="email"
								type="email"
								label={profileParentsDict.email}
								disabled={true}
								register={register}
								errors={errors}
								watch={watch}
								setValue={setValue}
							/>
						)}
						<Input
							id="parentsFullName"
							label={profileParentsDict.parentName}
							helptext={profileParentsDict.parentNameH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileParentsDict.mandatoryInput,
								minLength: {
									value: 3,
									message: profileParentsDict.parentNameE1,
								},
							}}
							watch={watch}
							setValue={setValue}
						/>
					</div>
					<div className="col-md-6">
						<Input
							id="parentsEmail"
							label={profileParentsDict.parentEmail}
							helptext={profileParentsDict.parentEmailH}
							type="email"
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileParentsDict.mandatoryInput,
								pattern: {
									value: REGEX_EMAIL,
									message: profileParentsDict.parentEmailE1,
								},
							}}
							watch={watch}
							setValue={setValue}
						/>
						<ContactNumber
							idCC="parentsCountryId"
							idCN="parentsContact"
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							label={profileParentsDict.parentPhone}
							helptextCC={profileParentsDict.parentCountryCodeH}
							helptextCN={profileParentsDict.parentPhoneH}
							validationRulesCC={{
								required: profileParentsDict.mandatoryInput,
							}}
							validationRulesCN={{
								required: profileParentsDict.mandatoryInput,
								minLength: {
									value: 7,
									message: profileParentsDict.parentPhoneE1,
								},
								pattern: {
									value: REGEX_PHONE,
									message: profileParentsDict.parentPhoneE2,
								},
							}}
							lang={lang}
							required={true}
							register={register}
							errors={errors}
							watch={watch}
							setValue={setValue}
						/>
					</div>
					<div className="col-12">
						{impersonationType === ImpersonationType.User && (
							<button type="submit" disabled={isLoading}>
								{isLoading
									? profileParentsDict.pleaseWait
									: profileParentsDict.updateBtn}
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default ParentProfileForm;
