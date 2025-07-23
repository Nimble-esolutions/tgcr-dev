import { create } from "zustand";

type CartItem = {
	id: string; // id of an item
	price: number; // price of the item
	count: number; // number of times the item is in the cart - for tGCR, this will always be 1
};

type CartState = {
	cart: CartItem[];
	count: () => number;
	add: (item: Omit<CartItem, "count">) => void;
	remove: (itemId: string) => void;
	removeAll: () => void;
};

const updateCart = (item: Omit<CartItem, "count">, cart: CartItem[]): CartItem[] => {
	// adding an item to the cart first checks if the item is already in the cart
	// if the item is not in the cart, it adds the item with a count of 1
	const itemOnCart = cart.some((cartItem) => cartItem.id === item.id);
	if (!itemOnCart) {
		// Add the new item immutably
		return [...cart, { ...item, count: 1 }];
	} else {
		// Update the count immutably
		return cart.map((cartItem) =>
			cartItem.id === item.id ? { ...cartItem, count: cartItem.count + 1 } : cartItem
		);
	}
	// const cartItem: CartItem = { ...item, count: 1 };
	// const itemOnCart = cart.some((cartItem) => cartItem.id === item.id);
	// if (!itemOnCart) {
	// 	cart.push(cartItem);
	// } else {
	// 	return cart.map((cartItem) => {
	// 		if (cartItem.id === item.id) {
	// 			// toast.success("Updated the cart.");
	// 			return { ...cartItem, count: cartItem.count + 1 };
	// 		}
	// 		return cartItem;
	// 	});
	// }
	// return cart;
};

const removeCart = (itemId: string, cart: CartItem[]): CartItem[] => {
	// removing an item from the cart first reduces the item count by 1
	// if the item count is 0, the item is removed completely from the cart
	// Create a new array by filtering out items with count <= 0
	return cart
		.map((cartItem) => {
			if (cartItem.id === itemId) {
				const updatedCount = cartItem.count - 1;
				return updatedCount > 0 ? { ...cartItem, count: updatedCount } : null;
			}
			return cartItem;
		})
		.filter((cartItem) => cartItem !== null) as CartItem[];
	// return cart.filter((cartItem) => {
	// 	if (cartItem.id === itemId) {
	// 		const updatedCount = cartItem.count - 1;
	// 		return updatedCount > 0 ? true : false; // Only keep the item if count > 0
	// 	}
	// 	return true; // Keep all other items
	// });
};

const useCartStore = create<CartState>((set, get) => ({
	cart: [],
	count: () => {
		const { cart } = get();
		if (cart.length) {
			return cart.map((item) => item.count).reduce((prev, curr) => prev + curr);
		}
		return 0;
	},
	add: (item) => {
		const { cart } = get();
		const updatedCart = updateCart(item, cart);
		set({ cart: [...updatedCart] });
	},
	remove: (itemId) => {
		const { cart } = get();
		const updatedCart = removeCart(itemId, cart);
		set({ cart: [...updatedCart] }); // Spread to ensure a new reference
	},
	removeAll: () => set({ cart: [] }),
}));

export type { CartItem };
export { useCartStore };
