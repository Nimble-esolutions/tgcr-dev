export const formatDuration = (durationInSeconds) => {
	const hours = Math.floor(durationInSeconds / 3600);
	const minutes = Math.floor((durationInSeconds % 3600) / 60);
	const seconds = Math.floor(durationInSeconds % 60);

	const formattedHours = String(hours).padStart(2, "0");
	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(seconds).padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// Example usage:
//const durationInSeconds = 8.675333;
//const formattedDuration = formatDuration(durationInSeconds);
//console.log(formattedDuration); // Output: "00:00:08"
