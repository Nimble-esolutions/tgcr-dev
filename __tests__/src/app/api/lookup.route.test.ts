import { GET } from "@/app/api/lookup/route";
import prisma from "@/libs/prismadb";
import { NextRequest } from "next/server";
import { baseUrl } from "@/libs/constants";
import { APIStatus } from "@/utils/apiResponse";

// Mock prisma models
jest.mock("@/libs/prismadb", () => ({
	ClassLevel: { findMany: jest.fn() },
	Country: { findMany: jest.fn() },
	EducationalBoard: { findMany: jest.fn() },
	EducationalQualification: { findMany: jest.fn() },
	ExperienceLevel: { findMany: jest.fn() },
	InstructionMedium: { findMany: jest.fn() },
	Subject: { findMany: jest.fn() },
	Timezone: { findMany: jest.fn() },
	FeedbackAttribute: { findMany: jest.fn() },
}));

// Mock getDictionary
jest.mock("@/app/[lang]/dictionaries", () => ({
	getDictionary: jest.fn().mockResolvedValue({
		lookupAPI: {
			missingLookupTable: "Missing lookup table",
			invalidLookupTable: "Invalid lookup table",
		},
	}),
}));

describe("GET /api/lookup", () => {
	it("returns BAD_REQUEST if lookupTable is missing", async () => {
		const url = `${baseUrl}/api/lookup?lang=en`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(res.status).toBe(APIStatus.BAD_REQUEST);
		expect(json.message).toBe("Missing lookup table");
	});

	it("returns class levels for StudentClassLevel", async () => {
		(prisma.ClassLevel.findMany as jest.Mock).mockResolvedValue([
			{ id: 2, name: "Lower Primary (Age: 6 - 8)", position: 1 },
			{ id: 3, name: "Upper Primary (Age: 8 - 12)", position: 2 },
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=StudentClassLevel`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.ClassLevel.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{ id: 2, name: "Lower Primary (Age: 6 - 8)", position: 1 },
			{ id: 3, name: "Upper Primary (Age: 8 - 12)", position: 2 },
		]);
	});

	it("returns class levels for TeacherClassLevel", async () => {
		(prisma.ClassLevel.findMany as jest.Mock).mockResolvedValue([
			{ id: 1, name: "Trial Class", position: 0 },
			{ id: 2, name: "Lower Primary (Age: 6 - 8)", position: 1 },
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=TeacherClassLevel`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.ClassLevel.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{ id: 1, name: "Trial Class", position: 0 },
			{ id: 2, name: "Lower Primary (Age: 6 - 8)", position: 1 },
		]);
	});

	it("returns countries for Country", async () => {
		(prisma.Country.findMany as jest.Mock).mockResolvedValue([
			{ id: 5, iso2Code: "IN", name: "India", region: "Asia", dialCode: "+91", position: 1 },
			{
				id: 4,
				iso2Code: "NL",
				name: "Netherlands",
				region: "Europe",
				dialCode: "+31",
				position: 1,
			},
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=Country`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.Country.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{ id: 5, iso2Code: "IN", name: "India", region: "Asia", dialCode: "+91", position: 1 },
			{
				id: 4,
				iso2Code: "NL",
				name: "Netherlands",
				region: "Europe",
				dialCode: "+31",
				position: 1,
			},
		]);
	});

	it("returns educational boards for EducationalBoard", async () => {
		(prisma.EducationalBoard.findMany as jest.Mock).mockResolvedValue([
			{ id: 4, name: "CBSE", position: 4 },
			{ id: 1, name: "IB", position: 1 },
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=EducationalBoard`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.EducationalBoard.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{ id: 4, name: "CBSE", position: 4 },
			{ id: 1, name: "IB", position: 1 },
		]);
	});

	it("returns educational qualifications for EducationalQualification", async () => {
		(prisma.EducationalQualification.findMany as jest.Mock).mockResolvedValue([
			{ id: 2, name: "Master’s Degree / PG", position: 2 },
			{ id: 1, name: "Doctorate or Higher / PHD", position: 1 },
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=EducationalQualification`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.EducationalQualification.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{ id: 2, name: "Master’s Degree / PG", position: 2 },
			{ id: 1, name: "Doctorate or Higher / PHD", position: 1 },
		]);
	});

	it("returns experience levels for ExperienceLevel", async () => {
		(prisma.ExperienceLevel.findMany as jest.Mock).mockResolvedValue([
			{ id: 1, name: "0-4 years", position: 1 },
			{ id: 4, name: "15 years and above", position: 4 },
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=ExperienceLevel`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.ExperienceLevel.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{ id: 1, name: "0-4 years", position: 1 },
			{ id: 4, name: "15 years and above", position: 4 },
		]);
	});

	it("returns instruction mediums for InstructionMedium", async () => {
		(prisma.InstructionMedium.findMany as jest.Mock).mockResolvedValue([
			{ id: 1, name: "English", position: 1 },
			{ id: 2, name: "Hindi", position: 2 },
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=InstructionMedium`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.InstructionMedium.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{ id: 1, name: "English", position: 1 },
			{ id: 2, name: "Hindi", position: 2 },
		]);
	});

	it("returns subjects for Subject", async () => {
		(prisma.Subject.findMany as jest.Mock).mockResolvedValue([
			{ id: 1, name: "Mathematics", position: 1 },
			{ id: 6, name: "English Language Acquisition", position: 6 },
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=Subject`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.Subject.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{ id: 1, name: "Mathematics", position: 1 },
			{ id: 6, name: "English Language Acquisition", position: 6 },
		]);
	});

	it("returns timezones for Timezone", async () => {
		(prisma.Timezone.findMany as jest.Mock).mockResolvedValue([
			{
				id: 8,
				name: "Indian Standard Time",
				code: "IST",
				tzIdentifier: "Asia/Calcutta",
				tzAbbreviation: "IST",
				utcOffset: "+05:30",
				position: 8,
			},
			{
				id: 7,
				name: "Central European Time",
				code: "CET",
				tzIdentifier: "Europe/Amsterdam",
				tzAbbreviation: "CET",
				utcOffset: "+01:00",
				position: 7,
			},
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=Timezone`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.Timezone.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{
				id: 8,
				name: "Indian Standard Time",
				code: "IST",
				tzIdentifier: "Asia/Calcutta",
				tzAbbreviation: "IST",
				utcOffset: "+05:30",
				position: 8,
			},
			{
				id: 7,
				name: "Central European Time",
				code: "CET",
				tzIdentifier: "Europe/Amsterdam",
				tzAbbreviation: "CET",
				utcOffset: "+01:00",
				position: 7,
			},
		]);
	});

	it("returns feedback attributes for FeedbackAttribute", async () => {
		(prisma.FeedbackAttribute.findMany as jest.Mock).mockResolvedValue([
			{
				id: 1,
				name: "Punctuality",
				key: "PUNC",
				position: 1,
				desc: "PUNC",
				descDetail: "PUNC",
			},
			{
				id: 10,
				name: "Overall Satisfaction",
				key: "SATS",
				position: 10,
				desc: "SATS",
				descDetail: "SATS",
			},
		]);
		const url = `${baseUrl}/api/lookup?lang=en&t=FeedbackAttribute`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(prisma.FeedbackAttribute.findMany).toHaveBeenCalled();
		expect(json).toEqual([
			{
				id: 1,
				name: "Punctuality",
				key: "PUNC",
				position: 1,
				desc: "PUNC",
				descDetail: "PUNC",
			},
			{
				id: 10,
				name: "Overall Satisfaction",
				key: "SATS",
				position: 10,
				desc: "SATS",
				descDetail: "SATS",
			},
		]);
	});

	it("returns BAD_REQUEST for invalid lookupTable", async () => {
		const url = `${baseUrl}/api/lookup?lang=en&t=InvalidTable`;
		const req = { url } as NextRequest;
		const res = await GET(req);
		const json = await res.json();
		expect(res.status).toBe(APIStatus.BAD_REQUEST);
		expect(json.message).toBe("Invalid lookup table");
	});
});
