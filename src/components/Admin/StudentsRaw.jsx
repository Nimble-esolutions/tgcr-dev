"use client";

import React from "react";

const StudentsRaw = ({
  id,
  name,
  email,
  isActive,
  image,
  profile,
  role,
  onAdmin = null,
}) => {
  return (
    <tr>
      <td>{`${name}`}</td>
      <td>{email}</td>
      <td>{profile && profile.phone ? profile.phone : "N/A"}</td>
      <td>{isActive ? "Active" : "Disabled"}</td>
      <td>
        <div className="max-300px max-height-60">
          {profile && profile.bio ? profile.bio : "N/A"}
        </div>
      </td>
      <td>
        <button
          type="button"
          className={`btn btn-${
            role === "ADMIN" ? "danger" : "primary"
          } btn-sm fs-12 ms-2`}
          onClick={() => onAdmin(id, role)}
        >
          {role == "ADMIN" ? "Remove from admin" : "Make An Admin"}
        </button>
      </td>
    </tr>
  );
};

export default StudentsRaw;
