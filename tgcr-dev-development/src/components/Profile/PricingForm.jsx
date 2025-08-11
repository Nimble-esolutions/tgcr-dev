"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/FormHelpers/Input";
import Checkbox from "../FormHelpers/Checkbox";
import { LookupTable } from "@/libs/types";
import { PROFILE_MAX_PRICE, REGEX_CURRENCY } from "@/libs/constants";

const PricingForm = ({ lang, currentUser, currentUserPricing, profilePricing }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	// classLevels contains all attributes required to build the view on the screen
	const [classLevels, setClassLevels] = useState([]);

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
			classLevels: "",
			lang: "en",
		},
	});

	useEffect(() => {
		const fetchClassLevels = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.TeacherClassLevel,
				},
			});

			// prep the class levels data using the currentUserPricing data before sending it
			setClassLevels(
				response.data.map((cl, index) => ({
					index: index,
					key: cl.id,
					value: cl.id,
					label: cl.name,
					// this is the value of TeacherClassLevelCost.id in the DB
					originalId:
						currentUserPricing.teacherClassLevelCosts.filter(
							(item) => item.classLevelId === cl.id
						)[0]?.id ?? "-1",
					// this is the value of selected flag as available in the DB
					originalSelected:
						currentUserPricing.teacherClassLevelCosts.filter(
							(item) => item.classLevelId === cl.id
						).length === 1
							? true
							: false,
					// this will be updated on the UI
					selected:
						currentUserPricing.teacherClassLevelCosts.filter(
							(item) => item.classLevelId === cl.id
						).length === 1
							? true
							: false,
					pricing: parseFloat(
						currentUserPricing.teacherClassLevelCosts.filter(
							(item) => item.classLevelId === cl.id
						)[0]?.costPerLesson ?? "0.00"
					).toFixed(2),
					// TODO: Currency handling
					currency:
						currentUserPricing.teacherClassLevelCosts.filter(
							(item) => item.classLevelId === cl.id
						)[0]?.currency ?? "EUR",
				}))
			);
		};

		setIsLoading(true);
		setValue("email", currentUser.email);
		fetchClassLevels();
		setIsLoading(false);
	}, [currentUser, currentUserPricing, lang, setValue]);

	useEffect(() => {
		classLevels.forEach((clRow, index) => {
			setValue(`checkbox-${clRow.index}`, clRow.selected);
			setValue(`textbox-${clRow.index}`, clRow.pricing);
		});
	}, [classLevels, setValue]);

	const handleChange = (e) => {
		// handling the click of the checkbox to enable/disable the textboxes
		// as well as the change of values in the text boxes
		const controlName = e.target.id.split("-")[0]; // extract the control name
		const index = parseInt(e.target.id.split("-")[1]); // Extract the index from the id

		if (controlName === "checkbox") {
			// if (!e.target.checked) {
			// 	// remove the value when its unchecked
			// 	const textbox = document.getElementById(
			// 		`textbox-${index.toString()}`
			// 	);
			// 	if (textbox) {
			// 		setValue(textbox, "0.00");
			// 	}
			// }
			// toggle the checkbox value
			setClassLevels((prevList) =>
				prevList.map((clRow, idx) =>
					idx === index
						? {
								...clRow,
								selected: !clRow.selected,
						  }
						: clRow
				)
			);
		} else {
			// update the textbox value
			setClassLevels((prevList) =>
				prevList.map((clRow, idx) =>
					idx === index
						? {
								...clRow,
								pricing: e.target.value, //parseFloat(e.target.value).toFixed(2),
						  }
						: clRow
				)
			);
		}
	};

	const handleBlur = (e) => {
		// handling the blur to format the currrency values
		const formatCurrency = (value) => {
			if (isNaN(value) || value.trim() === "") {
				return "0.00";
			} else {
				return parseFloat(value).toFixed(2);
			}
		};

		const formattedValue = formatCurrency(e.target.value);
		setValue(e.target.id, formattedValue);
	};

	const onSubmit = async (data) => {
		if (classLevels.filter((item) => item.selected === true).length === 0) {
			// just check if there is a record to send to the DB or not
			toast.error(profilePricing.pricePerLessonE4);
			return;
		}
		if (
			classLevels.filter(
				(item) => item.selected === true && parseFloat(item.pricing).toFixed(2) === "0.00"
			).length > 0
		) {
			// some of the class levels are selected but have invalid pricing
			toast.error(profilePricing.pricePerLessonE5);
			return;
		}

		setIsLoading(true);

		await axios
			.post("/api/profile/pricing", {
				...data,
				lang,
				classLevels,
			})
			.then((response) => {
				toast.success(profilePricing.success);
				router.refresh();
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {});

		setIsLoading(false);
	};

	return (
		<div className="subnav-form">
			<p>{profilePricing.pageTitleH}</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-6">
						<Input
							id="email"
							type="email"
							label={profilePricing.email}
							disabled={true}
							register={register}
							errors={errors}
							watch={watch}
							setValue={setValue}
						/>
						{/* header row */}
						<div
							style={{
								// position: "relative",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								borderBottom: "1px solid #ccc",
								marginBottom: "10px",
							}}
						>
							<label className="input-label">{profilePricing.grade}</label>
							<label className="input-label">{profilePricing.pricePerLesson}</label>
						</div>
						{/* details */}
						{classLevels.map((clRow) => (
							<div
								key={`row-${clRow.index}`}
								style={{
									// position: "relative",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Checkbox
									key={`checkbox-${clRow.index}`}
									id={`checkbox-${clRow.index}`}
									label={clRow.label}
									helptext={""}
									disabled={isLoading}
									register={register}
									errors={errors}
									validationRules={{}}
									watch={watch}
									setValue={setValue}
									clearErrors={clearErrors}
									onChange={handleChange}
								/>
								<Input
									key={`textbox-${clRow.index}`}
									id={`textbox-${clRow.index}`}
									label={""}
									labelShow={false}
									type="text"
									helptext={"0.00"}
									disabled={isLoading ? true : !clRow.selected}
									register={register}
									errors={errors}
									validationRules={{
										pattern: {
											value: REGEX_CURRENCY,
											message: profilePricing.pricePerLessonE1,
										},
										max: {
											value: PROFILE_MAX_PRICE,
											message: profilePricing.pricePerLessonE2,
										},
									}}
									watch={watch}
									setValue={setValue}
									onBlur={handleBlur}
									onChange={handleChange}
									alignRight={true}
								/>
							</div>
						))}
					</div>
					<div className="col-md-6"></div>
				</div>
				<div className="col-12">
					<button type="submit" disabled={isLoading}>
						{isLoading ? profilePricing.pleaseWait : profilePricing.updateBtn}
					</button>
				</div>
			</form>
		</div>
	);
};

export default PricingForm;
