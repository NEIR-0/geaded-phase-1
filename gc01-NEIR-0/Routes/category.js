const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controllers")

// categories
router.post("/categories", Controllers.createCategories) // add data
router.get("/categories", Controllers.categoriesList) // add data
router.put("/categories/:id", Controllers.updateCategories) // add data
router.delete("/categories/:id", Controllers.deleteCategories) // add data


module.exports = router