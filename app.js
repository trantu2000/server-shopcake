require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

// app.use(cors({
//     origin:"https://tucake.vercel.app"
// }))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://tucake.vercel.app");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json({ limit: "300mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const errorMiddleware = require("./middlewares/errors");

//import all routes
const products = require("./routes/products");
const auth = require("./routes/users");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

// Phần mềm trung gian để xử lý lỗi
app.use(errorMiddleware);

module.exports = app;
