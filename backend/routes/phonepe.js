const axios = require('axios');
const express = require("express");
const crypto = require('crypto');

const router = express.Router();
const phonepeController = require("../controller/phonepe");

router.post("/order", phonepeController.getOrderId);
router.post("/payment-callback", phonepeController.paymentCallback);
router.post("/payment-cancel", phonepeController.paymentCancel);

module.exports = router;
