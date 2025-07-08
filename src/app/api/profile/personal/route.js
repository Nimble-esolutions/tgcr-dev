import prisma from "@/libs/prismadb";
import { Gender, Role } from "@prisma/client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { REGEX_PHONE } from "@/libs/constants";

function dobValidate(value, role) {
	// checks the dob... same function as on the UI
	const selectedDate = new Date(value);
	const yearsAgo4 = new Date();
	yearsAgo4.setFullYear(yearsAgo4.getFullYear() - 4);
	const yearsAgo16 = new Date();
	yearsAgo16.setFullYear(yearsAgo16.getFullYear() - 16);

	if (role === Role.Student) {
		// student cannot be younger than 4 years old
		if (selectedDate >= yearsAgo4) {
			return false; //profilePersonal.dobE1;
		}
	} else {
		// instructor and all other roles cannot be younger than 16 years old
		if (selectedDate >= yearsAgo16) {
			return false; //profilePersonal.dobE2;
		}
	}
	return true;
}

export async function POST(request) {
	// post body
	// 	{
	//   email: 'bhallav25@teacher.com',
	//   firstName: 'Vikram',
	//   middleName: '',
	//   lastName: 'Teacher',
	//   name: 'Vikram Teacher',
	//   gender: 'Male',
	//   dob: '1977-02-04',
	//   phoneCountryId: '3',
	//   phone: '631778589',
	//   lang: 'en'
	// }

	const body = await request.json();
	const email = body.email ?? "";
	const firstName = body.firstName ?? "";
	const middleName = body.middleName ?? "";
	const lastName = body.lastName ?? "";
	const name = body.name ?? "";
	const gender = body.gender ?? Gender.Unknown;
	const dob = body.dob ?? "";
	const phoneCountryId = body.phoneCountryId ?? "";
	const phone = body.phone ?? "";
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
		} else if (!firstName || firstName.length < 3) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.firstNameE1);
		} else if (!lastName || lastName.length < 3) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.lastNameE1);
		} else if (!name || name.length < 3) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.displayNameE1);
		} else if (!Object.values(Gender).includes(gender)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.genderE1);
		} else if (!dob) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.dobE3);
		} else if (!dobValidate(dob, currentUser.role)) {
			// validate the date of birth
			return apiResponse(
				APIStatus.BAD_REQUEST,
				currentUser.role === Role.Student
					? dict.profilePersonal.dobE1
					: dict.profilePersonal.dobE2
			);
		} else if (!phoneCountryId || !phone) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.phoneE3);
		} else if (phone && phone.length < 7) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.phoneE1);
		} else if (phone && !REGEX_PHONE.test(phone)) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.phoneE2);
		}

		// validate if the display name is already taken
		const existingDisplayName = await prisma.User.findFirst({
			where: {
				name: name,
				email: { not: currentUser.email },
			},
		});
		if (existingDisplayName) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profilePersonal.existingDisplayNameE1);
		}

		// all validations succeeded; update the user
		const user = await prisma.User.update({
			where: { id: currentUser.id },
			data: {
				firstName,
				middleName: middleName === "" ? null : middleName,
				lastName: lastName === "" ? null : lastName,
				name,
				gender,
				dob: new Date(dob).toISOString(),
			},
		});

		// create profile if it does not exist; otherwise update it
		if (currentUser.profile) {
			await prisma.Profile.update({
				where: { userId: currentUser.id },
				data: {
					phoneCountryId: parseInt(phoneCountryId),
					phone,
				},
			});
		} else {
			await prisma.Profile.create({
				data: {
					userId: currentUser.id,
					phoneCountryId: parseInt(phoneCountryId),
					phone,
				},
			});
		}

		return apiResponse(APIStatus.OK, dict.profilePersonal.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
