"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Stripe from "stripe";

export default function PaymentCancel() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const sessionData: any = sessionStorage.getItem('paymentSession');
  const groupedCart: any = sessionStorage.getItem('groupedCart');
  const parseData = JSON.parse(sessionData);
  const parseCartData = JSON.parse(groupedCart);
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    // check if cancel call already ran for this session
    const cancelRan = sessionStorage.getItem(`paymentCancelHandled_${sessionId}`);
    if (cancelRan) {
      console.log("Payment cancel handler already ran for this session, skipping.");
      return;
    }

    const getPayment = async () => {
      let sessionDetails: any = await stripe.checkout.sessions.retrieve(
        parseData.id
      );

      const amount = Number(sessionDetails.metadata.amount);
      const studentId = sessionDetails.metadata.student_id;
      const orderNumber = sessionDetails.metadata.orderNumber;

      const response = await fetch("/api/cart/update-payment-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          studentID: studentId,
          paymentStatus: "Failed",
          paymentVia: sessionDetails.payment_method_types[0],
          paymentId: sessionDetails.payment_intent,
          orderNumber: orderNumber,
          cartData: sessionDetails.metadata.cartData
        }),
      });

      const data = await response.json();

      if (data.status) {
        const uploadData = await fetch("/api/lesson-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...parseCartData,
            orderId: sessionDetails.metadata.orderId,
            status: 'Failed'
          }),
        });
        const uploadResponse = await uploadData.json();
      }

      // mark this cancel handled
      sessionStorage.setItem(`paymentCancelHandled_${sessionId}`, "true");
    };

    getPayment();
  }, [sessionId]);

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
