export default function dateFormat(datetime) {
	const date = new Date(datetime);

	// Format the date using Intl.DateTimeFormat
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const dateFormatter = new Intl.DateTimeFormat("en-US", options);
	const formattedDate = dateFormatter.format(date);

	return formattedDate;
}
