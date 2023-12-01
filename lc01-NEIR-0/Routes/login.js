const express = require("express");
const routes = express.Router();
// Controllers
const Controllers = require("../Controllers/controller");

routes.post("/login", Controllers.login);

module.exports = routes;
