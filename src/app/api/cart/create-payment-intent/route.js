import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { generateUuid } from "@/utils/utils";
import { calculateTotal, generateBookingId } from "@/utils/cartUtils";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { Role, LessonRequestStatus, OrderPaymentStatus } from "@prisma/client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { LESSON_DURATION_MINUTES } from "@/libs/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	typescript: true,
	apiVersion: "2023-10-16",
});

export async function POST(request) {
	// request -> cart
	// [
	// 	{
	// 	  id: '66c844ce-05a2-13b8-1583-904266f86067',
	// 	  studentId: '8fe71386-0fe5-47b6-8cf9-d5ad68cd9082',
	// 	  teacherId: 'cb1de2ad-dc65-4cda-b24f-9b3c91262ac8',
	// 	  teacherName: 'Vikram Teacher',
	// 	  startTime: '2025-05-13T09:30:00.000Z',
	// 	  teacherClassLevelCostId: '15',
	// 	  price: '10.1',
	// 	  count: 1
	// 	}
	// ]

	const body = await request.json();
	const cart = body.data.cart ?? [];
	const lang = body.data.lang ?? "en"; // Defaults to English
	const dict = await getDictionary(lang);
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		// user not logged in
		return apiResponse(APIStatus.UNAUTHORIZED, dict.checkoutCart.unauthorizedE1);
	}
	if (!(currentUser.role === Role.Student)) {
		// only students can make the bookings
		return apiResponse(APIStatus.FORBIDDEN, dict.checkoutCart.forbiddenE1);
	}

	if (cart.length === 0) {
		// cart is empty
		return apiResponse(APIStatus.BAD_REQUEST, dict.checkoutCart.cartEmptyE1);
	}

	const payableAmount = calculateTotal(cart);
	const orderId = generateUuid(); // Get UUID() - this is hard to read
	const bookingId = generateBookingId(); // Get a randomly generated booking ID - this is readable format

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Number(payableAmount) * 100,
			currency: "EUR",
			metadata: {
				studentId: currentUser.id,
				bookingId: bookingId,
				orderId: orderId,
			},
		});
		console.log({ cart, paymentIntent });

		if (paymentIntent) {
			// store each of the lessonRequest in LessonRequest table
			// header is stored in Order table
			await prisma.$transaction(async (prisma) => {
				// create single Order
				await prisma.Order.create({
					data: {
						id: orderId,
						orderNumber: bookingId,
						studentId: currentUser.id,
						price: Number(payableAmount),
						paymentId: paymentIntent.id,
						paymentStatus: OrderPaymentStatus.Pending,
						paymentVia: "Stripe",
					},
				});

				// create multiple LessonRequests
				for (const lessonRequest of cart) {
					const startDate = new Date(lessonRequest.startTime);
					const endDate = new Date(startDate.getTime() + LESSON_DURATION_MINUTES * 60000);

					await prisma.LessonRequest.create({
						data: {
							studentId: currentUser.id,
							orderId: orderId,
							instructorId: lessonRequest.teacherId,
							requestedStart: startDate,
							requestedEnd: endDate,
							remarks: "", // TODO: Request user to add remarks and pass it here
							teacherClassLevelCostId: lessonRequest.teacherClassLevelCostId,
							status: LessonRequestStatus.Requested,
						},
					});
				}
			});
		}

		return apiResponse(APIStatus.OK, paymentIntent);
	} catch (error) {
		//throw new Error(error);
		return apiResponse(APIStatus.BAD_REQUEST, error);
	}
}
