"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Stripe from "stripe";

export default function PaymentSuccess() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  // Read session data & cart from storage
  const sessionData = sessionStorage.getItem("paymentSession");
  const groupedCart = sessionStorage.getItem("groupedCart");

  // Defensive parse
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
      console.error("No payment session data found in storage.");
      return;
    }

    const getPayment = async () => {
      const sessionDetails = await stripe.checkout.sessions.retrieve(parseData.id);

      console.log("sessionDetails:", sessionDetails);

      const paymentIntentId = sessionDetails.payment_intent;

      if (!paymentIntentId) {
        console.error("No payment_intent found on session.");
        return;
      }

      // Lock key based on paymentIntent
      const lockKey = `paymentHandled_${paymentIntentId}`;

      const paymentRan = sessionStorage.getItem(lockKey);
      if (paymentRan) {
        console.log("Payment handler already ran for this paymentIntent, skipping.");
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
          paymentStatus: "Paid",
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
          }),
        });

        const uploadResponse = await uploadData.json();
        console.log("Lesson request response:", uploadResponse);
      }

      // ✅ Mark payment as handled for this unique paymentIntent
      sessionStorage.setItem(lockKey, "true");
    };

    getPayment();
  }, [sessionId, parseData, parseCartData, stripe]);

  const handleGoToLessons = () => {
    router.push("/student/lessons/upcoming?status=success");
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
          color: "#3877b0",
        }}
      >
        Payment Successful!
      </h1>
      <button className="default-btn" onClick={handleGoToLessons}>
        Go to My Lessons
      </button>
    </div>
  );
}
