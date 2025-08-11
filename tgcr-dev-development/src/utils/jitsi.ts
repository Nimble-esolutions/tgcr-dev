import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import { JAAS_ROOM_REMINDER_MINUTES, JAAS_OPEN_ALL_ROOMS } from "@/libs/constants";

interface JaaSUser {
	uid: string;
	name: string;
	email: string;
	moderator: boolean;
	startTime: Date;
	endTime: Date;
}

const generateJaaSJWT = ({ uid, name, email, moderator, startTime, endTime }: JaaSUser): string => {
	// generates a Jitsi JWT token for the given user and start/end time
	const payload = {
		aud: "jitsi",
		context: {
			user: {
				id: uid,
				name: name,
				email: email,
				avatar: "",
				moderator: moderator,
			},
			features: {
				livestreaming: true,
				recording: false,
				transcription: false,
				"outbound-call": true,
				"sip-outbound-call": false,
			},
			room: {
				regex: false,
			},
		},
		iss: "chat",
		room: "*",
		// TODO: Uncomment this to enable time-based access
		// nbf: Math.floor(startTime.getTime() / 1000),
		// exp: Math.floor(endTime.getTime() / 1000),
		sub: process.env.NEXT_PUBLIC_JAAS_APP_ID as string,
	};
	const privateKey = (process.env.JAAS_API_SECRET as string).replace(/\\n/g, "\n");
	const signOptions: SignOptions = {
		header: { alg: "RS256", kid: process.env.JAAS_API_KID as string },
	};

	return jsonwebtoken.sign(payload, privateKey, signOptions);
};

// Encode UUID to base64url-alphanumeric (replace + with A, / with B, remove =)
const uuidToBase64urlAlpha = (uuid: string): string => {
	const hex = uuid.replace(/-/g, "");
	return Buffer.from(hex, "hex")
		.toString("base64")
		.replace(/\+/g, "A") // replace + with A
		.replace(/\//g, "B") // replace / with B
		.replace(/=+$/, ""); // remove padding
};

// Decode base64url-alphanumeric back to UUID
const base64urlAlphaToUuid = (str: string): string => {
	let base64 = str.replace(/A/g, "+").replace(/B/g, "/");
	while (base64.length % 4) base64 += "=";
	const hex = Buffer.from(base64, "base64").toString("hex");
	return [
		hex.slice(0, 8),
		hex.slice(8, 12),
		hex.slice(12, 16),
		hex.slice(16, 20),
		hex.slice(20),
	].join("-");
};

const generateMeetingRoomName = (
	requestedStart: Date,
	requestedEnd: Date,
	lessonRequestId: string
): string => {
	// get the meeting room name; lessonRequestId is used as the meeting room ID for Jitsi
	// roomName is displayed as per JAAS_ROOM_REMINDER_MINUTES before requestedStart and until requestedEnd
	// in dev environment, all rooms are open for joining.
	const now = new Date();
	const windowStart = new Date(
		new Date(requestedStart).getTime() - JAAS_ROOM_REMINDER_MINUTES * 60 * 1000
	);
	const windowEnd = new Date(requestedEnd);

	// Only return room name if now is within the allowed window
	if (now >= windowStart && now <= windowEnd) {
		return lessonRequestId;
	} else {
		return JAAS_OPEN_ALL_ROOMS ? lessonRequestId : "";
	}
};

export { generateJaaSJWT, uuidToBase64urlAlpha, base64urlAlphaToUuid, generateMeetingRoomName };
