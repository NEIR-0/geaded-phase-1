const express = require("express");
const Controllers = require("./Controllers/controllers");
const app = express();
const authentications = require("./middleware/authentications");
const errorHandlers = require("./middleware/errorHandlers");
const authorize = require("./middleware/authorize");

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/register", Controllers.register);
app.post("/login", Controllers.login);
app.use(authentications);
app.get("/heroes", Controllers.heroes);
app.get("/favourites", Controllers.favouritesList);

app.post("/favourites/:heroId", Controllers.favourites);
app.put("/favourites/:id", authorize, Controllers.editFavorite);

app.use(errorHandlers);

module.exports = app;
