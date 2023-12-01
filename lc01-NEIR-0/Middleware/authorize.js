const { Gift } = require("../models");
const authorize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Gift.findByPk(id);
    if (!data) throw { name: "NotFounds" };

    if (data.senderId === req.user.id) {
      //   console.log("bener <<<<<<<<<<<<<<<<<<<<");
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const authorizeReciver = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Gift.findByPk(id);
    if (!data) throw { name: "NotFounds" };

    if (data.receiverId === req.user.id) {
      //   console.log("bener <<<<<<<<<<<<<<<<<<<<");
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authorize, authorizeReciver };
