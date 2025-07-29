
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req) {
  try {
    // Extract filters and pagination from request body
    const {
      page = 1,
      limit = 10,
      search = "",
      studentQuery = "",
      teacherQuery = "",
      paymentStatus = "All",
      startDate,
      endDate,
    } = await req.json();

    // Setup pagination
    const skip = (page - 1) * limit;
    const take = limit;

    // Build dynamic filters array
    const filters = [];

    // Filter by student name or ID
    if (studentQuery) {
      filters.push({
        student: {
          OR: [
            { name: { contains: studentQuery } },
            { id: { contains: studentQuery } },
          ],
        },
      });
    }

    // Filter by teacher name or ID
    if (teacherQuery) {
      filters.push({
        instructor: {
          OR: [
            { name: { contains: teacherQuery } },
            { id: { contains: teacherQuery } },
          ],
        },
      });
    }

    // Filter by specific payment status if not "All"
    if (paymentStatus !== "All") {
      filters.push({
        order: {
          paymentStatus: {
            equals: paymentStatus,
          },
        },
      });
    }

    // Filter by start date (inclusive)
    if (startDate) {
      filters.push({
        requestedStart: {
          gte: new Date(`${startDate}T00:00:00.000Z`),
        },
      });
    }

    // Filter by end date (inclusive)
    if (endDate) {
      filters.push({
        requestedStart: {
          lte: new Date(`${endDate}T23:59:59.999Z`),
        },
      });
    }

    // Global search on paymentId, student name, or teacher name
    if (search) {
      filters.push({
        OR: [
          { order: { paymentId: { contains: search } } },
          { student: { name: { contains: search } } },
          { instructor: { name: { contains: search } } },
        ],
      });
    }

    // Combine all filters using AND (if any)
    const where = filters.length ? { AND: filters } : {};

    // Fetch filtered lesson request data and total count in parallel
    const [data, total] = await Promise.all([
      prisma.lessonRequest.findMany({
        where,
        skip,
        take,
        orderBy: { requestedStart: "desc" }, // Sort by most recent first
        include: {
          student: { select: { id: true, name: true } }, // Get student info
          instructor: { select: { id: true, name: true } }, // Get teacher info
          teacherClassLevelCost: {
            select: {
              costPerLesson: true,
              currency: true,
              classLevel: {
                select: { name: true },
              },
            },
          },
          order: { select: { paymentStatus: true, paymentId: true } },
        },
      }),

      prisma.lessonRequest.count({ where }),
    ]);

    // Format and return the result
    return NextResponse.json({
      data: data.map((item) => ({
        id: item.id,
        student: item.student,
        instructor: item.instructor,
        requestedStart: item.requestedStart,
        requestedEnd: item.requestedEnd,
        teacherClassLevelCost: item.teacherClassLevelCost,
        paymentStatus: item.order?.paymentStatus || "-",
        transactionId: item.order?.paymentId || "-",
      })),
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Transaction API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import prisma from "@/libs/prismadb";

// export async function POST(req) {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       search = "",
//       studentQuery = "",
//       teacherQuery = "",
//       paymentStatus = "All",
//       startDate,
//       endDate,
//     } = await req.json();

//     const skip = (page - 1) * limit;
//     const take = limit;

//     const filters = [];

//     if (studentQuery) {
//       filters.push({
//         student: {
//           OR: [
//             { name: { contains: studentQuery} },
//             { id: { contains: studentQuery } },
//           ],
//         },
//       });
//     }

//     if (teacherQuery) {
//       filters.push({
//         lessonRequests: {
//           some: {
//             instructor: {
//               OR: [
//                 { name: { contains: teacherQuery} },
//                 { id: { contains: teacherQuery } },
//               ],
//             },
//           },
//         },
//       });
//     }

//     if (paymentStatus !== "All") {
//       filters.push({
//         paymentStatus: {
//           equals: paymentStatus,
//         },
//       });
//     }

//     if (startDate) {
//       filters.push({
//         lessonRequests: {
//           some: {
//             requestedStart: {
//               gte: new Date(`${startDate}T00:00:00.000Z`),
//             },
//           },
//         },
//       });
//     }

//     if (endDate) {
//       filters.push({
//         lessonRequests: {
//           some: {
//             requestedStart: {
//               lte: new Date(`${endDate}T23:59:59.999Z`),
//             },
//           },
//         },
//       });
//     }

//     if (search) {
//       filters.push({
//         OR: [
//           { paymentId: { contains: search} },
//           {
//             student: {
//               name: { contains: search},
//             },
//           },
//           {
//             lessonRequests: {
//               some: {
//                 instructor: {
//                   name: { contains: search},
//                 },
//               },
//             },
//           },
//         ],
//       });
//     }

//     const where = filters.length ? { AND: filters } : {};

//     const [orders, total] = await Promise.all([
//       prisma.order.findMany({
//         where,
//         skip,
//         take,
//         orderBy: { createdOn: "desc" },
//         include: {
//           student: { select: { id: true, name: true } },
//           lessonRequests: {
//             orderBy: { requestedStart: "asc" },
//             take: 1,
//             include: {
//               instructor: { select: { id: true, name: true } },
//               teacherClassLevelCost: {
//                 select: {
//                   costPerLesson: true,
//                   currency: true,
//                   classLevel: {
//                     select: { name: true },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       }),
//       prisma.order.count({ where }),
//     ]);

//     const result = orders.map((order) => {
//       const firstRequest = order.lessonRequests[0];

//       return {
//         id: order.id,
//         paymentStatus: order.paymentStatus || "-",
//         transactionId: order.paymentId || "-",
//         requestedStart: firstRequest?.requestedStart || null,
//         requestedEnd: firstRequest?.requestedEnd || null,
//         student: order.student
//           ? { id: order.student.id, name: order.student.name }
//           : null,
//         instructor: firstRequest?.instructor
//           ? { id: firstRequest.instructor.id, name: firstRequest.instructor.name }
//           : null,
//         teacherClassLevelCost: firstRequest?.teacherClassLevelCost || null,
//       };
//     });

//     return NextResponse.json({
//       data: result,
//       pagination: {
//         currentPage: page,
//         pageSize: limit,
//         totalItems: total,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     console.error("Transaction API Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 }
//     );
//   }
// }
