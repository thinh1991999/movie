import React from "react";
import { useSelector } from "react-redux";
import { unKnowUserUrl } from "../../Shared";

export default function DetailComment({ detailUser }) {
  const language = useSelector((state) => state.root.language);
  const { avatar, email, name, phone, address, birthDay, gender } = detailUser;
  return (
    <div className="min-w-[300px] text-white">
      <div className="">
        <h5 className="text-2xl font-bold text-center capitalize">
          {language.detail}
        </h5>
        <div className="overflow-hidden flex justify-center my-5">
          <img
            src={avatar || unKnowUserUrl}
            alt=""
            className="w-[100px] h-[100px] rounded-md "
          />
        </div>
        <div className="flex justify-between my-3">
          <span className="w-2/5 font-bold">Email</span>
          <p>{email}</p>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-2/5 font-bold">{language.name}</span>
          <p>{name || "Trống"}</p>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-2/5 font-bold">{language.address}</span>
          <p>{address || "Trống"}</p>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-2/5 font-bold">{language.phoneNumber}</span>
          <p>{phone || "Trống"}</p>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-2/5 font-bold">{language.birth}</span>
          <p>{birthDay || "Trống"}</p>
        </div>
        <div className="flex justify-between my-3">
          <span className="w-2/5 font-bold">{language.gender}</span>
          <p>{gender || "Trống"}</p>
        </div>
      </div>
    </div>
  );
}
