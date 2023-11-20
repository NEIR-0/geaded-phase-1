const express = require('express')
const router = express.Router()

const incubators = require("./incubators") // routes
const startUp = require("./startUp")

router.use("/", incubators)
router.use("/", startUp)


module.exports = router