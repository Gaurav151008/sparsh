// Actions.js
import { fetchCashfreeToken, initiatePayment } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    const responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchPaymentToken = async (setState) => {
  try {
    await fetchCashfreeToken(setState);
  } catch (error) {
    console.error(error);
  }
};

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  totalCost,
  history
) => {
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
  } else {
    try {
      const paymentLink = await initiatePayment(data, state);
      window.location.href = paymentLink;
    } catch (error) {
      console.error(error.message);
      setState({ ...state, error: error.message });
    }
  }
};
