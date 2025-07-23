import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request) {
	try {
		const body = await request.json();
		const { coupon } = body;

		if (coupon.coupon == "") {
			return NextResponse.json(
				{
					message: "Coupon value is required!",
				},
				{ status: 404 }
			);
		}

		const discount = await prisma.coupon.findUnique({
			where: { code: coupon },
		});
		// // console.log(discount);

		if (discount) {
			return NextResponse.json(
				{
					message: "Coupon code applied",
					discount,
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{
					message: "There is no any coupon code",
				},
				{ status: 422 }
			);
		}
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{
				message: "An error occurred.",
			},
			{ status: 500 }
		);
	}
}
