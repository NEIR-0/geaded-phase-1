const express = require("express");
const routes = express.Router();
// Controllers
const Controllers = require("../Controllers/controller");
// middleware
const { authorize, authorizeReciver } = require("../Middleware/authorize");

routes.post("/gifts/:voucherId", Controllers.gift);
routes.get("/gifts", Controllers.listGift);
routes.put("/gifts/:id", authorize, Controllers.updateGift);
routes.delete("/gifts/:id", authorize, Controllers.deleteGift);
routes.patch("/gifts/:id/claim", authorizeReciver, Controllers.patchGift);

module.exports = routes;
