import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { REGEX_PASSWORD, REGEX_EMAIL } from "@/libs/constants";
import { generateToken } from "@/utils/token";
import { sendVerifyEmailToken } from "@/utils/mailer";
import { apiResponse, APIStatus } from "@/utils/apiResponse";

export async function POST(request) {
	const body = await request.json();
	const email = body.email ?? "";
	const lang = body.lang ?? "en"; // Defaults to English
	const dict = await getDictionary(lang);

	try {
		// standard validations - same as on the UI
		if (!email || !REGEX_EMAIL.test(email)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.registerForm.emailE1);
		}

		// validate if email exists
		const user = await prisma.User.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.resendVerifyEmail.unregisteredUser);
		} else if (!user.isActive) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.resendVerifyEmail.disabledUser);
		} else {
			// generate a verification token and initiate verification email
			const token = generateToken(email);
			await sendVerifyEmailToken(email, token, lang);
		}

		return apiResponse(APIStatus.OK, dict.resendVerifyEmail.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
