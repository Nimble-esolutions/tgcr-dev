import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(request, { params }) {
	const { couponId } = params;

	if (couponId == "") {
		return NextResponse.json(
			{
				message: "couponId is required!",
			},
			{ status: 404 }
		);
	}

	await prisma.coupon.delete({
		where: { id: parseInt(couponId) },
	});

	return NextResponse.json(
		{ message: "Coupon deleted successfully." },
		{ status: 200 }
	);
}
