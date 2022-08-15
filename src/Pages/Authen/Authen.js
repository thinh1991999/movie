import { Logo, SignIn, SignUp } from "../../Components";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Authen() {
  const { status } = useParams();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const language = useSelector((state) => state.root.language);

  useEffect(() => {
    let timeOut = null;
    if (user) {
      timeOut = setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [user, navigate]);

  useEffect(() => {
    if (status !== "signUp" && status !== "signIn") navigate("/authen/signIn");
  }, [status, navigate]);

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
          {status === "signIn" ? <SignIn /> : <SignUp />}
          {status === "signIn" ? (
            <p className="mt-5 text-gray-500">
              {language.noAccount}?{" "}
              <Link to={"/authen/signUp"} className="text-red-600 capitalize">
                {language.signUpNow}
              </Link>
            </p>
          ) : (
            <p className="mt-5 text-gray-500">
              {language.haveAccount}?{" "}
              <Link to={"/authen/signIn"} className="text-red-600 capitalize">
                {language.signInNow}
              </Link>
            </p>
          )}
        </div>
      </div>
      <div className="absolute top-5 left-5">
        <Logo white={true} />
      </div>
    </div>
  );
}

export default Authen;
