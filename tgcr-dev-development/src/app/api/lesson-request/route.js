import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(request) {
  try {
    const body = await request.json();

    const { orderId, status, ...teachers } = body;
    
    // Flatten all items under each teacher
    const lessonRequests = Object.values(teachers).flatMap((teacherGroup) =>
      teacherGroup.items.map((item) => ({
        orderId: orderId, 
        studentId: item.studentId,
        instructorId: item.teacherId,
        requestedStart: new Date(item.startTime),
        requestedEnd: new Date(new Date(item.startTime).getTime() + 30 * 60 * 1000),
        teacherClassLevelCostId: item.teacherClassLevelCostId,
        status: status
      }))
    );

    // ✅ You must provide orderId for each teacher group
    for (const request of lessonRequests) {
      if (!request.orderId) {
        return NextResponse.json(
          { error: "Missing orderId in teacher group. Please include it in your request." },
          { status: 400 }
        );
      }
    }

    // Optional: Validate all users/orders once if needed

    // Insert all lesson requests
    const created = await Promise.all(
      lessonRequests.map((item) =>
        prisma.lessonRequest.create({
          data: {
            id: randomUUID(),
            orderId: item.orderId,
            studentId: item.studentId,
            instructorId: item.instructorId,
            requestedStart: item.requestedStart,
            requestedEnd: item.requestedEnd,
            teacherClassLevelCostId: item.teacherClassLevelCostId,
            status: item.status
          }
        })
      )
    );

    return NextResponse.json({
      message: `${created.length} LessonRequests created successfully`,
      data: created,
      status: true
    });

  } catch (error) {
    console.error("Error creating LessonRequests:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
