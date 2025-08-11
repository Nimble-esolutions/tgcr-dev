import he from "he";
//import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

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

	// Split the text into words and limit the array to the specified word count
	const wordsArray = strippedText.split(/\s+/).slice(0, wordLimit);

	// Join the array back into a string with spaces between words
	const truncatedText = wordsArray.join(" ");

	return truncatedText;
};

export { generateUId, generateUuid, countStripHtmlWords, stripHtmlAndTruncate };
