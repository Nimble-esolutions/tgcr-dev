import prisma from "@/libs/prismadb";
import { NextResponse, NextRequest } from "next/server";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { apiResponse, APIStatus } from "@/utils/apiResponse";
import { LookupTable } from "@/libs/types";

// In-memory cache for lookup values with TTL (expires at 12:01 AM every day)
const lookupCache = new Map<string, any>();
let cacheExpiry: number = getNextExpiry();

function getNextExpiry(): number {
	const now = new Date();
	const next = new Date(now);
	next.setHours(0, 1, 0, 0); // 12:01 AM today
	if (now >= next) {
		next.setDate(next.getDate() + 1);
	}
	return next.getTime();
}

function isCacheExpired(): boolean {
	return Date.now() > cacheExpiry;
}

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const lang = searchParams.get("lang") || "en";
	const lookupTable = searchParams.get("t");
	const dict = await getDictionary(lang);

	const cacheKey = `${lookupTable}_${lang}`;

	// Invalidate cache if expired
	if (isCacheExpired()) {
		lookupCache.clear();
		cacheExpiry = getNextExpiry();
	}

	if (lookupCache.has(cacheKey)) {
		return NextResponse.json(lookupCache.get(cacheKey));
	}

	let lookupValues: any;

	try {
		if (!lookupTable) {
			return apiResponse(APIStatus.BAD_REQUEST, dict.lookupAPI.missingLookupTable);
		}
		switch (LookupTable[lookupTable as keyof typeof LookupTable]) {
			case LookupTable.StudentClassLevel:
				lookupValues = await prisma.ClassLevel.findMany({
					where: {
						position: {
							gte: 1,
						},
					},
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.TeacherClassLevel:
				lookupValues = await prisma.ClassLevel.findMany({
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.Country:
				lookupValues = await prisma.Country.findMany({
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.EducationalBoard:
				lookupValues = await prisma.EducationalBoard.findMany({
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.EducationalQualification:
				lookupValues = await prisma.EducationalQualification.findMany({
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.ExperienceLevel:
				lookupValues = await prisma.ExperienceLevel.findMany({
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.InstructionMedium:
				lookupValues = await prisma.InstructionMedium.findMany({
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.Subject:
				lookupValues = await prisma.Subject.findMany({
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.Timezone:
				lookupValues = await prisma.Timezone.findMany({
					orderBy: [{ position: "asc" }],
				});
				break;
			case LookupTable.FeedbackAttribute:
				lookupValues = await prisma.FeedbackAttribute.findMany({
					orderBy: [{ position: "asc" }],
				});
				lookupValues = lookupValues.map((item: any) => ({
					...item,
					desc: dict.lookupAPI["feedback." + item.key] || item.key,
					descDetail: dict.lookupAPI["feedback.detail." + item.key] || item.key,
				}));
				break;
			default:
				return apiResponse(APIStatus.BAD_REQUEST, dict.lookupAPI.invalidLookupTable);
		}
		lookupCache.set(cacheKey, lookupValues);
		return NextResponse.json(lookupValues);
	} catch (error: any) {
		return apiResponse(APIStatus.INTERNAL_SERVER_ERROR, error.message);
	}
}
