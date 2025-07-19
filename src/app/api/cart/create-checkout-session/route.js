import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency, customer_email, studentID, paymentStatus, paymentVia, paymentId, orderNumber, orderId  } = body;

    if (!amount || !studentID) {
      return NextResponse.json({ error: "Amount and studentID are required.", data: body }, { status: 400 });
    }

    // ✅ Confirm student exists
    const student = await prisma.user.findUnique({
      where: {
        id: studentID,
      },
    });

    if (!student) {
      return NextResponse.json({ error: `User with id ${studentID} does not exist.` }, { status: 400 });
    }

    const decimalAmount = new Prisma.Decimal(amount);

    const order = await prisma.order.create({
      data: {
        id: orderId,
        orderNumber: orderNumber,
        studentId: studentID,
        price: decimalAmount,
        paymentStatus: paymentStatus,
        paymentVia: paymentVia || null,
        paymentId: paymentId || null,
      },
    });

    return NextResponse.json({
      message: "Order created successfully",
      data: order,
      status: true
    });

  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
