// FetchApi.js
import axios from "axios";
import { totalCost } from "../partials/Mixins";
const apiURL = "http://localhost:8000";


export const fetchCashfreeToken = async (setState) => {
  try {
    const res = await axios.post(`${apiURL}/api/cashfree/get-token`);
    setState({
      paymentLink: res.data.paymentLink,
      success: res.data.success,
    });
  } catch (error) {
    console.error(error);
  }
};

export const initiatePayment = async (data, state) => {
  const paymentData = {
    amountTotal: totalCost(),
    address: state.address,
    phone: state.phone,
  };

  try {
    const res = await axios.post(`${apiURL}/api/cashfree/initiate-payment`, paymentData);
    return res.data.paymentLink;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
