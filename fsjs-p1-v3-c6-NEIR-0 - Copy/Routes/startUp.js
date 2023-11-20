const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controller")

router.get("/startUp", Controllers.showStartUp)

// delete
router.get("/startup/:strartupId/delete", Controllers.delShowStartUp)


module.exports = router