import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import MessNoti from "../MessNoti";
import { useSelector } from "react-redux";

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
          disable && `cursor-not-allowed opacity-50`
        } px-3 py-2 rounded-sm outline-none bg-gray-100 dark:bg-gray-700 text-black  dark:text-white border-[2px] border-gray-400 `}
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
  const language = useSelector((state) => state.root.language);

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
      value: language.successUpdate,
    });
    setLoadingBtn(false);
  };

  const handleFocus = () => {
    setMess({
      value: null,
    });
  };

  useEffect(() => {
    const handleClick = () => {
      if (mess.value) {
        setMess({
          value: null,
        });
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [mess]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap">
        <div className="w-full smm:w-1/2 flex flex-col p-2">
          <InputInfo
            title={"Email"}
            disable={true}
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="email"
            handleFocus={handleFocus}
          />
        </div>
        <div className="w-full smm:w-1/2 flex flex-col p-2">
          <InputInfo
            title={language.name}
            placeholder={language.yourName}
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="name"
            handleFocus={handleFocus}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full smm:w-1/2 flex flex-col p-2">
          <InputInfo
            title={language.phoneNumber}
            placeholder={language.urPhoneNumber}
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="phone"
            handleFocus={handleFocus}
          />
        </div>
        <div className="w-full smm:w-1/2 flex flex-col p-2">
          <InputInfo
            title={language.address}
            placeholder={language.urAddress}
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="address"
            handleFocus={handleFocus}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full smm:w-1/2 flex flex-col p-2">
          <InputInfo
            title={language.birth}
            type="date"
            infoValues={infoValues}
            handleChangeInput={handleChangeInput}
            hint="birthDay"
            handleFocus={handleFocus}
          />
        </div>
        <div className="w-full smm:w-1/2 flex flex-col p-2">
          <label htmlFor="">{language.gender}</label>
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
                {language.male}
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
                {language.female}
              </label>
            </div>
            <div className="flex items-center mx-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                id="other"
                className="cursor-pointer"
                value="other"
                onChange={(e) => {
                  handleChangeInput("gender", e.target.value);
                }}
                checked={infoValues?.gender === "other"}
                onFocus={() => handleFocus()}
              />
              <label className="ml-2 cursor-pointer" htmlFor="other">
                {language.genderNull}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 lg:block flex justify-center">
        <MessNoti mess={mess} />
      </div>
      <div className="lg:block flex justify-center ml-2 ">
        <div className="lg:max-w-[200px]">
          <SubmitButton title={language.userUpdateInfo} loading={loadingBtn} />
        </div>
      </div>
    </form>
  );
}
