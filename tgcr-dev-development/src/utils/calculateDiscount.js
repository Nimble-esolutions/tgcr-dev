export const calculateDiscount = (discount, listPrice) => {
	let beforeDiscount = parseFloat(parseFloat(listPrice).toFixed(2));
	let discountAmount = parseFloat(
		((beforeDiscount * discount) / 100).toFixed(2)
	);
	let afterDiscount = beforeDiscount - discountAmount;
	// return { afterDiscount, beforeDiscount, discountAmount, discount };
	return afterDiscount.toFixed(2);
};
