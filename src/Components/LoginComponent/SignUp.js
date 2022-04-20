import { useState } from "react";
import Validator from "../../Shared/validator";
import { auth, db } from "../../Shared";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, update } from "firebase/database";

function SignUp() {
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    cfPassWord: "",
  });
  const [rules, setRules] = useState([
    {
      field: "email",
      method: "isEmpty",
      validWhen: false,
      message: "The email field is required.",
    },
    {
      field: "email",
      method: "isEmail",
      validWhen: true,
      message: "This field is email.",
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "The password field is required.",
    },
  ]);
  const [errors, setErrors] = useState({});
  const [messSuccess, setMessSuccess] = useState("");
  const [validator, setValidator] = useState(new Validator(rules));

  const requiredWith = (value, field, state) =>
    (!state[field] && !value) || !!value;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(signUpValue));
    if (validator.isValid && handleBlurCfPassword()) {
      createUserWithEmailAndPassword(
        auth,
        signUpValue.email,
        signUpValue.password
      )
        .then((user) => {
          const updates = {};
          const { displayName, email, photoURL } = user.user;
          updates["/users/" + user.user.uid] = {
            displayName,
            email,
            photoURL,
          };
          update(ref(db), updates);
          setMessSuccess("Sign Up success!");
          setSignUpValue({
            email: "",
            password: "",
            cfPassWord: "",
          });
          signOut(auth)
            .then(() => {})
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            setErrors({
              ...errors,
              email: "This email has been used!",
            });
          } else if (errorCode === "auth/weak-password") {
            setErrors({
              ...errors,
              password: "This password is weak!",
            });
          }
        });
    }
  };

  const handleBlurCfPassword = () => {
    if (signUpValue.cfPassWord !== signUpValue.password) {
      setErrors({
        ...errors,
        cfPassWord: "Comfirm password isn't corrected!",
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
    setMessSuccess("");
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

  return (
    <div className="">
      <h2 className="capitalize text-3xl font-semibold mb-5">Sign up</h2>
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
          placeholder="Password"
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
          placeholder="Comfirm Password"
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
        {messSuccess && <p className="text-blue-600">{messSuccess}</p>}
        <button className="capitalize mt-5 hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md">
          sign up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
