const Controllers = require("../Controllers/controller")
const express = require('express')
const router = express.Router()

router.get('/', Controllers.showProductionHouse)

module.exports = router