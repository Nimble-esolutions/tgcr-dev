import { create } from "zustand";

export const couponCode = create((set, get) => ({
	discount: null,
	setCouponCode: (code) => set({ discount: code }),
}));
