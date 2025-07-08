"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import TextArea from "@/components/FormHelpers/TextArea";
import InputStar from "@/components/FormHelpers/InputStar.tsx";
import { toast } from "react-hot-toast";
import { LookupTable } from "@/libs/types";
import styles from "./css/FeedbackForm.module.css";

// collects the user feedback and stores it in the database
const FeedbackForm = ({ lang, currentUser, lessonId, feedbackDict }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [feedbackAttributes, setFeedbackAttributes] = useState([]);

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
			lang: lang,
			remarks: "",
			lessonId: lessonId, // this is the ID of the lesson for which feedback is being provided
		},
	});

	useEffect(() => {
		const fetchFeedbackAttributes = async () => {
			// fetch the feedback attributes from the API
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.FeedbackAttribute,
				},
			});

			setFeedbackAttributes(
				response.data.map((attr, index) => ({
					index: index,
					id: attr.id,
					key: attr.key,
					name: attr.name,
					desc: attr.desc,
					descDetail: attr.descDetail,
					userFeedback: "", // this is updated when the user clicks on the star
				}))
			);
		};

		setIsLoading(true);
		setValue("email", currentUser.email);
		fetchFeedbackAttributes();
		setIsLoading(false);
	}, [currentUser, lang, setValue]);

	const handleChange = (e) => {
		// handling the click of the <InputStar> and collecting the IDs which have been changed
		// this event is triggered from: id={`feedback-${attr.id}`}
		const controlName = e.target.id.split("-")[0]; // extract the control name
		const feedbackAttributeId = parseInt(e.target.id.split("-")[1]); // Extract the index from the id

		if (controlName === "feedback") {
			// update the feedbackAttributes state with the new userFeedback value
			setFeedbackAttributes((prevList) =>
				prevList.map((attr) =>
					attr.id === feedbackAttributeId
						? { ...attr, userFeedback: e.target.value }
						: attr
				)
			);
		}
	};

	const onSubmit = async (data) => {
		// find where the user provided feedback
		const providedFeedback = feedbackAttributes.filter((attr) => attr.userFeedback);
		if (providedFeedback.length === 0 && data.remarks.trim().length === 0) {
			toast.error(feedbackDict.noFeedback);
			return;
		}

		setIsLoading(true);

		await axios
			.post("/api/student/feedback", {
				...data,
				feedback: providedFeedback,
			})
			.then((response) => {
				toast.success(feedbackDict.success);
				router.refresh();
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {});
		router.push(`/${lang}/student/lessons/upcoming`);
		setIsLoading(false);
	};

	return (
		<div className={`${styles["feedback-card"]} subnav-form`}>
			<h4 className="mb-4">{feedbackDict.pageTitleH}</h4>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={`row ${styles["two-cols"]}`}>
					{feedbackAttributes.map((attr) => (
						<div key={`row-${attr.index}`}>
							<div className={styles["single-row"]}>
								<InputStar
									id={`feedback-${attr.id}`}
									label={attr.descDetail}
									labelShow={true}
									register={register}
									required={false}
									watch={watch}
									setValue={setValue}
									errors={errors}
									validationRules={{}}
									disabled={isLoading}
									alignRight={false}
									onChange={handleChange}
								/>
							</div>
						</div>
					))}
				</div>

				<TextArea
					id="remarks"
					label={feedbackDict.remarks}
					helptext={feedbackDict.remarksH}
					disabled={isLoading}
					register={register}
					errors={errors}
					validationRules={{}}
					watch={watch}
					setValue={setValue}
				/>

				<div className="col-12">
					<button type="submit" disabled={isLoading}>
						{isLoading ? feedbackDict.pleaseWait : feedbackDict.submitBtn}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FeedbackForm;
