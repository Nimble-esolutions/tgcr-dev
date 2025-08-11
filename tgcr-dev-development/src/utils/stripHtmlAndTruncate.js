//TODO: Remove this stripHtmlAndTruncate and use stripHtmlAndTruncate from utils.TS
import he from "he";

export const stripHtmlAndTruncate = (text, wordLimit) => {
	const decodedText = he.decode(text);
	// Remove HTML tags except for &nbsp; using a regular expression
	const strippedText = decodedText.replace(/<[^>&]*>/g, "");

	// Split the text into words and limit the array to the specified word count
	const wordsArray = strippedText.split(/\s+/).slice(0, wordLimit);

	// Join the array back into a string with spaces between words
	const truncatedText = wordsArray.join(" ");

	return truncatedText;
};
