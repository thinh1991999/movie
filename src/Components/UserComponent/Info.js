import React from "react";
import { useSelector } from "react-redux";
import SubmitButton from "../SubmitButton";

function InputInfo({
  title,
  disable = false,
  type = "text",
  placeholder = "",
}) {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <label htmlFor={title}>{title}</label>
      <input
        type={type}
        id={title}
        placeholder={placeholder}
        className={`${
          disable && `cursor-not-allowed`
        } px-3 py-2 rounded-sm outline-none text-black border-[1px] border-gray-400 `}
        disabled={disable}
      />
    </>
  );
}

export default function Info() {
  return (
    <form action="">
      <div className="flex">
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo title={"Email"} disable={true} />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo title={"Phone number"} placeholder={"Your phone"} />
        </div>
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo title={"Address"} placeholder={"Your address"} />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo title={"Ngày sinh"} type="date" />
        </div>
        <div className="w-1/2 flex flex-col p-2">
          <label htmlFor="">Giới tính</label>
          <div className="flex flex-1">
            <div className="flex items-center mx-2 ">
              <input
                type="radio"
                name="gender"
                id="male"
                className="cursor-pointer"
              />
              <label className="ml-2 cursor-pointer" htmlFor="male">
                Nam
              </label>
            </div>
            <div className="flex items-center mx-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                id="female"
                className="cursor-pointer"
              />
              <label className="ml-2 cursor-pointer" htmlFor="female">
                Nữ
              </label>
            </div>
            <div className="flex items-center mx-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                id="null"
                className="cursor-pointer"
              />
              <label className="ml-2 cursor-pointer" htmlFor="null">
                Khác
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-2">
        <SubmitButton title={"Update info"} loading={false} />
      </div>
    </form>
  );
}
