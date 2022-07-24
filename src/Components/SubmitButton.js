import React from "react";
import ReactLoading from "react-loading";

export default function SubmitButton({
  title,
  loading = true,
  label = false,
  id,
}) {
  return (
    <>
      {loading ? (
        <div
          className={`cursor-not-allowed flex justify-center mt-5 transition-all duration-300 ease-linear bg-red-400 py-2 rounded-md`}
        >
          <ReactLoading type={"spin"} color={"#fff"} height={20} width={20} />
        </div>
      ) : label ? (
        <label
          htmlFor={id}
          className={`cursor-pointer capitalize flex justify-center mt-5 hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 px-3 rounded-md`}
        >
          {title}
        </label>
      ) : (
        <button
          htmlFor={id}
          className={`capitalize flex justify-center mt-5 hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 px-3 rounded-md`}
        >
          {title}
        </button>
      )}
    </>
  );
}
