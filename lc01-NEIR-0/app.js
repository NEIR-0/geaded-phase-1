require("dotenv").config();
const express = require("express");
const app = express();
// routes
const register = require("./Routes/register");
const login = require("./Routes/login");
const vouchers = require("./Routes/vouchers");
const gift = require("./Routes/gift");
// middleware
const errorHandlers = require("./Middleware/errorHandlers");
const authentications = require("./Middleware/authentications");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(authentications)
app.use("/", register);
app.use("/", login);

app.use(authentications); // middleware
app.use("/", vouchers);
app.use("/", gift);

app.use(errorHandlers);

module.exports = app;

// post gift senderid
// fetch gift reciver
// update git sender
// dele git sender
// claim gift reciver
