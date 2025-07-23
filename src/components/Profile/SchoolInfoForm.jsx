"use client";

import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/FormHelpers/Input";
import Select from "@/components/FormHelpers/Select";
import SelectMulti from "@/components/FormHelpers/SelectMulti";
import TextArea from "@/components/FormHelpers/TextArea";
import { LookupTable, ImpersonationType } from "@/libs/types";

// SchoolInfo form is only displayed for Students
// Students will only have one record in studentEducationalBoard and studentClassLevel
const SchoolInfoForm = ({
	lang,
	currentUser,
	currentUserSchoolInfo,
	impersonationType,
	profileSchoolingDict,
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
			educationalBoardId: "",
			gradeId: "",
			subjectList: "",
			bio: "", // this field is "abused" to store the student's remarks
			instructionMedium: "",
			lang: "en",
		},
	});

	useEffect(() => {
		setValue("email", currentUser.email);
		setValue(
			"educationalBoardId",
			currentUserSchoolInfo.studentEducationalBoard?.educationalBoardId || ""
		);
		setValue("gradeId", currentUserSchoolInfo.studentClassLevel?.classLevelId || "");
		setValue(
			"subjectList",
			currentUser.profile?.subjects?.split(";").map((subject) => subject.trim()) || ""
		);
		setValue("bio", currentUser.profile?.bio || "");
		setValue("instructionMedium", currentUser.profile?.instructionLanguages || "");
	}, [currentUser, currentUserSchoolInfo, setValue]);

	const [educationalBoards, setEducationalBoards] = useState([]);
	const [classLevels, setClassLevels] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [instructionMediums, setInstructionMediums] = useState([]);

	useEffect(() => {
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

		const fetchClassLevel = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.StudentClassLevel,
				},
			});
			setClassLevels(
				response.data.map((classLevel) => ({
					key: classLevel.id,
					value: classLevel.id,
					label: classLevel.name,
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
					value: subject.name, // note that id is not stored... but the actual language name
					label: subject.name,
				}))
			);
		};

		const fetchInstructionMediums = async () => {
			const response = await axios.get(`/api/lookup`, {
				params: {
					lang: lang,
					t: LookupTable.InstructionMedium,
				},
			});

			setInstructionMediums(
				response.data.map((language) => ({
					key: language.id,
					value: language.name, // note that id is not stored... but the actual language name
					label: language.name,
				}))
			);
		};

		setIsLoading(true);
		fetchEducationalBoards();
		fetchClassLevel();
		fetchSubjects();
		fetchInstructionMediums();
		setIsLoading(false);
	}, [lang]);

	const onSubmit = async (data) => {
		setIsLoading(true);

		await axios
			.post("/api/profile/school", {
				...data,
				lang,
			})
			.then((response) => {
				toast.success(profileSchoolingDict.success);
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
				<p>{profileSchoolingDict.pageTitleH}</p>
			)}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-6">
						{impersonationType === ImpersonationType.Admin && (
							<Input
								id="email"
								type="email"
								label={profileSchoolingDict.email}
								disabled={true}
								register={register}
								errors={errors}
								watch={watch}
								setValue={setValue}
							/>
						)}

						<Select
							id="educationalBoardId"
							label={profileSchoolingDict.educationalBoard}
							helptext={profileSchoolingDict.educationalBoardH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileSchoolingDict.mandatoryInput,
							}}
							required={true}
							displayOptions={educationalBoards}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="gradeId"
							label={profileSchoolingDict.grade}
							helptext={profileSchoolingDict.gradeH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileSchoolingDict.mandatoryInput,
							}}
							required={true}
							displayOptions={classLevels}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="instructionMedium"
							label={profileSchoolingDict.instruction}
							helptext={profileSchoolingDict.instructionH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileSchoolingDict.mandatoryInput,
							}}
							required={true}
							displayOptions={instructionMediums}
							watch={watch}
							setValue={setValue}
						/>
					</div>
					<div className="col-md-6">
						<TextArea
							id="bio"
							label={profileSchoolingDict.remarks}
							helptext={profileSchoolingDict.remarksH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							watch={watch}
							setValue={setValue}
						/>
						<SelectMulti
							id="subjectList"
							label={profileSchoolingDict.subjects}
							helptext={profileSchoolingDict.subjectsH}
							disabled={impersonationType === ImpersonationType.Admin || isLoading}
							register={register}
							errors={errors}
							validationRules={{
								required: profileSchoolingDict.subjectsE1,
								// minLength: {
								// 	value: 1,
								// 	message: profileSchoolingDict.subjectsE1,
								// },
							}}
							displayOptions={subjects}
							watch={watch}
							setValue={setValue}
						/>
					</div>
				</div>
				<div className="col-12">
					{impersonationType === ImpersonationType.User && (
						<button type="submit" disabled={isLoading}>
							{isLoading
								? profileSchoolingDict.pleaseWait
								: profileSchoolingDict.updateBtn}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default SchoolInfoForm;
