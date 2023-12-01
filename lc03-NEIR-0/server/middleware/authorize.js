const { User, Hero, Favourite } = require("../models");

const authorize = async (req, res, next) => {
  try {
    // console.log("masuk");
    const { id } = req.params;
    // console.log(id);

    const finding = await Favourite.findOne({
      where: {
        id: id,
      },
    });
    if (!finding) throw { name: "NotFound" };

    const fav = await Favourite.findOne({
      where: {
        id: id,
        userId: req.user,
      },
    });
    // console.log(fav);
    if (!fav) {
      throw { name: "Forbidden" };
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authorize;
