import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { REGEX_PASSWORD } from "@/libs/constants";
import { apiResponse, APIStatus } from "@/utils/apiResponse";

export async function POST(request) {
	const body = await request.json();
	const email = body.email ?? "";
	const currentPassword = body.currentPassword ?? "";
	const newPassword = body.newPassword ?? "";
	const lang = body.lang ?? "en"; // Defaults to English
	const dict = await getDictionary(lang);

	try {
		// validate the current password
		if (!currentPassword) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePassword.currentPasswordE1);
		}
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePassword.emailE1);
		}
		const isCorrectPassword = await bcrypt.compare(currentPassword, user.hashedPassword);
		if (!isCorrectPassword) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePassword.currentPasswordE2);
		}

		// standard validations - same as on the UI
		if (!newPassword || !REGEX_PASSWORD.test(newPassword)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePassword.newPasswordE1);
		}

		// all validations succeeded; create a new user
		const hashedPassword = await bcrypt.hash(newPassword, 12);
		await prisma.User.update({
			where: {
				email: email,
			},
			data: {
				hashedPassword: hashedPassword,
				updatedOn: new Date(),
			},
		});

		return apiResponse(APIStatus.OK, dict.profilePassword.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
