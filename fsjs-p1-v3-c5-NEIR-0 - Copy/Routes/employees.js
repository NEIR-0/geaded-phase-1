const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controller")

router.get("/add", Controllers.formAdd)
router.post("/add", Controllers.postAdd)

router.get("/edit/:id", Controllers.formEdit)
router.post("/edit/:id", Controllers.postEdit)

router.get("/delete/:id", Controllers.delete)


module.exports = router