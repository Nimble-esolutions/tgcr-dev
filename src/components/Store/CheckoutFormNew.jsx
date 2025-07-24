"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cartStore";
import { calculateTotal, validateStripeMinimum } from "@/utils/cartUtils";
import toast from "react-hot-toast";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import CartItem from "@/components/Store/CartItem";
import styles from "./css/CheckoutForm.module.css";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
const PaymentForm = ({ lang, dict, groupedCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState("");

  const store = useCartStore();
  //const elements = useElements();
  const stripe = useStripe();
  const router = useRouter();


  const handleCardElementChange = (event) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : "");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let amount = Number(calculateTotal(store.cart)).toFixed(2);
      let currency = "eur";
      const cartData = Object.keys(groupedCart);
      const itemData = groupedCart[cartData[0]];
      const orderNumber = `ORD-${Date.now()}`;
      const uniqueId = crypto.randomUUID();

      const validateStripeMinimumResponse = validateStripeMinimum(amount, currency);
      if (validateStripeMinimumResponse.status) {
        toast.error(validateStripeMinimumResponse.message);
        return;
      }

      sessionStorage.setItem("cartMailDetails", JSON.stringify(groupedCart));

      const sessionRes = await fetch("/api/create-stripe-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          cartData,
          itemData,
          orderNumber,
          uniqueId,
        }),
      });

      const { session } = await sessionRes.json();

      if (!session?.url) throw new Error("Stripe session creation failed.");

      sessionStorage.setItem("paymentSession", JSON.stringify(session));
      sessionStorage.setItem("groupedCart", JSON.stringify(groupedCart));

      window.location.href = session.url;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    hidePostalCode: true,
  };

  return (
    <>
      <h5 className="mb-4">{dict.pageTitleP}</h5>
      <div className="order-details">
        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <h6>Order Summary</h6>
          {Object.entries(groupedCart).map(([key, group]) => (
            <div key={key} className="grouped-item mb-2">
              {group.items.map((item) => (
                <div key={item.id}>
                  {item.title} — {item.quantity} × €{item.price.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
          <hr />
          <p>
            <strong>Total: </strong>€
            {calculateTotal(store.cart).toFixed(2)}
          </p>
        </div>

        <div className="payment-box">
          <form onSubmit={onSubmit}>
            <CardElement options={cardElementOptions} onChange={handleCardElementChange} />
            <br />
            <button
              type="submit"
              className={`default-btn ${store.cart.length === 0 || isLoading ? "cursor-not-allowed" : ""}`}
              disabled={store.cart.length === 0 || isLoading}
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
