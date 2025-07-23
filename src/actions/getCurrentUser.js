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

export async function getUserById(id) {
	// gets the user by ID, used only Admin screens (Admin mode)
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
			include: {
				profile: true,
				timezone: true,
			},
		});

		if (!user) {
			return null;
		}

		return user;
	} catch (error) {
		return null;
	}
}
