// generates stars based on provided rating; stars are rounded to nearest halfs
// need to surrounded by <div className="review-rating"><div className="review-stars">{generateStars(review.rating)}</div></div>
export const generateStars = (rating) => {
	const roundedRating = Math.round(rating * 2) / 2; // Round to the nearest half
	const stars = [];
	for (let i = 1; i <= 5; i++) {
		let style = { color: "gray" }; // Default color for unfilled stars
		if (i <= roundedRating) {
			style = { color: "orange" }; // Color for filled stars
			stars.push(<span key={i} className="bx bxs-star checked" style={style}></span>);
		} else if (i - 0.5 === roundedRating) {
			style = { color: "orange" }; // Color for half-filled stars
			stars.push(<span key={i} className="bx bxs-star-half checked" style={style}></span>);
		} else {
			stars.push(<span key={i} className="bx bxs-star" style={style}></span>);
		}
	}
	return <>{stars}</>;
};

// just a helper function to generate a helper label from rating
export const ratingLabel = (rating) => {
	return rating === 5
		? "Excellent"
		: rating === 4
		? "Good"
		: rating === 3
		? "Average"
		: rating === 2
		? "Poor"
		: rating === 1 && "Terrible";
};

// calculates average rating for the reviews; calculations rounded to nearest halfs
// reviews must have a rating field
export const calculateAverageRating = (reviews) => {
	const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
	const averageRating = totalRatings / reviews.length;

	// Round to the nearest half-integer
	const roundedRating = Math.round(averageRating * 2) / 2;

	return roundedRating;
};
