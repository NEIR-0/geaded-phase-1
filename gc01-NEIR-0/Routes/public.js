const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controllers")

// public
router.get("/pub/articles", Controllers.articleList) // show list 
router.get("/pub/articles/:id", Controllers.findArticles) // show data by id

module.exports = router