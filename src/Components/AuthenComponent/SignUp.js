import { useEffect, useMemo, useRef, useState } from "react";
import Validator from "../../Shared/validator";
import { auth, db, getErrorMessFirebase } from "../../Shared";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, update } from "firebase/database";
import SubmitButton from "../SubmitButton";
import { useSelector } from "react-redux";
import MessNoti from "../MessNoti";

function SignUp() {
  const language = useSelector((state) => state.root.language);

  const rules = useMemo(() => {
    return [
      {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: language.emailRequire,
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: language.emailCheck,
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: language.pwRequire,
      },
      {
        field: "password",
        method: "isLength",
        args: [{ min: 6, max: undefined }],
        validWhen: true,
        message: language.newPwLength,
      },
    ];
  }, [language]);
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    cfPassWord: "",
  });
  const [errors, setErrors] = useState({});
  const [mess, setMess] = useState({ type: true, value: null });
  const [loading, setLoading] = useState(false);
  const validator = useRef(new Validator(rules)).current;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(signUpValue));
    if (validator.isValid && handleBlurCfPassword()) {
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        signUpValue.email,
        signUpValue.password
      )
        .then((user) => {
          const updates = {};
          const { email } = user.user;
          updates["/users/" + user.user.uid] = {
            email,
          };
          update(ref(db), updates);
          setMess({
            type: true,
            value: language.successSignup,
          });
          setSignUpValue({
            email: "",
            password: "",
            cfPassWord: "",
          });
          signOut(auth);
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            setErrors({
              ...errors,
              email: getErrorMessFirebase(errorCode),
            });
          } else {
            setMess({
              type: false,
              value: getErrorMessFirebase(errorCode),
            });
          }
          setLoading(false);
        });
    }
  };

  const handleBlurCfPassword = () => {
    if (signUpValue.cfPassWord !== signUpValue.password) {
      setErrors({
        ...errors,
        cfPassWord: language.cfNotCorrect,
      });
      return false;
    } else {
      return true;
    }
  };

  const handleFocus = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    setMess({
      type: true,
      value: null,
    });
  };

  const handleChange = (e) => {
    setSignUpValue({
      ...signUpValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    const newObject = {
      [e.target.name]: signUpValue[e.target.name],
    };
    setErrors({
      ...errors,
      ...validator.validate(newObject, false, e.target.name),
    });
  };

  useEffect(() => {
    document.title = language.logout;
  }, [language]);

  return (
    <div className="">
      <h2 className="capitalize text-3xl font-semibold mb-5">
        {language.signUp}
      </h2>
      <form action="" className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={signUpValue.email}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={`off`}
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
            errors.email ? `border-red-600` : `border-gray-400`
          }`}
        />
        {errors.email && <p className="text-red-600">{errors.email}</p>}

        <input
          type="password"
          placeholder={language.userPassword}
          value={signUpValue.password}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={`off`}
          name="password"
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
            errors.password ? `border-red-600` : `border-gray-400`
          }`}
        />
        {errors.password && <p className="text-red-600">{errors.password}</p>}

        <input
          type="password"
          placeholder={language.cfPassword}
          name="cfPassWord"
          onFocus={handleFocus}
          autoComplete={`off`}
          onChange={handleChange}
          value={signUpValue.cfPassWord}
          onBlur={handleBlurCfPassword}
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
            errors.cfPassWord ? `border-red-600` : `border-gray-400`
          }`}
        />
        {errors.cfPassWord && (
          <p className="text-red-600">{errors.cfPassWord}</p>
        )}
        <div className="px-2 lg:block flex justify-center">
          <MessNoti mess={mess} />
        </div>
        <SubmitButton title={language.signUp} loading={loading} />
      </form>
    </div>
  );
}

export default SignUp;
