import { getCurrentUser } from "../getCurrentUser";
import prisma from "@/libs/prismadb";
import { redirect } from "next/navigation";

export async function getCategories() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		redirect("/");
	}

	try {
		const categories = await prisma.category.findMany({});

		return { categories };
	} catch (error) {
		console.error("Error fetching courses:", error);
	}
}
export async function getCategoryById(params) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		redirect("/");
	}

	const { catId } = params;

	try {
		const category = await prisma.category.findUnique({
			where: { id: parseInt(catId) },
		});

		return { category };
	} catch (error) {
		console.error("Error fetching courses:", error);
	}
}
