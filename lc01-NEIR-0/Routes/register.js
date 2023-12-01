const express = require("express");
const routes = express.Router();
// Controllers
const Controllers = require("../Controllers/controller");

routes.post("/register", Controllers.register);

module.exports = routes;
