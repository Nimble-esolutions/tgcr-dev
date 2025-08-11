"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TestimonialRow = ({
  id,
  image,
  name,
  bioTitle,
  description,
  onDelete,
}) => {
  const router = useRouter();
  return (
    <tr>
      <td>
        <Image
          width={300}
          height={300}
          src={image}
          alt="image"
          className="w-40px rounded-circle"
        />
      </td>
      <td>{name}</td>
      <td>{bioTitle}</td>
      <td>
        <div className="max-300px max-height-60">{description}</div>
      </td>
      <td>
        <button
          onClick={() => onDelete(id)}
          type="button"
          className="btn btn-danger btn-sm fs-12"
        >
          Delete{" "}
        </button>

        <button
          type="button"
          className="btn btn-success btn-sm fs-12 ms-2"
          onClick={() => router.push(`/admin/testimonials/${id}`)}
        >
          Update{" "}
        </button>
      </td>
    </tr>
  );
};

export default TestimonialRow;
