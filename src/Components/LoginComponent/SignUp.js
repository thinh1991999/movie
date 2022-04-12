import { useState } from "react";
import Validator from "../../Shared/validator";

function SignUp() {
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    cfPassWord: "",
  });
  const rules = [
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
      field: "email",
      method: "isMobilePhone",
      validWhen: true,
      message: "This field is email or phone.",
    },
    {
      field: "password",
      method: "isEmpty",
      validWhen: false,
      message: "The password field is required.",
    },
  ];
  const [errors, setErrors] = useState({});
  const [validator, setValidator] = useState(new Validator(rules));

  const requiredWith = (value, field, state) =>
    (!state[field] && !value) || !!value;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validator.validate(signUpValue));
  };

  const checkEmpty = () => {};

  const handleFocus = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
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
          name="cfPassword"
          onFocus={handleFocus}
          autoComplete={`off`}
          onChange={handleChange}
          value={signUpValue.cfPassWord}
          className={`my-2 bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
            errors.password ? `border-red-600` : `border-gray-400`
          }`}
        />
        <button className="capitalize mt-5 hover:opacity-70 transition-all duration-300 ease-linear bg-red-600 py-2 rounded-md">
          sign up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
