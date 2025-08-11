import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY , {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request) {
  const body = await request.text()

  let event

  try {
    event = JSON.parse(body)
  } catch (error) {
    console.error("Failed to parse webhook body:", error)
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        await handleCheckoutCompleted(session)
        break

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        await handleSuccessfulPayment(paymentIntent)
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object 
        await handleFailedPayment(failedPayment)
        break

      case "payment_intent.requires_action":
        const actionRequired = event.data.object 
        await handlePaymentRequiresAction(actionRequired)
        break

      case "payment_intent.canceled":
        const canceledPayment = event.data.object 
        await handleCanceledPayment(canceledPayment)
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object 
        await handleInvoicePaymentFailed(failedInvoice)
        break

      default:
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session) {
  console.log("Processing completed checkout:", {
    id: session.id,
    amount_total: session.amount_total,
    customer_email: session.customer_email,
    payment_status: session.payment_status,
  })

  // TODO: Implement your business logic here
  // - Update order status in database
  // - Send confirmation email
  // - Trigger fulfillment process
}

async function handleSuccessfulPayment(paymentIntent) {
  console.log("Processing successful payment:", {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    customer_email: paymentIntent.metadata.customer_email,
    status: paymentIntent.status,
  })

  // TODO: Implement your business logic here
  // - Update user account
  // - Grant access to paid content
  // - Send receipt email
}

async function handleFailedPayment(paymentIntent) {
  console.log("Processing failed payment:", {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    last_payment_error: paymentIntent.last_payment_error,
    customer_email: paymentIntent.metadata.customer_email,
  })

  // TODO: Implement your business logic here
  // - Log failed payment for analysis
  // - Send notification to customer about failed payment
  // - Update order status to failed
  // - Trigger retry logic if appropriate
}

async function handlePaymentRequiresAction(paymentIntent) {
  console.log("Processing payment requiring action:", {
    id: paymentIntent.id,
    status: paymentIntent.status,
    next_action: paymentIntent.next_action?.type,
  })

  // TODO: Handle payments requiring additional authentication
  // - Log for monitoring
  // - Send notification if needed
}

async function handleCanceledPayment(paymentIntent) {
  console.log("Processing canceled payment:", {
    id: paymentIntent.id,
    cancellation_reason: paymentIntent.cancellation_reason,
    customer_email: paymentIntent.metadata.customer_email,
  })

  // TODO: Handle canceled payments
  // - Update order status
  // - Release reserved inventory
  // - Send cancellation notification
}

async function handleInvoicePaymentFailed(invoice) {
  console.log("Processing failed invoice payment:", {
    id: invoice.id,
    customer: invoice.customer,
    amount_due: invoice.amount_due,
    attempt_count: invoice.attempt_count,
  })

  // TODO: Handle failed invoice payments (for subscriptions)
  // - Send dunning emails
  // - Update subscription status
  // - Implement retry logic
}
