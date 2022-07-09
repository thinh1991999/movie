import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { auth, localStorageServ, provider } from "../../Shared";
import Validator from "../../Shared/validator";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathNameLogin = useSelector((state) => state.user.pathNameLogin);

  const [signInValue, setSignInValue] = useState({
    email: "",
    password: "",
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
  const [validator, setValidator] = useState(new Validator(rules));

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(signInValue));
    if (validator.isValid) {
      signInWithEmailAndPassword(auth, signInValue.email, signInValue.password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(actions.setUser(user));
          if (pathNameLogin) {
            navigate(pathNameLogin);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/user-not-found") {
            setErrors({
              ...errors,
              email: "This user is not found!",
            });
          } else if (errorCode === "auth/wrong-password") {
            setErrors({
              ...errors,
              password: "This password is wrong!",
            });
          } else {
            setErrors({
              ...errors,
              password: errorCode,
            });
          }
        });
    }
  };

  const handleLoginGG = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        throw new Error(error);
      });
  };

  const handleFocus = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleChange = (e) => {
    setSignInValue({
      ...signInValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="">
      <h2 className="capitalize text-3xl font-semibold mb-5">Sign in</h2>
      <form action="" className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={signInValue.email}
          onFocus={handleFocus}
          onChange={handleChange}
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
            errors.email ? `border-red-600` : `border-gray-400`
          }`}
        />
        {errors.email && <p className="text-red-600">{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signInValue.password}
          onFocus={handleFocus}
          onChange={handleChange}
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
            errors.password ? `border-red-600` : `border-gray-400`
          }`}
        />
        {errors.password && <p className="text-red-600">{errors.password}</p>}
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="capitalize mt-5 hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md"
        >
          sign in
        </button>
      </form>
      <div className="flex justify-between items-center mt-5">
        <div className="h-[1px]  bg-gray-500 flex-1"></div>
        <span className="mx-4 uppercase">Or</span>
        <div className="h-[1px] bg-gray-500 flex-1"></div>
      </div>
      <div className="flex mt-5">
        <p className="mr-2 font-thin capitalize">Sign In with:</p>{" "}
        <div className="flex">
          <button className="text-blue-600 text-2xl bg-white rounded-full">
            <BsFacebook />
          </button>
          <button className="text-2xl ml-2" onClick={handleLoginGG}>
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
