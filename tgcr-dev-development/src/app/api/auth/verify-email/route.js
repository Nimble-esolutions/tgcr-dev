import prisma from "@/libs/prismadb";
import { decodeToken, verifyToken } from "@/utils/token";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { generateToken } from "@/utils/token";
import { sendVerifyEmailToken } from "@/utils/mailer";

export async function POST(request) {
	const body = await request.json();
	const { token = "", lang = "en" } = body;
	const dict = await getDictionary(lang);

	try {
		// Verify the token
		const email = verifyToken(token);
		if (!email) {
			// Token is invalid or expired. Just try to decode whether email can be extracted
			const decodedEmail = decodeToken(token);
			if (!decodedEmail) {
				// No email. Token is just invalid.
				return apiResponse(APIStatus.BAD_REQUEST, dict.verifyEmail.invalidToken);
			}

			// Email address valid; only token has expired
			// send the email with token again and provide a message to this effect
			const newToken = generateToken(decodedEmail);
			await sendVerifyEmailToken(decodedEmail, newToken, lang);
			return apiResponse(APIStatus.BAD_REQUEST, dict.verifyEmail.expiredToken);
		}

		// Token verification successful (both email and token are valid). Find the user and mark as verified
		const existingUser = await prisma.User.findUnique({
			where: {
				email: email,
			},
		});
		if (!existingUser) {
			// ideally, this should never happen
			return apiResponse(APIStatus.BAD_REQUEST, dict.verifyEmail.userNotFound);
		} else {
			await prisma.User.update({
				where: {
					email: email,
				},
				data: {
					emailConfirmed: true,
					emailConfirmedOn: new Date(),
					updatedOn: new Date(),
				},
			});
		}

		return apiResponse(APIStatus.OK, dict.verifyEmail.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
