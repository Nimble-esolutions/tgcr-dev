import prisma from "@/libs/prismadb";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request) {
	// post body
	// {
	// email: 'bhallav25@teacher.com',
	// countryId: '2',
	// timezoneId: '2',
	// lang: 'en'
	// }

	const body = await request.json();
	const email = body.email ?? "";
	const countryId = body.countryId ?? "";
	const timezoneId = body.timezoneId ?? "";
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
		} else if (currentUser.isInstructor && !countryId) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileLocation.countryE1);
		} else if (!timezoneId) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.profileLocation.timezoneE1);
		}

		// all validations succeeded; update the user
		const user = await prisma.User.update({
			where: { id: currentUser.id },
			data: {
				countryId: parseInt(countryId),
				timezoneId: parseInt(timezoneId),
			},
		});

		return apiResponse(APIStatus.OK, dict.profileLocation.success);
	} catch (error) {
		//return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error);
		throw new Error(error);
	}
}
