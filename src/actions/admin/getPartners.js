import prisma from "@/libs/prismadb";
import { redirect } from "next/navigation";

export async function getPartners() {
	try {
		const partners = await prisma.partner.findMany({});

		return { partners };
	} catch (error) {
		console.error("Error fetching courses:", error);
	}
}
