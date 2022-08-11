import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, db, getErrorMessFirebase, provider } from "../../Shared";
import Validator from "../../Shared/validator";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "../SubmitButton";
import { actions } from "../../Store";
import MessNoti from "../MessNoti";
import { child, get, ref, update } from "firebase/database";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.root.language);
  const pathNameLogin = useSelector((state) => state.user.pathNameLogin);

  const rules = useMemo(
    () => [
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
    ],
    [language]
  );
  const [signInValue, setSignInValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [mess, setMess] = useState({
    type: true,
    value: "",
  });
  const validator = useRef(new Validator(rules)).current;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(signInValue));
    if (validator.isValid) {
      setLoading(true);
      signInWithEmailAndPassword(auth, signInValue.email, signInValue.password)
        .then(() => {
          if (pathNameLogin) {
            navigate(pathNameLogin);
          } else {
            navigate("/");
          }
          dispatch(actions.setLoginCreateAcc(true));
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/user-not-found") {
            setErrors({
              ...errors,
              email: getErrorMessFirebase(errorCode),
            });
          } else if (errorCode === "auth/wrong-password") {
            setErrors({
              ...errors,
              password: getErrorMessFirebase(errorCode),
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

  const handleLoginGG = () => {
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    provider.addScope("profile");
    provider.addScope("email");
    signInWithPopup(auth, provider)
      .then((user) => {
        const pathUser = "/users/" + user.user.uid;
        get(child(ref(db), pathUser)).then((snapshot) => {
          if (snapshot.val()) {
            if (pathNameLogin) {
              navigate(pathNameLogin);
            } else {
              navigate("/");
            }
          } else {
            const updates = {};
            const { email } = user.user;
            updates[pathUser] = {
              email,
            };
            update(ref(db), updates).then(() => {
              if (pathNameLogin) {
                navigate(pathNameLogin);
              } else {
                navigate("/");
              }
            });
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrors({
          ...errors,
          password: getErrorMessFirebase(errorCode),
        });
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

  useEffect(() => {
    document.title = language.login;
  }, [language]);

  return (
    <div className="">
      <h2 className="capitalize text-3xl font-semibold mb-5">
        {language.login}
      </h2>
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
          placeholder={language.userPassword}
          name="password"
          value={signInValue.password}
          onFocus={handleFocus}
          onChange={handleChange}
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
            errors.password ? `border-red-600` : `border-gray-400`
          }`}
        />
        {errors.password && <p className="text-red-600">{errors.password}</p>}
        <div className="px-2 lg:block flex justify-center">
          <MessNoti mess={mess} />
        </div>
        <SubmitButton title={language.login} loading={loading} />
      </form>
      <div className="flex justify-between items-center mt-5">
        <div className="h-[1px]  bg-gray-500 flex-1"></div>
        <span className="mx-4 uppercase">{language.or}</span>
        <div className="h-[1px] bg-gray-500 flex-1"></div>
      </div>
      <div className="flex mt-5">
        <p className="mr-2 font-thin capitalize">{language.signInWith}</p>{" "}
        <div className="flex">
          <button className="text-2xl ml-2" onClick={handleLoginGG}>
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
