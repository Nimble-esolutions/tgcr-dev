import { Prisma } from "@prisma/client";
import prisma from "@/libs/prismadb";

export interface DashboardStats {
	students: number;
	activeStudents: number;
	validStudents: number;
	teachers: number;
	activeTeachers: number;
	validTeachers: number;
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
	// stats to be displayed on the admin dashboard
	// checks similar to student and teacher dashboard cards are executed here
	try {
		const result = (await prisma.$queryRawUnsafe(
			`
	  SELECT
		COUNT(CASE WHEN role = 'Student' THEN 1 END) AS students,
		COUNT(CASE WHEN role = 'Student' AND isActive = true THEN 1 END) AS activeStudents,
		COUNT(CASE WHEN u.role = 'Student' AND u.isActive = true AND u.firstName IS NOT NULL AND u.timezoneId IS NOT NULL 
			AND p.parentsFullName IS NOT NULL AND p.instructionLanguages IS NOT NULL THEN 1 END) AS validStudents,
		COUNT(CASE WHEN role = 'Instructor' THEN 1 END) AS teachers,
		COUNT(CASE WHEN role = 'Instructor' AND isActive = true THEN 1 END) AS activeTeachers,
		COUNT(CASE WHEN u.role = 'Instructor' AND u.isActive = true AND u.firstName IS NOT NULL AND u.timezoneId IS NOT NULL
			AND p.subjects IS NOT NULL THEN 1 END) AS validTeachers
	  FROM User u LEFT OUTER JOIN Profile p ON u.id = p.userId
	`
		)) as Array<{
			students: number;
			activeStudents: number;
			validStudents: number;
			teachers: number;
			activeTeachers: number;
			validTeachers: number;
		}>;

		if (!result || result.length === 0) return null;
		return result[0];
	} catch (error) {
		console.log("Error fetching dashboard stats:", error);
		return null;
	}
}
