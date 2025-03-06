import axios from "axios";

const apiURL = "http://localhost:8000";

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, contact, password, cPassword }) => {
  const data = { name, email, contact, password, cPassword };
  try {
      let res = await axios.post(`${apiURL}/api/signup`, data);
      if (res.data.success) {
          // Store the contact for later use in OTP verification
          localStorage.setItem("contact", res.data.contact);
          return res.data;
      } else {
          return res.data; // Return errors if any
      }
  } catch (error) {
      console.log(error);
  }
};

export const verifyOtpReq = async (otp) => {
  const contact = localStorage.getItem("contact"); // Retrieve the stored contact number
  const data = { contact, otp }; // Create an object with contact and otp fields
  console.log("nb",contact,otp);
  try {
    let res = await axios.post(`${apiURL}/api/verify-otp`, data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

