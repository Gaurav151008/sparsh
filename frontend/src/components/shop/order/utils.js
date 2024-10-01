import { load } from '@cashfreepayments/cashfree-js';

// async function initializeCashfree() {
//   try {
//     const cashfree = await load({ mode: "production" });
//     return cashfree;
//   } catch (error) {
//     console.error("Error initializing Cashfree:", error);
//     throw error;
//   }
// }

// export default initializeCashfree;
{/* <script src="https://sdk.cashfree.com/js/v3/cashfree-2023.03.07.js"></script> */}
const cashfree = load({
  mode:"sandbox" //or production
});
export default cashfree;