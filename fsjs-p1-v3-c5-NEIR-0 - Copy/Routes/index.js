const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controller")
const employees = require("./Routes/employees")

router.get("/", Controllers.home)
router.use("/employees", employees)


module.exports = router