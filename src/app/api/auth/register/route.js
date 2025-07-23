import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { Role } from "@prisma/client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { REGEX_PASSWORD, REGEX_EMAIL } from "@/libs/constants";
import { generateToken } from "@/utils/token";
import { sendVerifyEmailToken } from "@/utils/mailerZOHO";
import { apiResponse, APIStatus } from "@/utils/apiResponse";

export async function POST(request) {
	const body = await request.json();
	const email = body.email ?? "";
	const password = body.password ?? "";
	const selectedRole = body.selectedRole ?? Role.Student; // Default to "STUDENT"
	const hasAcceptedTnC = body.tnc ?? false; // Default to false
	const lang = body.lang ?? "en"; // Defaults to English
	const dict = await getDictionary(lang);

	try {
		// standard validations - same as on the UI
		if (!email || !REGEX_EMAIL.test(email)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.registerForm.emailE1);
		} else if (!password || !REGEX_PASSWORD.test(password)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.registerForm.passwordE1);
		} else if (!hasAcceptedTnC) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.registerForm.hasAcceptedE1);
		} else if (!Object.values(Role).includes(selectedRole)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.registerForm.roleE1);
		}

		// validate if email already exists
		const existingUser = await prisma.User.findUnique({
			where: {
				email: email,
			},
		});
		if (existingUser) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.registerForm.existingUserE1);
		}

		// all validations succeeded; create a new user
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await prisma.User.create({
			data: {
				email,
				hashedPassword,
				isInstructor: selectedRole === Role.Instructor ? true : false,
				role: selectedRole,
				hasAcceptedTnC,
				emailConfirmed: false,
			},
		});

		// generate a verification token and initiate verification email
		const token = generateToken(email);
		await sendVerifyEmailToken(email, token, lang);

		return NextResponse.json(user);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
