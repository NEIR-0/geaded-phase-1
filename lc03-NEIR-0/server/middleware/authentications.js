const { createToken, verifyToken } = require("../helpers/jwt");
const authentications = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    // console.log(access_token);
    const verify = verifyToken(access_token);
    // console.log(verify);
    if (!verify) throw { name: "Unauthorized" };

    req.user = verify.id;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentications;
