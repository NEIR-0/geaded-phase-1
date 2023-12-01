const { verifyToken } = require("../Helper/jwt");
const authentications = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const { authorization } = req.headers;
    if (!authorization) throw { name: "invalidToken" };

    const rawToken = authorization.split(" ");
    // console.log(rawToken);
    if (rawToken.length < 2) throw { name: "invalidToken" };
    if (rawToken[0] !== "Bearer") throw { name: "invalidToken" };

    const verify = verifyToken(rawToken[1]);
    // console.log(verify);

    req.user = verify;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentications;
