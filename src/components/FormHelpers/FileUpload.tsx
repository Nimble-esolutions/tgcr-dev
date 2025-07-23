"use client";

import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { UploadType } from "@/libs/types";
import { PROFILE_PICTURE_MAX_SIZE } from "@/libs/constants";
import styles from "./css/FileUpload.module.css";

interface FileUploadProps {
	onChange: (file: File) => void;
	value?: string;
	uploadType: (typeof UploadType)[keyof typeof UploadType];
	label: string;
	invalidSizeLabel: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
	onChange,
	value,
	uploadType,
	label,
	invalidSizeLabel,
}) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const acceptedFile = acceptedFiles[0];
			if (!acceptedFile) return;

			if (uploadType === UploadType.Image) {
				// Validate image size
				// const img = new window.Image();
				// img.src = URL.createObjectURL(acceptedFile);
				// img.onload = () => {
				// 	if (img.width > 200 || img.height > 200) {
				// 		toast.error(invalidSizeLabel);
				// 		return;
				// 	}
				// 	onChange(acceptedFile);
				// };
				if (acceptedFile.size > PROFILE_PICTURE_MAX_SIZE) {
					toast.error(invalidSizeLabel);
					return;
				}
				onChange(acceptedFile);
			} else {
				onChange(acceptedFile);
			}
		},
		[onChange, uploadType, invalidSizeLabel]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: uploadType === UploadType.Image ? { "image/*": [] } : { "application/zip": [] },
		maxFiles: 1,
	});

	return (
		<div>
			<div {...getRootProps()} className={`${styles["fileUpload"]} img-thumbnail mb-3`}>
				<input {...getInputProps()} />
				<div className={`${styles["fileUpload-label"]} text-center`}>{label}</div>
			</div>
		</div>
	);
};

export { FileUpload };
