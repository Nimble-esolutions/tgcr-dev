import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { REGEX_EMAIL } from "@/libs/constants";
import { sendTemporaryPassword } from "@/utils/mailer";
import { apiResponse, APIStatus } from "@/utils/apiResponse";

const generatePassword = () => {
	// password complexity is considered in this; 12 character password is generated
	// "Password must be at least 8 characters, with at least one upper case character, one lower case character, one numeric character, and one symbol"
	const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
	const numericChars = "0123456789";
	const symbolChars = "!@#$%^&*()";
	const allChars = upperCaseChars + lowerCaseChars + numericChars + symbolChars;

	let newPassword = "";
	newPassword += upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length));
	newPassword += lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length));
	newPassword += numericChars.charAt(Math.floor(Math.random() * numericChars.length));
	newPassword += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));

	for (let i = 4; i < 12; i++) {
		newPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
	}

	return newPassword
		.split("")
		.sort(() => 0.5 - Math.random())
		.join("");
};

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
			return apiResponse(APIStatus.BAD_REQUEST, dict.forgotPassword.unregisteredUser);
		} else if (!user.emailConfirmed) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.forgotPassword.unverifiedEmail);
		} else if (!user.isActive) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.forgotPassword.disabledUser);
		} else {
			// all checks completed
			// generate password > hash it > store in db > send email with unhashed password
			const tempPassword = generatePassword();
			const hashedPassword = await bcrypt.hash(tempPassword, 12);

			await prisma.User.update({
				where: {
					email: email,
				},
				data: {
					hashedPassword: hashedPassword,
					updatedOn: new Date(),
				},
			});

			await sendTemporaryPassword(email, tempPassword, lang);
		}

		return apiResponse(APIStatus.OK, dict.forgotPassword.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
