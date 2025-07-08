import { create } from "zustand";

// Define an enum for calculation types
enum CouponCalculations {
	FLAT,
	PERCENTAGE,
}

// Define the state interface
type CouponState = {
	couponCode: string;
	discountValue: number;
	calculationType: CouponCalculations;
	setCoupon: (
		couponCode: string,
		discountValue: number,
		calculationType: CouponCalculations
	) => void;
	resetCoupon: () => void;
	getCoupon: () => {
		couponCode: string;
		discountValue: number;
		calculationType: CouponCalculations;
	};
};

// Create the Zustand store
const useCouponStore = create<CouponState>((set, get) => ({
	couponCode: "",
	discountValue: 0,
	calculationType: CouponCalculations.FLAT,
	setCoupon: (couponCode, discountValue, calculationType) =>
		set({ couponCode, discountValue, calculationType }),
	resetCoupon: () =>
		set({ couponCode: "", discountValue: 0, calculationType: CouponCalculations.FLAT }),
	getCoupon: () => {
		const { couponCode, discountValue, calculationType } = get();
		return { couponCode, discountValue, calculationType };
	},
}));

export { useCouponStore, CouponCalculations };
