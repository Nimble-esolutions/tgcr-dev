"use client";

import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";

const uploadPreset = process.env.NEXT_CLOUDINARY_PRESET;

const VideoUpload = ({ onChange, value, label }) => {
	const handleUpload = useCallback(
		(result) => {
			onChange(result.info);
			// console.log(result);
		},
		[onChange]
	);

	return (
		<div className="form-group">
			<label className="form-label fw-semibold">{label}</label>
			<CldUploadWidget
				onUpload={handleUpload}
				uploadPreset={uploadPreset}
				options={{ maxFiles: 1 }}
				showPoweredBy={false}
				cropping={true}
			>
				{({ open }) => {
					return (
						<>
							<div
								onClick={() => open?.apply()}
								className="img-thumbnail mb-3"
							>
								<div className="text-center">
									Click to upload
									<div className="form-text">
										The demo file size less than 10 MB
									</div>
								</div>
							</div>

							{value &&
								(value.secure_url.endsWith(".mp4") ? (
									<div className="text-center position-relative mb-3">
										<video width="400" controls>
											<source
												src={value.secure_url}
												type="video/mp4"
											/>
											Your browser does not support HTML
											video.
										</video>
									</div>
								) : (
									<Link
										href={value.secure_url}
										target="_blank"
									>
										<i
											className="bx bxs-file"
											style={{
												fontSize: "100px",
												textAlign: "center",
											}}
										></i>
									</Link>
								))}
						</>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default VideoUpload;
