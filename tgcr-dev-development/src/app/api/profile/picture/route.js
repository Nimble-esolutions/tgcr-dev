import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import prisma from "@/libs/prismadb";
import { randomUUID } from "crypto";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { baseS3 } from "@/libs/constants";

export async function POST(request) {
	const formData = await request.formData();
	const file = formData.get("image");
	const lang = formData.get("lang") ?? "en";
	const dict = await getDictionary(lang);

	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, dict.errors.noUser);
	}

	if (!file || typeof file === "string") {
		return apiResponse(APIStatus.BAD_REQUEST, dict.profilePicture.selectedPictureE1);
	}

	try {
		// Upload to S3
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const fileExt = file.name.split(".").pop();
		const fileName = `${baseS3}/profile-pictures/${currentUser.id}_${randomUUID()}.${fileExt}`;

		const s3 = new S3Client({
			region: process.env.DO_S3_REGION,
			endpoint: process.env.DO_S3_ENDPOINT_ORIGIN,
			credentials: {
				accessKeyId: process.env.DO_S3_KEY_ID,
				secretAccessKey: process.env.DO_S3_SECRET,
			},
		});

		if (currentUser.image) {
			// Delete old image from S3 if it exists
			let currentFileName = currentUser.image.replace(process.env.DO_S3_ENDPOINT_CDN, "");
			if (currentFileName.startsWith("/")) currentFileName = currentFileName.slice(1);

			await s3.send(
				new DeleteObjectCommand({
					Bucket: process.env.DO_S3_BUCKET_NAME,
					Key: currentFileName,
				})
			);
		}
		await s3.send(
			new PutObjectCommand({
				Bucket: process.env.DO_S3_BUCKET_NAME,
				Key: fileName,
				Body: buffer,
				ContentType: file.type,
				ACL: "public-read",
			})
		);

		const imageUrl = `${process.env.DO_S3_ENDPOINT_CDN}/${fileName}`;

		// Update user
		await prisma.User.update({
			where: { id: currentUser.id },
			data: {
				image: imageUrl,
			},
		});

		return apiResponse(APIStatus.OK, dict.profilePicture.success);
	} catch (error) {
		throw new Error(error);
	}
}
