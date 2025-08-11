import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/libs/prismadb";

export async function getCurrentSession() {
	// TODO: Implement NEXTAUTH_URL=http://localhost:3000 in .env file
	return await getServerSession(authOptions);
}

export async function getCurrentUser() {
	try {
		const session = await getCurrentSession();

		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
			include: {
				profile: true,
				timezone: true,
				favourites: true,
			},
		});

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (error) {
		return null;
	}
}
