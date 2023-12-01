const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controllers")
const authorizationAdminOnly = require("../middleware/authorization")

// register
router.post("/register", authorizationAdminOnly ,Controllers.register) // middleware (authorizationAdminOnly)


module.exports = router