import React, { useEffect, useMemo, useRef, useState } from "react";
import methods from "validator";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Validator from "../../Shared/validator";
import SubmitButton from "../SubmitButton";
import { auth, getErrorMessFirebase } from "../../Shared";
import MessNoti from "../MessNoti";
import { useSelector } from "react-redux";

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
        } px-3 py-2 rounded-sm outline-none  bg-gray-100 dark:bg-gray-700 text-black  dark:text-white border-[2px] border-gray-400 `}
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
  const language = useSelector((state) => state.root.language);

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
        message: language.currentPwRequire,
      },
      {
        field: "currentPassword",
        method: "isLength",
        args: [{ min: 6, max: undefined }],
        validWhen: true,
        message: language.currentPwLength,
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: language.newPwRequire,
      },
      {
        field: "password",
        method: "isLength",
        args: [{ min: 6, max: undefined }],
        validWhen: true,
        message: language.newPwLength,
      },
      {
        field: "cfPassword",
        method: "isEmpty",
        validWhen: false,
        message: language.cfPwRequire,
      },
    ];
  }, [language]);
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
              .then(() => {
                setMess({
                  type: true,
                  value: language.successUpdate,
                });
                setValues({
                  currentPassword: "",
                  password: "",
                  cfPassword: "",
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
          cfPassword: language.cfNotCorrect,
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
      <div className="lg:items-start items-center flex flex-col ">
        <div className="w-full md:w-1/2 flex flex-col ">
          <InputPassword
            title={language.currentPassword}
            placeholder={language.urCurrentPassword}
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
        <div className="w-full md:w-1/2 flex flex-col ">
          <InputPassword
            title={language.newPassword}
            placeholder={language.urNewPassword}
            hint={"password"}
            value={values}
            setValues={setValues}
            errors={errors}
            handleFocus={handleFocus}
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>}
        </div>
        <div className="w-full md:w-1/2 flex flex-col ">
          <InputPassword
            title={language.cfPassword}
            placeholder={language.cfNewPassword}
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
      <div className="px-2 lg:block flex justify-center">
        <MessNoti mess={mess} />
      </div>
      <div className="lg:block flex justify-center lg:max-w-[200px]">
        <SubmitButton
          title={language.userUpdatePassword}
          loading={loadingBtn}
        />
      </div>
    </form>
  );
}
