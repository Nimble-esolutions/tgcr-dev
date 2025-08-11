// generic API response
// TODO: Handle Error logging for error codes as well (logging to a log file)
import { NextResponse } from "next/server";

export const APIStatus = Object.freeze({
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
});

export const apiResponse = (status, message) => {
	if (!Object.values(APIStatus).includes(status)) {
		throw new Error("Invalid status code");
	}

	return NextResponse.json(
		{
			message: message,
		},
		{
			status: status,
		}
	);
};
