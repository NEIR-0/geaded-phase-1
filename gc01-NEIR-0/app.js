require("dotenv").config(); // ".env"
const express = require("express");
const app = express();
// const port = 3000 // pidahin ke www.js
// routes
const articles = require("./Routes/article");
const category = require("./Routes/category");
const auth = require("./Routes/auth");
const publicRoutes = require("./Routes/public");
// middleware
const authentication = require("./middleware/authentication");
const errorHandler = require("./middleware/errorHandler");
// Controllers
const Controllers = require("./Controllers/controllers");

// cours ==> react
const cors = require("cors");
app.use(cors());

app.use(express.json()); // 1. express.json()

app.use("/", publicRoutes); // ini untuk pablic gak perlu register/login

// login
app.post("/login", Controllers.login); // login

app.use(authentication); // middleware (authentication)

// PASTIKAN SEMUA AUTHORIZE ADA SETELAH AUTHENTICATION!!
app.use("/", auth); // register & login
app.use("/", articles);
app.use("/", category);

app.use(errorHandler); // middleware (errorHandler)

// di pidnahin ke bin/www.js
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app; // di exports
