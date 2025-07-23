"use client";

import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { UploadType } from "@/libs/types";

// REMOVEME: This control is not used and can be removed
const uploadPreset = process.env.NEXT_CLOUDINARY_PRESET;

const ImageUpload = ({ onChange, value, uploadType, label, invalidSizeLabel }) => {
	const handleUpload = useCallback(
		(result) => {
			if (
				uploadType === UploadType.Image &&
				(result.info.width > 200 || result.info.height > 200)
			) {
				toast.error(invalidSizeLabel);
				return;
			}

			onChange(result.info.secure_url);
		},
		[onChange, uploadType, invalidSizeLabel]
	);

	return (
		<div>
			<CldUploadWidget
				onSuccess={handleUpload}
				uploadPreset={uploadPreset}
				options={{
					maxFiles: 1,
					sources: ["local", "url", "camera", "dropbox", "google_drive"], // Excluded unwanted sources
					cropping: uploadType === UploadType.Image, // cropping allowed only for images
					clientAllowedFormats: uploadType,
				}}
				showPoweredBy={false}
			>
				{({ open }) => {
					return (
						<>
							<div onClick={() => open?.apply()} className="img-thumbnail mb-3">
								<div
									className="text-center"
									style={{ cursor: "pointer", whiteSpace: "pre-line" }}
								>
									{label}
								</div>

								{value && (
									<div className="text-center position-relative mb-3">
										{value.endsWith(".zip") ? (
											<Link href={value} target="_blank">
												<i
													className="bx bxs-file"
													style={{
														fontSize: "100px",
														textAlign: "center",
													}}
												></i>
											</Link>
										) : (
											<div
												style={{
													position: "relative",
													width: "100%",
													height: "200px",
												}}
											>
												<Image
													src={value}
													alt="selected-image"
													fill
													style={{ objectFit: "contain" }}
													priority={false}
												/>
											</div>
										)}
									</div>
								)}
							</div>
						</>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
