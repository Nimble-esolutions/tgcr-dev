"use client";

import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { LookupTable } from "@/libs/types";
import { PROFILE_MAX_PRICE, SEARCH_QPARAMS } from "@/libs/constants";
import Input from "@/components/FormHelpers/Input";
import InputSlider from "../FormHelpers/InputSlider";
import Select from "@/components/FormHelpers/Select";

const TeacherSearchForm = ({ lang, teacherSearchDict }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [classLevels, setClassLevels] = useState([]);
	const [educationalBoards, setEducationalBoards] = useState([]);
	const [educationalQualifications, setEducationalQualifications] = useState([]);
	const [experienceLevels, setExperienceLevels] = useState([]);
	const [instructionMediums, setInstructionMediums] = useState([]);
	const [sortOptions, setSortOptions] = useState([]);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const qsSearchKeyword = searchParams.get(SEARCH_QPARAMS.SEARCH_KEYWORD);
	const qsClassLevel = searchParams.get(SEARCH_QPARAMS.CLASS_LEVEL);
	const qsPrice = searchParams.get(SEARCH_QPARAMS.PRICE);
	const qsEducationalBoard = searchParams.get(SEARCH_QPARAMS.EDUCATIONAL_BOARD);
	const qsEducationalQualification = searchParams.get(SEARCH_QPARAMS.EDUCATIONAL_QUALI);
	const qsExperienceLevel = searchParams.get(SEARCH_QPARAMS.EXPERIENCE_LEVEL);
	const qsInstructionMedium = searchParams.get(SEARCH_QPARAMS.INSTRUCTION_MED);
	const qsSortOrder = searchParams.get(SEARCH_QPARAMS.SORT_ORDER);

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
			searchKeyword: "",
			classLevel: "",
			price: PROFILE_MAX_PRICE,
			educationalBoard: "",
			educationalQualification: "",
			experienceLevel: "",
			instructionMedium: "",
			sort: "",
			page: 1,
			lang: "en",
		},
	});

	useEffect(() => {
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

		const fetchSortOptions = async () => {
			const options = [
				{ key: "priceLoHi", value: "priceLoHi", label: teacherSearchDict.priceLoHi },
				{ key: "priceHiLo", value: "priceHiLo", label: teacherSearchDict.priceHiLo },
				{ key: "ratingLoHi", value: "ratingLoHi", label: teacherSearchDict.ratingLoHi },
				{ key: "ratingHiLo", value: "ratingHiLo", label: teacherSearchDict.ratingHiLo },
			];
			setSortOptions(options);
		};

		setIsLoading(true);
		fetchClassLevel();
		fetchEducationalBoards();
		fetchEducationalQualification();
		fetchExperienceLevels();
		fetchLanguages();
		fetchSortOptions();
		setIsLoading(false);
	}, [lang, teacherSearchDict]);

	useEffect(() => {
		setValue("searchKeyword", qsSearchKeyword || "");
	}, [qsSearchKeyword, setValue]);

	useEffect(() => {
		setValue("classLevel", qsClassLevel || "");
	}, [qsClassLevel, setValue]);

	useEffect(() => {
		setValue("price", qsPrice || PROFILE_MAX_PRICE);
	}, [qsPrice, setValue]);

	useEffect(() => {
		setValue("educationalBoard", qsEducationalBoard || "");
	}, [qsEducationalBoard, setValue]);

	useEffect(() => {
		setValue("educationalQualification", qsEducationalQualification || "");
	}, [qsEducationalQualification, setValue]);

	useEffect(() => {
		setValue("experienceLevel", qsExperienceLevel || "");
	}, [qsExperienceLevel, setValue]);

	useEffect(() => {
		setValue("instructionMedium", qsInstructionMedium || "");
	}, [qsInstructionMedium, setValue]);

	useEffect(() => {
		setValue("sort", qsSortOrder || "");
	}, [qsSortOrder, setValue]);

	const onSubmit = async (data) => {
		const queryParams = new URLSearchParams({
			[SEARCH_QPARAMS.SEARCH_KEYWORD]: data.searchKeyword,
			[SEARCH_QPARAMS.CLASS_LEVEL]: data.classLevel,
			[SEARCH_QPARAMS.PRICE]: data.price,
			[SEARCH_QPARAMS.EDUCATIONAL_BOARD]: data.educationalBoard,
			[SEARCH_QPARAMS.EDUCATIONAL_QUALI]: data.educationalQualification,
			[SEARCH_QPARAMS.EXPERIENCE_LEVEL]: data.experienceLevel,
			[SEARCH_QPARAMS.INSTRUCTION_MED]: data.instructionMedium,
			[SEARCH_QPARAMS.SORT_ORDER]: data.sort,
			[SEARCH_QPARAMS.PAGE]: data.page,
		}).toString();
		router.push(pathname + "?" + queryParams);
	};

	return (
		<div className="subnav-form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-12">
						<div
							style={{
								// position: "relative",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<label className="input-label">
								{teacherSearchDict.searchCriteria}
							</label>
						</div>
						<Input
							id="searchKeyword"
							labelShow={false}
							label={teacherSearchDict.searchKeyword}
							helptext={teacherSearchDict.searchKeywordH}
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="classLevel"
							labelShow={false}
							label={teacherSearchDict.classLevel}
							helptext={teacherSearchDict.classLevelH}
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							displayOptions={classLevels}
							watch={watch}
							setValue={setValue}
						/>
						<InputSlider
							id="price"
							labelShow={true}
							label={teacherSearchDict.priceH}
							helptext={teacherSearchDict.priceH}
							minValue="0"
							maxValue="1000"
							stepValue="10"
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="educationalBoard"
							labelShow={false}
							label={teacherSearchDict.educationalBoard}
							helptext={teacherSearchDict.educationalBoardH}
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							displayOptions={educationalBoards}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="educationalQualification"
							labelShow={false}
							label={teacherSearchDict.educationalQualification}
							helptext={teacherSearchDict.educationalQualificationH}
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							displayOptions={educationalQualifications}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="experienceLevel"
							labelShow={false}
							label={teacherSearchDict.experienceLevel}
							helptext={teacherSearchDict.experienceLevelH}
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							displayOptions={experienceLevels}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="instructionMedium"
							labelShow={false}
							label={teacherSearchDict.instructionMedium}
							helptext={teacherSearchDict.instructionMediumH}
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							displayOptions={instructionMediums}
							watch={watch}
							setValue={setValue}
						/>
						<Select
							id="sort"
							labelShow={false}
							label={teacherSearchDict.sort}
							helptext={teacherSearchDict.sortH}
							disabled={isLoading}
							register={register}
							errors={errors}
							validationRules={{}}
							displayOptions={sortOptions}
							watch={watch}
							setValue={setValue}
						/>
						<button
							type="submit"
							title={teacherSearchDict.searchBtn}
							disabled={isLoading}
						>
							<i className="fas fa-search"></i>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default TeacherSearchForm;
