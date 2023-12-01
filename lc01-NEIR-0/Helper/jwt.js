const jwt = require("jsonwebtoken");

const createToken = (playLoad) => {
  return (token = jwt.sign(playLoad, process.env.SECRET));
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { createToken, verifyToken };
