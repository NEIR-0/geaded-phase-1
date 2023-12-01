const express = require("express");
const routes = express.Router();
// Controllers
const Controllers = require("../Controllers/controller");

routes.get("/vouchers", Controllers.vouchers);

module.exports = routes;
