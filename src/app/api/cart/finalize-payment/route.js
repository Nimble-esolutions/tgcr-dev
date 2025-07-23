import prisma from "@/libs/prismadb";
import { Role, OrderPaymentStatus } from "@prisma/client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { getDictionary } from "@/app/[lang]/dictionaries";

// Payment did not go through. Delete the order and lesson requests
export async function DELETE(request) {
	const body = await request.json();
	const paymentId = body.data.paymentId ?? "";
	const lang = body.data.lang ?? "en"; // Defaults to English
	const dict = await getDictionary(lang);

	// there will only be 1 order here with this paymentId
	const order = await prisma.Order.findMany({
		where: {
			paymentId: paymentId,
		},
	});

	try {
		if (order.length != 1) {
			// this should never happen
			return apiResponse(APIStatus.BAD_REQUEST, dict.checkoutCart.orderNotFoundE1);
		}

		await prisma.$transaction(async (prisma) => {
			// delete the LessonRequests
			await prisma.LessonRequest.deleteMany({
				where: {
					orderId: order[0].id,
				},
			});

			// delete Order
			await prisma.Order.delete({
				where: {
					id: order[0].id,
				},
			});
		});

		return apiResponse(APIStatus.OK, dict.checkoutCart.enrollmentDeleteOK);
	} catch (error) {
		// throw new Error(error);
		return apiResponse(APIStatus.BAD_REQUEST, error);
	}
}

// Payment OK. Update the order status
export async function POST(request) {
	const body = await request.json();
	const paymentIntent = body.data.paymentIntent ?? "";
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

	const order = await prisma.Order.findMany({
		where: {
			paymentId: paymentIntent.id,
		},
	});

	console.log({ paymentIntent, order });
	if (order.length != 1) {
		// this should never happen
		return apiResponse(APIStatus.BAD_REQUEST, dict.checkoutCart.orderNotFoundE1);
	}

	try {
		await prisma.Order.update({
			where: {
				id: order[0].id,
			},
			data: {
				paymentStatus: OrderPaymentStatus.Paid,
			},
		});

		return apiResponse(APIStatus.OK, dict.checkoutCart.success);
	} catch (error) {
		// throw new Error(error);
		return apiResponse(APIStatus.BAD_REQUEST, error);
	}
}
