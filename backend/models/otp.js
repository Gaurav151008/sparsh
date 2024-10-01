const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  contact: { type: String, required: true },
  otp: { type: String, required: true }, // Ensure this is a string
  expiresAt: { type: Date, required: true }
});

const otpModel = mongoose.model('otp', otpSchema);
module.exports = otpModel;