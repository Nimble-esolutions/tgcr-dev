import { NextResponse } from "next/server"
import Stripe from "stripe"

// TODO: Add your Stripe secret key to environment variables
// This should be your test secret key (starts with sk_test_)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY , {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request) {
  try {
    const { amount, currency = "EUR", customer_email } = await request.json()

    if (!customer_email) {
      return NextResponse.json({ error: "Customer email is required" }, { status: 400 })
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount) * 100, // Ensure amount is an integer
      currency,
      metadata: {
        customer_email,
        // TODO: Add any additional metadata you need (user_id, order_id, etc.)
      },
      // Optional: Create or use existing customer
      receipt_email: customer_email,
    })

    return NextResponse.json({
      paymentIntent: paymentIntent
    })
  } catch (error) {
    console.error("Error creating PaymentIntent:", error)

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
