"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { set, useForm } from "react-hook-form";
import Input from "@/components/FormHelpers/Input";
import { FileUpload } from "@/components/FormHelpers/FileUpload";
import { UploadType, ImpersonationType } from "@/libs/types";

const PictureForm = ({ lang, currentUser, impersonationType, profilePictureDict }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [preview, setPreview] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

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
			email: currentUser.email,
			image: "",
			lang: "en",
		},
	});

	useEffect(() => {
		setValue("image", currentUser.image);
	}, [currentUser, setValue]);

	useEffect(() => {
		if (selectedFile) {
			const url = URL.createObjectURL(selectedFile);
			setPreview(url);
			return () => URL.revokeObjectURL(url);
		} else {
			setPreview(null);
		}
	}, [selectedFile]);

	const onImageChange = (file) => {
		setSelectedFile(file);
		setValue("image", file); // store file in form state
		clearErrors("image");
	};

	// const image = watch("image");
	// const setCustomValue = (id, value) => {
	// 	setValue(id, value, {
	// 		shouldDirty: true,
	// 		shouldTouch: true,
	// 		shouldValidate: true,
	// 	});
	// };

	const onSubmit = async (data) => {
		setIsLoading(true);

		const formData = new FormData();
		formData.append("image", selectedFile);
		formData.append("lang", lang);

		// if (!data.image) {
		// 	toast.error(profilePictureDict.selectedPictureE1);
		// 	setIsLoading(false);
		// 	return;
		// }

		await axios
			.post("/api/profile/picture", formData)
			.then((response) => {
				toast.success(profilePictureDict.success);
				router.refresh(); // required to refresh the picture on the page/header
			})
			.catch((error) => {
				toast.error(error.response?.data?.message || error.message);
			})
			.finally(() => {});

		setIsLoading(false);
	};
	return (
		<div className="subnav-form">
			{impersonationType === ImpersonationType.User && <p>{profilePictureDict.pageTitleH}</p>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-md-6">
						{impersonationType === ImpersonationType.Admin && (
							<Input
								id="email"
								type="email"
								label={profilePictureDict.email}
								disabled={true}
								register={register}
								errors={errors}
								watch={watch}
								setValue={setValue}
							/>
						)}
					</div>
				</div>
				<div className="row">
					<div className="col-2" style={{ textAlign: "center" }}>
						<Image
							src={currentUser.image ? currentUser.image : "/images/avatar.jpg"}
							width={200}
							height={200}
							alt={profilePictureDict.currentPicture}
							className="img-thumbnail mw-200px"
						/>
						<span style={{ display: "block" }}>
							{profilePictureDict.currentPicture}
						</span>
					</div>
					<div className="col-2" style={{ textAlign: "center" }}>
						{impersonationType === ImpersonationType.User && (
							// FileUpload is only displayed to the user; and not to the admin
							<FileUpload
								onChange={onImageChange}
								label={profilePictureDict.uploadPicH}
								invalidSizeLabel={profilePictureDict.selectedPictureE2}
								uploadType={UploadType.Image}
							/>
						)}
					</div>
					<div className="col-2" style={{ textAlign: "center" }}>
						{preview && (
							<>
								<Image
									src={preview}
									width={200}
									height={200}
									alt={profilePictureDict.selectedPicture}
									className="img-thumbnail mw-200px"
								/>
								<span style={{ display: "block" }}>
									{profilePictureDict.selectedPicture}
								</span>
							</>
						)}
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						{impersonationType === ImpersonationType.User && (
							<button type="submit" disabled={isLoading || !preview}>
								{isLoading
									? profilePictureDict.pleaseWait
									: profilePictureDict.uploadPicBtn}
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default PictureForm;
