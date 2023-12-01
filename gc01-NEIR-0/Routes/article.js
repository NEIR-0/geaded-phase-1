const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controllers")
const authorizationAdminOnly = require("../middleware/authorization")
// multer
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage })

// articles
router.get("/articles", Controllers.articleList) // show list 
router.post("/articles", Controllers.createArticles) // add data
router.get("/articles/:id", Controllers.findArticles) // show data by id
router.put("/articles/:id", authorizationAdminOnly ,Controllers.updateArticles) // update data by id || // middleware (authorizationAdminOnly)

// multer - file
router.patch("/articles/:id",authorizationAdminOnly, upload.single('imgUrl'), Controllers.updateImgArticles)

router.delete("/articles/:id", authorizationAdminOnly ,Controllers.deleteArticles) // update data by id || // middleware (authorizationAdminOnly)

module.exports = router