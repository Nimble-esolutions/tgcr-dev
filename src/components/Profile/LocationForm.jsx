"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/FormHelpers/Input";
import Select from "@/components/FormHelpers/Select";
import { LookupTable } from "@/libs/types";

const LocationForm = ({ lang, currentUser, profileLocation }) => {
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
			countryId: "",
			timezoneId: "",
			lang: "en",
		},
	});

	useEffect(() => {
		setValue("email", currentUser.email);
		setValue("countryId", currentUser.countryId);
		setValue("timezoneId", currentUser.timezoneId);
	}, [currentUser, setValue]);

	const [countries, setCountries] = useState([]);
	const [timezones, setTimezones] = useState([]);

	useEffect(() => {
		setIsLoading(true);

		const fetchCountries = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.Country,
				},
			});
			setCountries(
				response.data.map((country) => ({
					key: country.id,
					value: country.id,
					label: country.name,
				}))
			);
		};

		const fetchTimezones = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.Timezone,
				},
			});
			setTimezones(
				response.data.map((timezone) => ({
					key: timezone.id,
					value: timezone.id,
					label: `${timezone.name} (UTC ${timezone.utcOffset})`,
				}))
			);
		};

		fetchCountries();
		fetchTimezones();

		setIsLoading(false);
	}, [lang]);

	const onSubmit = async (data) => {
		setIsLoading(true);

		await axios
			.post("/api/profile/location", {
				...data,
				lang,
			})
			.then((response) => {
				toast.success(profileLocation.success);
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {});

		setIsLoading(false);
	};

	return (
		<div className="subnav-form">
			<p>{profileLocation.pageTitleH}</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					id="email"
					type="email"
					label={profileLocation.email}
					disabled={true}
					register={register}
					errors={errors}
					watch={watch}
					setValue={setValue}
				/>
				{currentUser.isInstructor && (
					<Select
						id="countryId"
						label={profileLocation.country}
						helptext={profileLocation.countryH}
						disabled={isLoading}
						register={register}
						errors={errors}
						displayOptions={countries}
						validationRules={{
							required: profileLocation.mandatoryInput,
						}}
						required={true}
						watch={watch}
						setValue={setValue}
					/>
				)}
				<Select
					id="timezoneId"
					label={profileLocation.timezone}
					helptext={profileLocation.timezoneH}
					disabled={isLoading}
					register={register}
					errors={errors}
					displayOptions={timezones}
					validationRules={{
						required: profileLocation.mandatoryInput,
					}}
					required={true}
					watch={watch}
					setValue={setValue}
				/>
				<button type="submit" disabled={isLoading}>
					{isLoading ? profileLocation.pleaseWait : profileLocation.updateBtn}
				</button>
			</form>
		</div>
	);
};

export default LocationForm;
