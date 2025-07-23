import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		return NextResponse.json(
			{
				message: "The email sent successfully.",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{
				message: "An error occurred.",
			},
			{ status: 500 }
		);
	}
}
