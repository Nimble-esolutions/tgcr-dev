"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import Stripe from "stripe";

export default function PaymentSuccess() {
  const router = useRouter()
  const params = useSearchParams()
  const sessionId = params.get("session_id")
  const sessionData: any = sessionStorage.getItem('paymentSession');
  const groupedCart: any = sessionStorage.getItem('groupedCart');
  const parseData = JSON.parse(sessionData);
  const parseCartData = JSON.parse(groupedCart);
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    // check storage lock to prevent repeat API call
    const paymentRan = sessionStorage.getItem(`paymentHandled_${sessionId}`);
    if (paymentRan) {
      console.log("Payment handler already ran for this session, skipping API call.");
      return;
    }

    const getPayment = async () => {
      const sessionDetails: any = await stripe.checkout.sessions.retrieve(parseData.id);

      const amount = Number(sessionDetails.metadata.amount)
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
          paymentStatus: 'Paid',
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
          }),
        });
        const uploadResponse = await uploadData.json();
      }

      // Mark this session as handled
      sessionStorage.setItem(`paymentHandled_${sessionId}`, "true");
    };

    getPayment();
  }, [sessionId]);

  const handleGoToLessons = () => {
    router.push("/student/lessons/upcoming?status=success")
  }

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
  )
}
