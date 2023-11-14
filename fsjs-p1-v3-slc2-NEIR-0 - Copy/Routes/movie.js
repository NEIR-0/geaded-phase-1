const Controllers = require("../Controllers/controller")
const express = require('express')
const router = express.Router()

router.get('/', Controllers.showMovie)

router.get('/add', Controllers.addMovie)
router.post('/add', Controllers.postMovie)

router.get('/delete/:id', Controllers.delMovie)

router.get('/edit/:id', Controllers.editMovie)
router.post('/edit/:id', Controllers.postEdit)






module.exports = router
