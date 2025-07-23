"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/FormHelpers/Input";
import Select from "@/components/FormHelpers/Select";
import SelectMulti from "@/components/FormHelpers/SelectMulti";
import TextArea from "@/components/FormHelpers/TextArea";
import { LookupTable, ImpersonationType } from "@/libs/types";
import { REGEX_LINKEDIN, REGEX_3WORDS, PROFILE_BIO_MINWORDS } from "@/libs/constants";
import { countStripHtmlWords } from "@/utils/utils";

const ExperienceForm = ({
	lang,
	currentUser,
	teachingExperience,
	impersonationType,
	profileExperienceDict,
}) => {
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
			linkedin: "",
			bioTitle: "",
			bio: "",
			nativeLanguage: "",
			teacherEducationalQualificationId: "",
			teacherExperienceLevelId: "",
			teacherEducationalBoardList: "",
			subjectList: "",
			instructionMediumList: "",
			lang: "en",
		},
	});

	useEffect(() => {
		setValue("email", currentUser.email);
		setValue("linkedin", currentUser.profile?.linkedin || "");
		setValue("bioTitle", currentUser.profile?.bioTitle || "");
		setValue("bio", currentUser.profile?.bio || "");
		setValue("nativeLanguage", currentUser.profile?.nativeLanguage || "");
		setValue(
			"teacherEducationalQualificationId",
			teachingExperience.teacherEducationalQualifications[0]?.educationalQualificationId || ""
		);
		setValue(
			"teacherExperienceLevelId",
			teachingExperience.teacherExperienceLevels[0]?.experienceLevelId || ""
		);
		// collect all the educationalBoardIds and set it for display
		const educationalBoardIds = teachingExperience.teacherEducationalBoards.map(
			(board) => board.educationalBoardId
		);
		setValue("teacherEducationalBoardList", educationalBoardIds || "");
		setValue(
			"subjectList",
			(currentUser.profile?.subjects ?? "").split(";").map((subject) => subject.trim()) || ""
		);
		setValue(
			"instructionMediumList",
			(currentUser.profile?.instructionLanguages || "")
				.split(";")
				.map((language) => language.trim()) || ""
		);
	}, [currentUser, teachingExperience, setValue]);

	const [educationalQualifications, setEducationalQualifications] = useState([]);
	const [experienceLevels, setExperienceLevels] = useState([]);
	const [educationalBoards, setEducationalBoards] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [instructionMediums, setInstructionMediums] = useState([]);

	useEffect(() => {
		const fetchEducationalQualification = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.EducationalQualification,
				},
			});
			setEducationalQualifications(
				response.data.map((eduq) => ({
					key: eduq.id,
					value: eduq.id,
					label: eduq.name,
				}))
			);
		};

		const fetchExperienceLevels = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.ExperienceLevel,
				},
			});
			setExperienceLevels(
				response.data.map((expl) => ({
					key: expl.id,
					value: expl.id,
					label: expl.name,
				}))
			);
		};

		const fetchEducationalBoards = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.EducationalBoard,
				},
			});
			setEducationalBoards(
				response.data.map((board) => ({
					key: board.id,
					value: board.id,
					label: board.name,
				}))
			);
		};

		const fetchSubjects = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.Subject,
				},
			});
			setSubjects(
				response.data.map((subject) => ({
					key: subject.id,
					value: subject.name,
					label: subject.name,
				}))
			);
		};

		const fetchLanguages = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.InstructionMedium,
				},
			});

			setInstructionMediums(
				response.data.map((language) => ({
					key: language.id,
					value: language.name,
					label: language.name,
				}))
			);
		};

		setIsLoading(true);
		fetchEducationalQualification();
		fetchExperienceLevels();
		fetchEducationalBoards();
		fetchSubjects();
		fetchLanguages();
		setIsLoading(false);
	}, [lang]);

	const handleBlur = (e) => {
		// handling the blur only for the linkedin control
		// appending linkedin.com if the user has not done this.
		const formatLinkedInURL = (url) => {
			if (!url.startsWith("https://www.linkedin.com/")) {
				return `https://www.linkedin.com/${url.replace(/^\/+/, "")}`;
			}
			return url;
		};

		const formattedValue = formatLinkedInURL(e.target.value);
		setValue(e.target.id, formattedValue);
	};

	const onSubmit = async (data) => {
		setIsLoading(true);

		await axios
			.post("/api/profile/experience", {
				...data,
				lang,
			})
			.then((response) => {
				toast.success(profileExperienceDict.success);
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
				<p>{profileExperienceDict.pageTitleH}</p>
			)}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-6">
						{impersonationType === ImpersonationType.Admin && (
							<Input
								id="email"
								type="email"
								label={profileExperienceDict.email}
								disabled={true}
								register={register}
								errors={errors}
								watch={watch}
								setValue={setValue}
							/>
						)}
						<Input
							id="linkedin"
							label={profileExperienceDict.linkedin}
							helptext={profileExperienceDict.linkedinH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileExperienceDict.mandatoryInput,
								pattern: {
									value: REGEX_LINKEDIN,
									message: profileExperienceDict.linkedinE1,
								},
							}}
							watch={watch}
							setValue={setValue}
							onBlur={handleBlur}
						/>
						<Input
							id="bioTitle"
							label={profileExperienceDict.profileTitle}
							helptext={profileExperienceDict.profileTitleH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileExperienceDict.mandatoryInput,
								pattern: {
									value: REGEX_3WORDS,
									message: profileExperienceDict.profileTitleE1,
								},
							}}
							watch={watch}
							setValue={setValue}
						/>
						<TextArea
							id="bio"
							label={profileExperienceDict.introduction}
							helptext={profileExperienceDict.introductionH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								validate: (value) =>
									countStripHtmlWords(value) >= PROFILE_BIO_MINWORDS ||
									profileExperienceDict.introductionE1.replace(
										"{number}",
										PROFILE_BIO_MINWORDS
									),
							}}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="nativeLanguage"
							label={profileExperienceDict.nativeLanguage}
							helptext={profileExperienceDict.nativeLanguageH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileExperienceDict.mandatoryInput,
							}}
							required={true}
							displayOptions={instructionMediums} // same source as instruction mediums
							watch={watch}
							setValue={setValue}
						/>
					</div>
					<div className="col-md-6">
						<Select
							id="teacherEducationalQualificationId"
							label={profileExperienceDict.educationalQualification}
							helptext={profileExperienceDict.educationalQualificationH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileExperienceDict.mandatoryInput,
							}}
							required={true}
							displayOptions={educationalQualifications}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="teacherExperienceLevelId"
							label={profileExperienceDict.teachingExperience}
							helptext={profileExperienceDict.teachingExperienceH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileExperienceDict.mandatoryInput,
							}}
							required={true}
							displayOptions={experienceLevels}
							watch={watch}
							setValue={setValue}
						/>
						<SelectMulti
							id="teacherEducationalBoardList"
							label={profileExperienceDict.educationalBoard}
							helptext={profileExperienceDict.educationalBoardH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							displayOptions={educationalBoards}
							validationRules={{
								required: profileExperienceDict.educationalBoardE1,
							}}
							required={true}
							watch={watch}
							setValue={setValue}
						/>
						<SelectMulti
							id="subjectList"
							label={profileExperienceDict.subjects}
							helptext={profileExperienceDict.subjectsH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							displayOptions={subjects}
							validationRules={{
								required: profileExperienceDict.subjectsE1,
							}}
							watch={watch}
							setValue={setValue}
						/>
						<SelectMulti
							id="instructionMediumList"
							label={profileExperienceDict.instruction}
							helptext={profileExperienceDict.instructionH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							displayOptions={instructionMediums}
							validationRules={{
								required: profileExperienceDict.instructionE1,
							}}
							watch={watch}
							setValue={setValue}
						/>
					</div>
				</div>
				<div className="col-12">
					{impersonationType === ImpersonationType.User && (
						<button type="submit" disabled={isLoading}>
							{isLoading
								? profileExperienceDict.pleaseWait
								: profileExperienceDict.updateBtn}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default ExperienceForm;
