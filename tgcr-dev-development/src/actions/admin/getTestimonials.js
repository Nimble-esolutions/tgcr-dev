import prisma from "@/libs/prismadb";
import { redirect } from "next/navigation";

export async function getTestimonials() {
	try {
		const testimonials = await prisma.testimonial.findMany({});

		return { testimonials };
	} catch (error) {
		console.error("Error fetching courses:", error);
	}
}
export async function getTestimonialsById(params) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		redirect("/");
	}
	const { testId } = params;

	try {
		const testimonial = await prisma.testimonial.findUnique({
			where: { id: parseInt(testId) },
		});

		return { testimonial };
	} catch (error) {
		console.error("Error fetching courses:", error);
	}
}
