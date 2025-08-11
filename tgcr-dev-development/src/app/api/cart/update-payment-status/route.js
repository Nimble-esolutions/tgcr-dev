import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { sendPaymentSuccess, sendPaymentSuccessTeacher } from "@/utils/mailer";

export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      amount,
      currency,
      studentID,
      paymentStatus,
      paymentVia,
      paymentId,
      orderNumber,
      cartData,
    } = body;

    let teachersId = JSON.parse(cartData);
    if (!amount || !studentID || !orderNumber) {
      return NextResponse.json(
        {
          error: "Amount, studentID, and orderNumber are required.",
          data: body,
        },
        { status: 400 }
      );
    }

    const student = await prisma.user.findUnique({
      where: { id: studentID },
    });

    if (!student) {
      return NextResponse.json(
        { error: `User with id ${studentID} does not exist.` },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: { orderNumber: orderNumber },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: `Order with number ${orderNumber} does not exist.` },
        { status: 404 }
      );
    }

    const decimalAmount = new Prisma.Decimal(amount);

    const updatedOrder = await prisma.order.update({
      where: { orderNumber: orderNumber },
      data: {
        price: decimalAmount,
        paymentStatus: paymentStatus,
        paymentVia: paymentVia || null,
        paymentId: paymentId || null,
      },
    });

    // Send payment confirmation email if paid
   /* if (paymentStatus === "Paid") {
      await sendPaymentSuccess({
        email: student.email,
        orderNumber,
        amount,
        currency,
        paymentId,
      });

      // Send payment confirmation to each teacher
      if (Array.isArray(teachersId)) {
        for (const teacherId of teachersId) {
          const teacher = await prisma.user.findUnique({
            where: { id: teacherId },
          });
  
          if (teacher && teacher.email) {
            await sendPaymentSuccessTeacher({
              email: teacher.email,
              orderNumber,
              amount,
              currency,
              paymentId,
              studentName: `${student.firstName} ${student.lastName || ""}`,
            });
          }
        }
      }
    }*/


    return NextResponse.json({
      message: "Order updated and email sent successfully",
      data: updatedOrder,
      ids: teachersId,
      status: true,
    });
  } catch (error) {
    console.error("Error updating order or sending email:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
