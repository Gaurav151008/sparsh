import React, { Fragment, useState } from "react";
import { verifyOtpReq } from "./fetchApi";

const VerifyOtp = ({ contact }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await verifyOtpReq(otp); // Pass only the OTP
      if (response.error) {
        setError(response.error);
        setSuccess("");
      } else if (response.success) {
        setSuccess(response.success);
        setError("");
        // Proceed to the next steps, such as navigating to a new page
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Verify OTP</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="otp">
            OTP<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={handleOtpChange}
            value={otp}
            type="text"
            id="otp"
            className={`${
              error ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
          {success && <div className="text-sm text-green-500">{success}</div>}
        </div>
        <div
          style={{ background: "#303031" }}
          className="px-4 py-2 text-white text-center cursor-pointer font-medium"
        
        >

        <button
          type="submit"
          >
          Verify OTP
        </button>
          </div>
      </form>
    </Fragment>
  );
};

export default VerifyOtp;
