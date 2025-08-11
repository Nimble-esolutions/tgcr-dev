import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request) {
  const body = await request.json();
  const { name, image, bioTitle, description } = body;

  if (name == "") {
    return NextResponse.json(
      {
        message: "Name is required!",
      },
      { status: 404 }
    );
  } else if (image == "") {
    return NextResponse.json(
      {
        message: "Image is required!",
      },
      { status: 404 }
    );
  } else if (bioTitle == "") {
    return NextResponse.json(
      {
        message: "bioTitle is required!",
      },
      { status: 404 }
    );
  } else if (description == "") {
    return NextResponse.json(
      {
        message: "description is required!",
      },
      { status: 404 }
    );
  }

  await prisma.testimonial.create({
    data: {
      name,
      image,
      bioTitle,
      description,
    },
  });

  return NextResponse.json(
    { message: "Testimonial created successfully." },
    { status: 200 }
  );
}
