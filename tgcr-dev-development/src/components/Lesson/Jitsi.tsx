"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Role, User, LessonRequest } from "@prisma/client";
import { JAAS_DOMAIN, JAAS_MAX_USERS } from "@/libs/constants";
import { uuidToBase64urlAlpha } from "@/utils/jitsi";
import styles from "./css/Jitsi.module.css";

interface JitsiParams {
	lang: string;
	currentUser: User;
	lessonRequest: LessonRequest;
	liveLessonDict: { [key: string]: string };
}

const jaasAppId = `${process.env.NEXT_PUBLIC_JAAS_APP_ID}`;
// TODO: Implement dynamic password generation for live lesson
// const ROOM_PASSWORD = "SecurePass123";

// creates a Jitsi live lesson for the current user.
// Step1: Generate a JWT token for the user
// Step2: Create a Jitsi live lesson using the JWT token (JitsiMeetExternalAPI())
// Step3: Set few properties for the live lesson; and log the start time in the Lesson table
// Step4: Return <div id="jaas-container" />
// Step5: End the session; and log the end time in the Lesson table; and redirect to the feedback page
const Jitsi: React.FC<JitsiParams> = ({ lang, currentUser, lessonRequest, liveLessonDict }) => {
	const jitsiRef = useRef<any>(null);
	const router = useRouter();
	const roomNameRef = useRef<string>(`${jaasAppId}/${uuidToBase64urlAlpha(lessonRequest.id)}`);
	const [jaasJWT, setJaasJWT] = useState<string | null>(null);

	useEffect(() => {
		const fetchJWT = async () => {
			// Fetch JWT from API
			await axios
				.post("/api/live-lesson/jaas-jwt", {
					lang: lang,
					uid: currentUser.id,
					name: currentUser.name,
					email: currentUser.email,
					role: currentUser.role,
					requestedStart: lessonRequest.requestedStart,
					requestedEnd: lessonRequest.requestedEnd,
				})
				.then((response) => {
					setJaasJWT(response.data.token);
				})
				.catch((error) => {
					toast.error(error.response?.data?.message || error.message);
				})
				.finally(() => {});
		};
		fetchJWT();
	}, [currentUser, lang, lessonRequest]);

	useEffect(() => {
		if (!jaasJWT) return;

		// @ts-ignore
		const api = new window.JitsiMeetExternalAPI(JAAS_DOMAIN, {
			roomName: roomNameRef.current,
			parentNode: document.getElementById("jaas-container"),
			width: "100%",
			height: 600,
			jwt: jaasJWT,
			configOverwrite: {
				disablePolls: true, // Disable polls
				toolbarButtons: [
					"microphone",
					"noisesuppression",
					"camera",
					"select-background",
					"desktop",
					"whiteboard",
					"chat",
					"raisehand",
					"hangup",
					// "invite",
				],
				subject: liveLessonDict.liveLesson,
			},
		});
		jitsiRef.current = api;

		// // Set password when the local user joins as moderator
		// api.addListener("participantRoleChanged", (event: any) => {
		// 	if (event.role === "moderator") {
		// 		api.executeCommand("password", ROOM_PASSWORD);
		// 	}
		// });
		// // Enforce password for joining users
		// api.addListener("passwordRequired", () => {
		// 	api.executeCommand("password", ROOM_PASSWORD);
		// });

		api.addListener("videoConferenceJoined", async (event: any) => {
			// Call API to update the Lesson table with starttime
			await axios
				.post("/api/live-lesson/session-start", {
					lang: lang,
					uid: currentUser.id,
					name: currentUser.name,
					email: currentUser.email,
					role: currentUser.role,
					lessonId: lessonRequest.id,
					timestamp: new Date().toISOString(),
				})
				.catch((error) => {
					toast.error(error.response?.data?.message || error.message);
				})
				.finally(() => {});
		});

		api.addListener("participantJoined", async () => {
			// Enforce max participants (kick extra users)
			const participants = await api.getParticipantsInfo();
			if (participants.length > JAAS_MAX_USERS) {
				// Kick the last participant (could be improved for fairness)
				const last = participants[participants.length - 1];
				api.executeCommand("kickParticipant", last.participantId);
			}
		});

		api.addListener("readyToClose", async () => {
			// Call API to update the Lesson table with endtime... and redirect to feedback page
			await axios
				.post("/api/live-lesson/session-end", {
					lang: lang,
					uid: currentUser.id,
					name: currentUser.name,
					email: currentUser.email,
					role: currentUser.role,
					lessonId: lessonRequest.id,
					timestamp: new Date().toISOString(),
				})
				.catch((error) => {
					toast.error(error.response?.data?.message || error.message);
				})
				.finally(() => {});
			if (currentUser.role === Role.Student) {
				// students redirected to feedback page
				router.push(`/${lang}/student/feedback/${lessonRequest.id}`);
			} else {
				// teachers redirected to lesson requests page
				router.push(`/${lang}/teacher/lessons/upcoming`);
			}
		});
	}, [jaasJWT, lang, currentUser, lessonRequest, router, liveLessonDict]);

	return (
		<div>
			<div id="jaas-container" />
		</div>
	);
};

export { Jitsi };
