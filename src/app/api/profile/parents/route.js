import prisma from "@/libs/prismadb";
import { Gender, Role } from "@prisma/client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { REGEX_EMAIL, REGEX_PHONE } from "@/libs/constants";

export async function POST(request) {
	// post body
	// {
	// email: 'bhallav25@teacher.com',
	// parentsFullName: "Parent's Full Name",
	// parentsEmail: 'vikrambmbhalla@gmail.com',
	// parentsCountryId: '1',
	// parentsContact: '631778589',
	// lang: 'en'
	// }

	const body = await request.json();
	const email = body.email ?? "";
	const parentsFullName = body.parentsFullName ?? "";
	const parentsEmail = body.parentsEmail ?? "";
	const parentsCountryId = body.parentsCountryId ?? "";
	const parentsContact = body.parentsContact ?? "";
	const lang = body.lang ?? "en";
	const dict = await getDictionary(lang);

	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, dict.errors.noUser);
	}

	try {
		// standard validations - same as on the UI
		if (!email) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.errors.noEmail);
		} else if (!parentsFullName || parentsFullName.length < 3) {
			return apiResponse(
				APIStatus.BAD_REQUEST,
				dict.profileParents.parentNameE1
			);
		} else if (!parentsEmail || !REGEX_EMAIL.test(parentsEmail)) {
			return apiResponse(
				APIStatus.BAD_REQUEST,
				dict.profileParents.parentEmailE1
			);
		} else if (!parentsCountryId || !parentsContact) {
			return apiResponse(
				APIStatus.BAD_REQUEST,
				dict.profileParents.parentPhoneE3
			);
		} else if (parentsContact && parentsContact.length < 7) {
			return apiResponse(
				APIStatus.BAD_REQUEST,
				dict.profileParents.parentPhoneE1
			);
		} else if (parentsContact && !REGEX_PHONE.test(parentsContact)) {
			return apiResponse(
				APIStatus.BAD_REQUEST,
				dict.profileParents.parentPhoneE2
			);
		}

		// create profile if it does not exist; otherwise update it
		if (currentUser.profile) {
			await prisma.Profile.update({
				where: { userId: currentUser.id },
				data: {
					parentsFullName: parentsFullName,
					parentsEmail: parentsEmail,
					parentsCountryId: parseInt(parentsCountryId),
					parentsContact: parentsContact,
				},
			});
		} else {
			await prisma.Profile.create({
				data: {
					userId: currentUser.id,
					parentsFullName: parentsFullName,
					parentsEmail: parentsEmail,
					parentsCountryId: parseInt(parentsCountryId),
					parentsContact: parentsContact,
				},
			});
		}

		return apiResponse(APIStatus.OK, dict.profileParents.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
