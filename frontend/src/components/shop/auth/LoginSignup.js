import React, { Fragment, useState, useContext } from "react";
import Login from "./Login";
import Signup from "./Signup";
import VerifyOtp from "./VerifyOtp";
import { LayoutContext } from "../index";

const LoginSignup = (props) => {
  const { data, dispatch } = useContext(LayoutContext);
  const [login, setLogin] = useState(true);
  const [loginValue, setLoginValue] = useState("Create an account");
  const [contact, setContact] = useState(""); // Store contact from signup

  const loginSignupModalToggle = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const changeLoginSignup = () => {
    if (login) {
      setLogin(false);
      setLoginValue("Login");
    } else {
      setLogin(true);
      setLoginValue("Create an account");
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => loginSignupModalToggle()}
        className={` ${
          data.loginSignupModal ? "" : "hidden"
        } fixed top-0 z-40 w-full h-screen bg-black opacity-50 cursor-pointer`}
      ></div>
      {/* Signup Login Component Render */}
      <section
        className={` ${
          data.loginSignupModal ? "" : "hidden"
        } fixed z-40 inset-0 my-8 md:my-20 flex items-start justify-center overflow-auto`}
      >
        <div className="w-11/12 md:w-3/5 lg:w-2/4 relative space-y-4 bg-white p-6 md:px-12 md:py-6">
          {login ? (
            <Login />
          ) : (
            <Signup setContact={setContact} /> // Pass function to set contact
          )}
          {!login && !data.success ? (
            <VerifyOtp contact={contact} />
          ) : null}
          <div className="flex items-center space-x-2">
            <span className="border-b border-gray-500 w-full" />
            <span className="font-medium">or</span>
            <span className="border-b border-gray-500 w-full" />
          </div>
          <div
            onClick={(e) => changeLoginSignup()}
            style={{ color: "#303031", border: "1px solid #303031" }}
            className="px-4 py-2 font-medium text-center cursor-pointer"
          >
            {loginValue}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginSignup;
