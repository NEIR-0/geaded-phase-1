const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/controller")

// home
// router.get("/", Controllers.showIncubator)
router.get("/", Controllers.showIncubator)

// add & post
router.get("/incubators/add", Controllers.formIncubator)
router.post("/incubators/add", Controllers.postIncubator)

// detail
router.get("/incubators/:incubatorId", Controllers.detailIncubator)

// add start up
router.get("/incubators/:incubatorId/startUp/add", Controllers.formStartUp)
router.post("/incubators/:incubatorId/startUp/add", Controllers.postStartUp)

// delete
router.get("/incubator/:incubatorId/startup/:strartupId/delete", Controllers.deleteStartUp)

// edit
router.get("/incubator/:incubatorId/startup/:strartupId/edit", Controllers.formEditStartUp)
router.post("/incubator/:incubatorId/startup/:strartupId/edit", Controllers.postEditStartUp)


module.exports = router