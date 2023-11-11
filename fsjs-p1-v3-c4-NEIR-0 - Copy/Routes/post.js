const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controller")

router.get("/", Controllers.post)
// SEARCH
// router.get("/search", Controllers.search)

// !PERHATIKAN POSISINYA!
router.get("/add", Controllers.showForm)
router.post("/add", Controllers.postForm)




// params
router.get("/:id", Controllers.detailPost)

// edit
router.get("/:id/edit", Controllers.editPost)
router.post("/:id/edit", Controllers.updateForm)

// delete
router.get("/:id/delete", Controllers.deletePost)

// vote
router.get("/:id/vote", Controllers.votePost)


module.exports = router