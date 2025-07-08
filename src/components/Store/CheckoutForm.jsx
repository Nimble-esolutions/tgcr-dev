"use client";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/store/cartStore";
import { calculateTotal } from "@/utils/cartUtils";
import CartItem from "@/components/Store/CartItem";
import styles from "./css/CheckoutForm.module.css";
import PaymentForm from "@/components/Store/PaymentForm";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ lang, dict }) => {
	const store = useCartStore();
	const itemsInCart = store.count();
	const handleRemove = async (cartId) => {
		store.remove(cartId);
	};

	// Group all items per unique teacherId
	// items are displayed underneath each of the teacher name
	// without this, cart items will be out of sync from the teacher's name
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
		<>
			<div className="col-lg-8">
				<div className="shopping-cart">
					<div className="shopping-cart-list">
						<h5 className="mb-4">
							{itemsInCart > 0
								? dict.pageTitleH.replace("{count}", itemsInCart)
								: dict.cartEmptyH}
						</h5>
						<div className="row">
							{itemsInCart > 0 ? (
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
												navItem={false}
											/>
										));
									})}
									<h5>
										{dict.totalPrice.replace(
											"{price}",
											calculateTotal(store.cart)
										)}
									</h5>
								</>
							) : (
								<div>
									<p>{dict.cartEmpty}</p>
									<Link href={`/${lang}/teacher/search`} className="default-btn">
										{dict.searchTeachers}
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="col-lg-4">
				{itemsInCart > 0 && (
					<div className="shopping-cart-list">
						{/* <PlaceOrderBtn
						user={user}
						cartItems={cartItems}
					/> */}
						<Elements stripe={stripePromise}>
							<PaymentForm lang={lang} dict={dict} />
						</Elements>
					</div>
				)}
			</div>
		</>
	);
};

export default CheckoutForm;
