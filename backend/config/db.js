const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully1");
} catch (err) {
  console.log(err);
}
