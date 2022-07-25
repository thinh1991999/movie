import React from "react";

export default function MessNoti({ mess }) {
  return (
    <>
      {mess.value && (
        <p className={`${mess.type ? `text-blue-600` : `text-red-600`} mt-2`}>
          {mess.value}
        </p>
      )}
    </>
  );
}
