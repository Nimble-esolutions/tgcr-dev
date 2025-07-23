import prisma from "@/libs/prismadb";
import { Role, User } from "@prisma/client";

export async function getUsers(role: Role): Promise<User[]> {
	// gets the current list of users in the specified role
	try {
		const users = await prisma.User.findMany({
			where: {
				role: role,
			},
			include: {
				profile: true,
			},
		});

		return users;
	} catch (error) {
		console.error("Error fetching users:", error);
		return [];
	}
}
