import { getCurrentUser } from "../getCurrentUser";
import prisma from "@/libs/prismadb";
import { redirect } from "next/navigation";

export async function getCoupons() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		redirect("/");
	}

	try {
		const coupons = await prisma.coupon.findMany({});

		return { coupons };
	} catch (error) {
		console.error("Error fetching courses:", error);
	}
}
