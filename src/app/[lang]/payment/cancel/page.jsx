"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Stripe from "stripe";

export default function PaymentCancel() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const sessionData = sessionStorage.getItem("paymentSession");
  const groupedCart = sessionStorage.getItem("groupedCart");
  const parseData = sessionData ? JSON.parse(sessionData) : null;
  const parseCartData = groupedCart ? JSON.parse(groupedCart) : null;

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-04-10",
  });

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (!parseData) {
      console.error("No payment session data found.");
      return;
    }

    const handleCancel = async () => {
      const sessionDetails = await stripe.checkout.sessions.retrieve(parseData.id);

      console.log("Session details:", sessionDetails);

      const paymentIntentId = sessionDetails.payment_intent;

      if (!paymentIntentId) {
        console.error("No payment_intent found.");
        return;
      }

      // Use payment_intent as unique lock
      const lockKey = `paymentCancelHandled_${paymentIntentId}`;
      const cancelRan = sessionStorage.getItem(lockKey);
      if (cancelRan) {
        console.log("Cancel handler already ran for this paymentIntent, skipping.");
        return;
      }

      const amount = Number(sessionDetails.metadata.amount);
      const studentId = sessionDetails.metadata.student_id;
      const orderNumber = sessionDetails.metadata.orderNumber;

      const response = await fetch("/api/cart/update-payment-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          studentID: studentId,
          paymentStatus: "Failed",
          paymentVia: sessionDetails.payment_method_types[0],
          paymentId: paymentIntentId,
          orderNumber,
          cartData: sessionDetails.metadata.cartData,
        }),
      });

      const data = await response.json();
      console.log("Update order response:", data);

      if (data.status) {
        const uploadData = await fetch("/api/lesson-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...parseCartData,
            orderId: sessionDetails.metadata.orderId,
            status: "Failed",
          }),
        });

        const uploadResponse = await uploadData.json();
        console.log("Lesson request response:", uploadResponse);
      }

      // ✅ Mark this cancel flow as handled
      sessionStorage.setItem(lockKey, "true");
    };

    handleCancel();
  }, [sessionId, parseData, parseCartData, stripe]);

  const handleGoToCart = () => {
    router.push("/cart?status=cancel");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#d9534f",
        }}
      >
        Payment Cancelled
      </h1>
      <button className="default-btn" onClick={handleGoToCart}>
        Back to Cart
      </button>
    </div>
  );
}
