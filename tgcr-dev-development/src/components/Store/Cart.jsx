"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { calculateTotal } from "@/utils/cartUtils";
import CartItem from "@/components/Store/CartItem";

const Cart = ({ lang, dict }) => {
	const store = useCartStore();

	// Group all items per unique teacherId
	// items are displayed underneath each of the teacher name
	const groupedCart = store.cart.reduce((acc, item) => {
		if (!acc[item.teacherId]) {
			acc[item.teacherId] = {
				teacherName: item.teacherName,
				teacherId: item.teacherId,
				items: [],
				count: 0,
			};
		}
		acc[item.teacherId].items.push(item);
		acc[item.teacherId].count += 1;
		return acc;
	}, {});

	return (
		<div className="option-item">
			<div className="cart-btn">
				<div className="dropdown">
					<Link href={`/${lang}/cart`} className="cart-link ptb-15">
						<i className="flaticon-shopping-cart"></i> <span>{store.count()}</span>
					</Link>

					<ul className="dropdown-menu">
						{store.count() > 0 ? (
							<>
								{Object.values(groupedCart).map((group) => {
									return group.items.map((cartItem, index) => (
										<CartItem
											key={cartItem.id}
											lang={lang}
											index={
												groupedCart[group.teacherId].count === index
													? 0
													: index
											}
											cartItem={cartItem}
											dict={dict}
											onRemove={() => handleRemove(cartItem.id)}
											navItem={true}
										/>
									));
								})}
								<li key="total-section" className="px-4 pb-2">
									<hr />
									<h5 className="pt-2 fw-bold">
										{dict.totalPrice.replace(
											"{price}",
											calculateTotal(store.cart)
										)}
									</h5>
									<Link
										href={`/${lang}/cart`}
										className="default-btn-style-3 d-block"
									>
										{dict.gotocheckout} <span></span>
									</Link>
								</li>
							</>
						) : (
							<li key="no0" className="empty">
								{dict.empty}
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Cart;
