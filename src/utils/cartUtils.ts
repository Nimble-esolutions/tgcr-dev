import crypto from "crypto";
import { CartItem } from "@/store/cartStore";
import { CouponCalculations } from "@/store/couponStore";

// Generates a consistent ID based on studentId, teacherId, and startTime
const generateLessonId = (studentId: string, teacherId: string, startTime: Date): string => {
	const input = `${studentId}-${teacherId}-${startTime.toISOString()}`;

	// return crypto.createHash("sha256").update(input).digest("hex");
	const hash = crypto.createHash("sha256").update(input).digest("hex");

	// Format the first 36 characters of the hash into a UUID-like structure
	return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(
		16,
		20
	)}-${hash.slice(20, 32)}`;
};

// Generates a unique Booking ID;
const generateBookingId = (): string => {
	// const input = `${new Date().toISOString()}`;
	// return crypto.createHash("sha256").update(input).digest("hex");
	const isoD = new Date().toISOString();
	const timestamp =
		isoD.slice(2, 10).replace(/-/g, "") +
		"-" +
		isoD.slice(11, 23).replace(/:/g, "").replace(/\./g, ""); // "250512-153045123"
	const randomNum = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0"); // Random number between 0 and 9999

	return `ORD-${timestamp}-${randomNum}`; // e.g., "ORD-250512-153045123-1234"
};

// calculates the total price of items in the cart
const calculateTotal = (items: CartItem[]): string => {
	const total = items.reduce((total, item) => {
		total += item.price * item.count;
		return total;
	}, 0);

	return total.toFixed(2);
	// const stripeTotal = parseFloat((total * 100).toFixed(2));
};

// calculates the discount based on the original price and discount percentage
const calculateDiscount = (
	originalPrice: number,
	discount: number,
	calculationType: CouponCalculations
): string => {
	let beforeDiscount = parseFloat(originalPrice.toFixed(2));
	let discountAmount: number = 0;

	if (calculationType === CouponCalculations.PERCENTAGE) {
		discountAmount = parseFloat(((beforeDiscount * discount) / 100).toFixed(2));
	} else if (calculationType === CouponCalculations.FLAT) {
		discountAmount = discount;
	}

	return (beforeDiscount - discountAmount).toFixed(2);
};

export { generateLessonId, generateBookingId, calculateDiscount, calculateTotal };
