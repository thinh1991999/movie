import { SignIn, SignUp, SquareButton } from "../../Components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [state, setState] = useState("SIGNIN");

  useEffect(() => {
    user && navigate("/");
  }, []);

  return (
    <div className="h-screen w-full relative z-50">
      <img
        src="/background.jpg"
        className="w-full h-full object-cover"
        alt=""
      />
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/[0.1] dark:bg-black/[0.5]"></div>
      <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
        <div className="bg-black px-10 py-5 rounded-md text-white smm2:min-w-[400px] ">
          {state === "SIGNIN" ? <SignIn /> : <SignUp />}
          {state === "SIGNIN" ? (
            <p className="mt-5 text-gray-500">
              You don't have account?{" "}
              <button
                className="text-red-600 capitalize"
                onClick={() => setState("SIGNUP")}
              >
                Sign up now
              </button>
            </p>
          ) : (
            <p className="mt-5 text-gray-500">
              You have account?{" "}
              <button
                className="text-red-600 capitalize"
                onClick={() => setState("SIGNIN")}
              >
                Sign in now
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
