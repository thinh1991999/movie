import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import MessNoti from "../MessNoti";

function InputInfo({
  title,
  disable = false,
  type = "text",
  placeholder = "",
  infoValues = {},
  handleChangeInput,
  hint,
  handleFocus,
}) {
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
        value={infoValues[hint] || ""}
        disabled={disable}
        onChange={(e) => {
          handleChangeInput(hint, e.target.value);
        }}
        onFocus={() => handleFocus()}
      />
    </>
  );
}

export default function Info({ infoValues, setInfoValues, handleUpdateInfo }) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [mess, setMess] = useState({
    type: true,
    value: "",
  });

  const handleChangeInput = (hint, value) => {
    setInfoValues({
      ...infoValues,
      [hint]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    await handleUpdateInfo();
    setMess({
      type: true,
      value: "Cap nhat thanh cong",
    });
    setLoadingBtn(false);
  };

  const handleFocus = () => {
    setMess({
      value: null,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo
            title={"Email"}
            disable={true}
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="email"
            handleFocus={handleFocus}
          />
        </div>
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo
            title={"Name"}
            placeholder={"Your name"}
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="name"
            handleFocus={handleFocus}
          />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo
            title={"Phone number"}
            placeholder={"Your phone"}
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="phone"
            handleFocus={handleFocus}
          />
        </div>
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo
            title={"Address"}
            placeholder={"Your address"}
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="address"
            handleFocus={handleFocus}
          />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col p-2">
          <InputInfo
            title={"Ngày sinh"}
            type="date"
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="birthDay"
            handleFocus={handleFocus}
          />
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
                value="male"
                onChange={(e) => {
                  handleChangeInput("gender", e.target.value);
                }}
                checked={infoValues?.gender === "male"}
                onFocus={() => handleFocus()}
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
                value="female"
                onChange={(e) => {
                  handleChangeInput("gender", e.target.value);
                }}
                checked={infoValues?.gender === "female"}
                onFocus={() => handleFocus()}
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
                value="null"
                onChange={(e) => {
                  handleChangeInput("gender", e.target.value);
                }}
                checked={infoValues?.gender === "null"}
                onFocus={() => handleFocus()}
              />
              <label className="ml-2 cursor-pointer" htmlFor="null">
                Khác
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <MessNoti mess={mess} />
      </div>
      <div className="ml-2 max-w-[150px]">
        <SubmitButton title={"Update info"} loading={loadingBtn} />
      </div>
    </form>
  );
}
