const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const otpModel = require('../models/otp');
const twilio = require('twilio');
const { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = require('../config/keys');

const client = new twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, contact, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword || !contact) {
        error = {
            ...error,
            name: "Field must not be empty",
            email: "Field must not be empty",
            contact: "Field must not be empty",
            password: "Field must not be empty",
            cPassword: "Field must not be empty",
        };
        return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
        error = { ...error, name: "Name must be 3-25 characters" };
        return res.json({ error });
    } else {
        if (validateEmail(email)) {
            name = toTitleCase(name);
            if (password.length > 255 || password.length < 8) {
                error = {
                    ...error,
                    password: "Password must be 8 characters",
                    name: "",
                    email: "",
                    contact: "",
                };
                return res.json({ error });
            } else {
                try {
                    password = bcrypt.hashSync(password, 10);
                    const existingUser = await userModel.findOne({ email: email });
                    if (existingUser) {
                        error = {
                            ...error,
                            password: "",
                            name: "",
                            email: "Email already exists",
                            contact: "",
                        };
                        return res.json({ error });
                    } else {
                        let newUser = new userModel({
                            name,
                            email,
                            password,
                            userRole: 1,
                            contact,  // Store contact number in the database
                        });
                        await newUser.save();

                        // Generate OTP
                        const otp = Math.floor(100000 + Math.random() * 900000).toString();
                        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

                        // Save OTP to the database
                        await otpModel.create({ contact, otp, expiresAt });

                        // Send OTP via Twilio to the phone number
                        await client.messages.create({
                            body: `Your OTP code is ${otp}`,
                            from: TWILIO_PHONE_NUMBER,
                            to: contact
                        });

                        return res.json({
                            success: "Account created successfully. Please verify your phone number.",
                            contact // Return the contact number
                        });
                    }
                } catch (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Server error" });
                }
            }
        } else {
            error = {
                ...error,
                password: "",
                name: "",
                email: "Email is not valid",
                contact: "",
            };
            return res.json({ error });
        }
    }
}

  
  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async verifyOtp(req, res) {
    try {
      const { contact, otp } = req.body;
      console.log("nb1",contact,otp);
      if (!contact || !otp) {
        return res.status(400).json({ error: "Contact and OTP are required" });
      }
  
      // Find the OTP in the database
      const otpRecord = await otpModel.findOne({ contact: contact, otp: otp });
  
      if (!otpRecord) {
        return res.status(400).json({ error: "Invalid OTP or contact number" });
      }
  
      // Check if the OTP is expired
      if (new Date() > otpRecord.expiresAt) {
        return res.status(400).json({ error: "OTP has expired" });
      }
  
      // If everything is correct, delete the OTP record and return success
      await otpModel.deleteOne({ contact: contact });
  
      return res.json({ success: "Phone number verified, Login to your account" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
  
  
  
}

const authController = new Auth();
module.exports = authController;
