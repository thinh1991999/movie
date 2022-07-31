import React, { useMemo, useRef, useState } from "react";
import methods from "validator";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Validator from "../../Shared/validator";
import SubmitButton from "../SubmitButton";
import { auth, getErrorMessFirebase } from "../../Shared";

const InputPassword = function ({
  title,
  disable = false,
  type = "password",
  placeholder = "",
  hint,
  value,
  setValues,
  handleFocus,
  errors,
}) {
  return (
    <>
      <label className="my-1" htmlFor={title}>
        {title}
      </label>
      <input
        type={type}
        id={title}
        placeholder={placeholder}
        className={`${disable && `cursor-not-allowed`} ${
          errors[hint] ? "border-red-600" : "border-gray-400"
        } px-3 py-2 rounded-sm outline-none text-black border-[2px]  `}
        disabled={disable}
        value={value[hint]}
        onChange={(e) => setValues({ ...value, [hint]: e.target.value })}
        onFocus={() => {
          handleFocus(hint);
        }}
      />
    </>
  );
};

export default function Password() {
  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    cfPassword: "",
  });

  const [mess, setMess] = useState({
    type: true,
    value: "",
  });
  const [loadingBtn, setLoadingBtn] = useState(false);

  const rules = useMemo(() => {
    return [
      {
        field: "currentPassword",
        method: "isEmpty",
        validWhen: false,
        message: "The currentPassword field is required.",
      },
      {
        field: "currentPassword",
        method: "isLength",
        args: [{ min: 6, max: undefined }],
        validWhen: true,
        message: "The currentPassword nhiều hơn 6 kí tự.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "The password field is required.",
      },
      {
        field: "password",
        method: "isLength",
        args: [{ min: 6, max: undefined }],
        validWhen: true,
        message: "The password nhiều hơn 6 kí tự.",
      },
      {
        field: "cfPassword",
        method: "isEmpty",
        validWhen: false,
        message: "The password field is required.",
      },
      {
        field: "cfPassword",
        method: "isLength",
        args: [{ min: 6, max: undefined }],
        validWhen: true,
        message: "The cfPassword nhiều hơn 6 kí tự.",
      },
    ];
  }, []);
  const validator = useRef(new Validator(rules)).current;
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setMess({
      value: "",
    });
    setErrors(validator.validate(values));
    if (validator.isValid) {
      if (methods.equals(values.password, values.cfPassword)) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          values.currentPassword
        );
        setLoadingBtn(true);
        reauthenticateWithCredential(auth.currentUser, credential)
          .then(() => {
            updatePassword(auth.currentUser, values.password)
              .then((res) => {
                setMess({
                  type: true,
                  value: "Cập nhật mật khẩu thành công",
                });
                setLoadingBtn(false);
              })
              .catch((err) => {
                setMess({
                  type: false,
                  value: getErrorMessFirebase(err.code),
                });
                setLoadingBtn(false);
              });
          })
          .catch((err) => {
            let code = err.code;
            if (code === "auth/wrong-password") {
              setErrors({
                ...errors,
                currentPassword: getErrorMessFirebase(code),
              });
            } else {
              setMess({
                type: false,
                value: getErrorMessFirebase(code),
              });
            }
            setLoadingBtn(false);
          });
      } else {
        setErrors({
          cfPassword: "Comfirm password is not correct!",
        });
      }
    }
  };

  const handleFocus = (hint) => {
    setMess({
      value: "",
    });
    setErrors({
      ...errors,
      [hint]: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div className="w-1/2 flex flex-col ">
          <InputPassword
            title={"Current Password"}
            placeholder={"Your current password"}
            hint={"currentPassword"}
            value={values}
            setValues={setValues}
            errors={errors}
            handleFocus={handleFocus}
          />
        </div>
        {errors.currentPassword && (
          <p className="text-red-600">{errors.currentPassword}</p>
        )}
        <div className="w-1/2 flex flex-col ">
          <InputPassword
            title={"New Password"}
            placeholder={"Your new password"}
            hint={"password"}
            value={values}
            setValues={setValues}
            errors={errors}
            handleFocus={handleFocus}
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}
        </div>
        <div className="w-1/2 flex flex-col ">
          <InputPassword
            title={"Comfirm password"}
            placeholder={"Comfirm new password"}
            hint={"cfPassword"}
            value={values}
            setValues={setValues}
            errors={errors}
            handleFocus={handleFocus}
          />
          {errors.cfPassword && (
            <p className="text-red-600">{errors.cfPassword}</p>
          )}
        </div>
      </div>
      {mess.value && (
        <p className={`${mess.type ? `text-blue-600` : `text-red-600`} mt-2`}>
          {mess.value}
        </p>
      )}
      <div className="max-w-[200px]">
        <SubmitButton title={"Update password"} loading={loadingBtn} />
      </div>
    </form>
  );
}
