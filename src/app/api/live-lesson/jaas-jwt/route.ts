import { NextRequest, NextResponse } from "next/server";
import { generateJaaSJWT } from "@/utils/jitsi";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Role } from "@prisma/client";

export async function POST(request: NextRequest) {
	// Generate a JaaS JWT and returns back to the client
	const body = await request.json();
	const { lang, uid, name, email, role, requestedStart, requestedEnd } = body;
	const dict = await getDictionary(lang ?? "en");

	if (!uid || !name || !email || !role || !requestedStart || !requestedEnd) {
		// one (or more) parameters is missing... find it and throw an error
		throw new Error(
			dict.liveLesson.jwtCreationE1.replace(
				"{param}",
				Object.entries({ uid, name, email, role, requestedStart, requestedEnd }).find(
					([_, v]) => !v
				)?.[0]
			)
		);
	}

	const token = generateJaaSJWT({
		uid,
		name,
		email,
		moderator: role === Role.Instructor ? true : false,
		startTime: requestedStart,
		endTime: requestedEnd,
	});
	return NextResponse.json({ token });
}
