"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";

const PaymentForm = ({ lang, dict }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [cardComplete, setCardComplete] = useState(false);
	const [cardError, setCardError] = useState("");
	const store = useCartStore();
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();

	const handleCardElementChange = (event) => {
		// handles Stripe's CardElement events'
		setCardComplete(event.complete);
		setCardError(event.error ? event.error.message : "");
	};

	const onSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		const cardElement = elements?.getElement("card");

		try {
			// UI validations
			if (!cardComplete) {
				toast.error(dict.cardInvalidE1);
				return null;
			}
			if (cardError) {
				toast.error(cardError);
				return null;
			}

			// Stripe validations
			if (!stripe || !cardElement) return null;
			await stripe.createToken(cardElement, {
				card: {
					address_zip: "", // Set address_zip to null to exclude the postal code
				},
			});

			const intentResponse = await axios.post("/api/cart/create-payment-intent", {
				data: { cart: store.cart, lang: lang },
			});

			// find if the card payment is successful
			const { error, paymentIntent } = await stripe?.confirmCardPayment(
				intentResponse.data.message.client_secret,
				{
					payment_method: { card: cardElement },
				}
			);

			if (error) {
				// payment failed... delete the records which were just created in LessonRequest and Order tables
				await axios.delete("/api/cart/finalize-payment", {
					data: { paymentId: intentResponse.data.message.id, lang: lang },
				});
				toast.error(error.message);
				return;
			} else if (paymentIntent.status === "succeeded") {
				const response = await axios.post("/api/cart/finalize-payment", {
					data: {
						paymentIntent,
						lang: lang,
					},
				});

				toast.success(response.data.message);
				store.removeAll();
				router.push(`/${lang}/student/lessons/upcoming`);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const cardElementOptions = {
		classess: "",
		hidePostalCode: true,
	};

	return (
		<>
			<h5 className="mb-4">{dict.pageTitleP}</h5>
			<div className="order-details">
				<div className="payment-box">
					<form onSubmit={onSubmit} className="">
						<CardElement
							options={cardElementOptions}
							onChange={handleCardElementChange}
						/>
						<br />
						<button
							className={`default-btn ${
								store.cart.length === 0 && "cursor-not-allowed"
							} ${isLoading && "cursor-not-allowed"}`}
							disabled={store.cart.length === 0}
						>
							{isLoading ? dict.pleaseWait : dict.payBtn}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default PaymentForm;
