const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');

// Import Router
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");
const phonepe = require("./routes/phonepe");
const orderRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const customizeRouter = require("./routes/customize");

// Import Auth middleware for check user login or not~
const { loginCheck } = require("./middleware/auth");
const CreateAllFolder = require("./config/uploadFolderCreateScript");

// Create All Uploads Folder if not exists | For Uploading Images
CreateAllFolder();

// Database Connection
mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Database Connected Successfully");
});
mongoose.connection.on("error", (err) => {
  console.error("Database Connection Error:", err);
});

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS configuration
// const allowedOrigins = [
//   'https://tyohaar.netlify.app',
//   'https://6664baeb28a7e0240946b426--tyohaar.netlify.app'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true // Required for sending cookies across origins (if applicable)
// }));
// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/phonepe", phonepe);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
