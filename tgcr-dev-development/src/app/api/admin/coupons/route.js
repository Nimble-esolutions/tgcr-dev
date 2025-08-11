import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request) {
	const body = await request.json();
	const { code, discount } = body;

	if (code == "") {
		return NextResponse.json(
			{
				message: "code is required!",
			},
			{ status: 404 }
		);
	} else if (discount == "") {
		return NextResponse.json(
			{
				message: "discount is required!",
			},
			{ status: 404 }
		);
	}

	const coupon = await prisma.coupon.findFirst({
		where: {
			code: code,
		},
	});
	if (coupon) {
		return NextResponse.json(
			{ message: "Coupon already exist." },
			{ status: 402 }
		);
	}

	await prisma.coupon.create({
		data: {
			code,
			discount: parseFloat(discount),
		},
	});

	return NextResponse.json(
		{ message: "Coupon created successfully." },
		{ status: 200 }
	);
}
