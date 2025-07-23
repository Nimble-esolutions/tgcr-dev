"use client";

import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/FormHelpers/Input";
import Select from "@/components/FormHelpers/Select";
import ContactNumber from "@/components/FormHelpers/ContactNumber";
import { REGEX_PHONE } from "@/libs/constants";
import { Gender } from "@prisma/client";
import { Role } from "@prisma/client";
import { ImpersonationType } from "@/libs/types";

const PersonalProfileForm = ({ lang, currentUser, impersonationType, profilePersonalDict }) => {
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
			firstName: "",
			middleName: "",
			lastName: "",
			name: "", // Display Name is stored here
			gender: Gender.Unknown,
			dob: "",
			phoneCountryId: "",
			phone: "",
			lang: "en",
		},
	});

	useEffect(() => {
		setValue("email", currentUser.email);
		setValue("firstName", currentUser.firstName ?? "");
		setValue("middleName", currentUser.middleName ?? "");
		setValue("lastName", currentUser.lastName ?? "");
		setValue("name", currentUser.name ?? "");
		setValue("gender", currentUser.gender);
		setValue("dob", currentUser.dob?.toISOString().split("T")[0] || "");
		setValue("phoneCountryId", currentUser.profile?.phoneCountryId || "");
		setValue("phone", currentUser.profile?.phone || "");
	}, [currentUser, setValue]);

	const genderOptions = Object.keys(Gender).map((key) => ({
		key: key,
		value: Gender[key],
		label: Gender[key],
	}));

	const handleNameChange = (e) => {
		// update the display name when first or last name changes
		if (e.target.id === "firstName" || e.target.id === "lastName") {
			setValue("name", `${watch("firstName")} ${watch("lastName")}`);
		}
	};

	const onSubmit = async (data) => {
		setIsLoading(true);

		await axios
			.post("/api/profile/personal", {
				...data,
				lang,
			})
			.then((response) => {
				toast.success(profilePersonalDict.success);
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {});

		setIsLoading(false);
	};

	return (
		<div className="subnav-form">
			{impersonationType === ImpersonationType.User && (
				<p>{profilePersonalDict.pageTitleH}</p>
			)}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-6">
						<Input
							id="email"
							type="email"
							label={profilePersonalDict.email}
							disabled={true}
							register={register}
							errors={errors}
							watch={watch}
							setValue={setValue}
						/>
						<Input
							id="firstName"
							label={profilePersonalDict.firstName}
							helptext={profilePersonalDict.firstNameH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							required={true}
							validationRules={{
								required: profilePersonalDict.mandatoryInput,
								minLength: {
									value: 3,
									message: profilePersonalDict.firstNameE1,
								},
							}}
							watch={watch}
							setValue={setValue}
							onChange={handleNameChange}
						/>
						<Input
							id="middleName"
							label={profilePersonalDict.middleName}
							helptext={profilePersonalDict.middleNameH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							watch={watch}
							setValue={setValue}
						/>
						<Input
							id="lastName"
							label={profilePersonalDict.lastName}
							helptext={profilePersonalDict.lastNameH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							required={true}
							validationRules={{
								required: profilePersonalDict.mandatoryInput,
								minLength: {
									value: 3,
									message: profilePersonalDict.lastNameE1,
								},
							}}
							watch={watch}
							setValue={setValue}
							onChange={handleNameChange}
						/>
					</div>
					<div className="col-md-6">
						<Input
							id="name"
							label={profilePersonalDict.displayName}
							helptext={profilePersonalDict.displayNameH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							required={true}
							validationRules={{
								required: profilePersonalDict.mandatoryInput,
								minLength: {
									value: 3,
									message: profilePersonalDict.displayNameE1,
								},
							}}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="gender"
							label={profilePersonalDict.gender}
							helptext={profilePersonalDict.genderH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							displayOptions={genderOptions}
							required={true}
							validationRules={{
								required: profilePersonalDict.mandatoryInput,
							}}
							watch={watch}
							setValue={setValue}
						/>
						<Input
							id="dob"
							label={profilePersonalDict.dob}
							helptext={profilePersonalDict.dobH}
							type="date"
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							required={true}
							validationRules={{
								required: profilePersonalDict.mandatoryInput,
								validate: {
									dobValidate: (value) => {
										const selectedDate = new Date(value);
										const yearsAgo4 = new Date();
										yearsAgo4.setFullYear(yearsAgo4.getFullYear() - 4);
										const yearsAgo16 = new Date();
										yearsAgo16.setFullYear(yearsAgo16.getFullYear() - 16);

										if (currentUser.role === Role.Student) {
											// student cannot be younger than 4 years old
											if (selectedDate >= yearsAgo4) {
												return profilePersonalDict.dobE1;
											}
										} else {
											// instructor and all other roles cannot be younger than 16 years old
											if (selectedDate >= yearsAgo16) {
												return profilePersonalDict.dobE2;
											}
										}
										return true;
									},
								},
							}}
							watch={watch}
							setValue={setValue}
						/>
						<ContactNumber
							idCC="phoneCountryId"
							idCN="phone"
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							label={profilePersonalDict.phone}
							helptextCC={profilePersonalDict.countryCodeH}
							helptextCN={profilePersonalDict.phoneH}
							required={true}
							validationRulesCC={{
								required: profilePersonalDict.mandatoryInput,
							}}
							validationRulesCN={{
								required: profilePersonalDict.mandatoryInput,
								minLength: {
									value: 7,
									message: profilePersonalDict.phoneE1,
								},
								pattern: {
									value: REGEX_PHONE,
									message: profilePersonalDict.phoneE2,
								},
							}}
							lang={lang}
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
									? profilePersonalDict.pleaseWait
									: profilePersonalDict.updateBtn}
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default PersonalProfileForm;
