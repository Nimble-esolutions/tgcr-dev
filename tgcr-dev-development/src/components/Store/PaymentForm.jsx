"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cartStore";
import { calculateTotal, validateStripeMinimum } from "@/utils/cartUtils";
import Stripe from "stripe";
import toast from "react-hot-toast";

const PaymentForm = ({ lang, dict, groupedCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState("");

  const store = useCartStore();
  //   const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
  });

  const handleCardElementChange = (event) => {
    // handles Stripe's CardElement events'
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : "");
  };

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      let amount = Number(calculateTotal(store.cart)).toFixed(2);
      let currency = "eur";
      const cartData = Object.keys(groupedCart);
      const itemData = groupedCart[cartData[0]];
      const orderNumber = `ORD-${Date.now()}`;
      const uniqueId = crypto.randomUUID();

      const validateStripeMinimumResponse = validateStripeMinimum(amount, currency);

      if(validateStripeMinimumResponse.status){
        toast.error(validateStripeMinimumResponse.message);
        return;
      }

      sessionStorage.setItem("cartMailDetails", groupedCart);
      // Create payment session for Stripe payment gateway
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: "Payment",
                description: "Secure payment processing",
              },
              unit_amount: Math.round(amount) * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          orderId: uniqueId,
          orderNumber: orderNumber,
          amount: amount,
          student_id: itemData.items[0].studentId,
          cartData: JSON.stringify(cartData),
        },

        // Configure payment method options
        payment_intent_data: {
          metadata: {
            orderId: uniqueId,
            orderNumber: orderNumber,
            amount: amount,
            student_id: itemData.items[0].studentId,
            cartData: JSON.stringify(cartData),
          },
        },
      });

      const sessionData = JSON.stringify(session);
      sessionStorage.setItem("paymentSession", sessionData);

      // API call for creating checkout session in our database
      if (!!session) {
        const response = await fetch("/api/cart/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency,
            orderId: uniqueId,
            studentID: itemData.items[0].studentId,
            paymentVia: session.payment_method_types[0],
            paymentId: session.id,
            orderNumber: orderNumber,
          }),
        });

        const data = await response.json();

        if (!session.url) {
          throw new Error("Failed to create checkout session");
        }

        if (data.status) {
          sessionStorage.setItem("groupedCart", JSON.stringify(groupedCart));
          // Redirect to Stripe Checkout
          window.location.href = session.url;
        }
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
