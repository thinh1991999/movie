import { useState } from "react";

import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
function SignIn() {
  const [signInValue, setSignInValue] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="">
      <h2 className="capitalize text-3xl font-semibold mb-5">Sign in</h2>
      <form action="" className="flex flex-col">
        <input
          type="text"
          placeholder="Email"
          value={signInValue.email}
          onChange={(e) =>
            setSignInValue({ ...signInValue, email: e.target.value })
          }
          className="my-2  bg-gray-700 px-3 py-2 border-2 border-gray-400 outline-none rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={signInValue.password}
          onChange={(e) =>
            setSignInValue({ ...signInValue, password: e.target.value })
          }
          className="my-2  bg-gray-700 px-3 py-2 border-2 border-gray-400 outline-none rounded-md"
        />
        <button className="capitalize mt-5 hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md">
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
          <div className="text-blue-600 text-2xl bg-white rounded-full">
            <BsFacebook />
          </div>
          <div className="text-2xl ml-2">
            <FcGoogle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
