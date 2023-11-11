const express = require('express')
const router = express.Router()
const controller = require("../Controllers/controller")

router.get("/", controller.author)
router.get("/detail", controller.detailAuthor)

module.exports = router