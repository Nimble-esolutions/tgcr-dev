import he from "he";
//import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { PROFILE_BIO_MAXSIZE } from "@/libs/constants";

// generates a unique id for the front end
const generateUId = () => {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

// Generates a Uuid for the DB
const generateUuid = (): string => {
	//return crypto.randomUUID();
	return uuidv4();
};

// strips HTML tags from a string and find its word count
const countStripHtmlWords = (text: string): number => {
	const decodedText = he.decode(text);
	// Remove HTML tags except for &nbsp; using a regular expression
	const strippedText = decodedText.replace(/<[^>&]*>/g, "");

	// Split the text into words and return the word count
	return strippedText.split(/\s+/).length + 1;
};

// strips HTML tags from a string and truncates it to a specified word limit
const stripHtmlAndTruncate = (text: string, wordLimit: number): string => {
	const decodedText = he.decode(text ?? "");
	// Remove HTML tags except for &nbsp; using a regular expression
	const strippedText = decodedText.replace(/<[^>&]*>/g, "");

	// Split the text into words
	const wordsArray = strippedText.split(/\s+/);
	const isTruncated = wordsArray.length > wordLimit;
	const truncatedWords = wordsArray.slice(0, wordLimit);

	let truncatedText = truncatedWords.join(" ");
	if (isTruncated) {
		// add "..." if the text was truncated
		truncatedText += "...";
	}

	// Enforce PROFILE_BIO_MAXSIZE character limit
	if (truncatedText.length > PROFILE_BIO_MAXSIZE) {
		truncatedText = truncatedText.slice(0, PROFILE_BIO_MAXSIZE);
		// Optionally, add "..." if slicing cut off the text
		if (!truncatedText.endsWith("...")) {
			truncatedText = truncatedText.slice(0, -3) + "...";
		}
	}

	return truncatedText;
};

export { generateUId, generateUuid, countStripHtmlWords, stripHtmlAndTruncate };
