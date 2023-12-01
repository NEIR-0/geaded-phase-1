const { User, Hero, Favourite } = require("../models");
const { hashing, compare } = require("../helpers/bycryptjs");
const { createToken, verifyToken } = require("../helpers/jwt");
class Controllers {
  // register
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "invalidEmail" };
      if (!password) throw { name: "invalidPassword" };

      const user = await User.create({ email, password });
      //   console.log(user);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //   login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "invalidEmail" };
      if (!password) throw { name: "invalidPassword" };
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) throw { name: "invalidLogin" };

      const comparePasword = await compare(password, user.password);
      if (!comparePasword) throw { name: "invalidLogin" };

      const token = await createToken({ id: user.id });
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //   heroes
  static async heroes(req, res, next) {
    try {
      const heroes = await Hero.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      console.log(heroes);
      res.status(200).json(heroes);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  //   addheroes
  static async favourites(req, res, next) {
    try {
      const { heroId } = req.params;
      const findHero = await Hero.findByPk(heroId);
      if (!findHero) throw { name: "NotFound" };

      const favorite = await Favourite.create({ heroId, userId: req.user });
      const favoriteOne = await Favourite.findOne({
        where: {
          id: favorite.id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(201).json(favoriteOne);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //   favouritesList
  static async favouritesList(req, res, next) {
    try {
      const favourites = await Favourite.findAll({
        where: {
          userId: req.user,
        },
        include: {
          model: Hero,
          as: "hero",
        },
      });
      // console.log(favourites);

      res.status(200).json(favourites);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // editFavorite
  static async editFavorite(req, res, next) {
    try {
      const { id } = req.params;
      const { role, power } = req.body;
      const findFavoriter = await Favourite.findByPk(id);
      if (!findFavoriter) throw { name: "NotFound" };

      await Favourite.update(
        { role, power },
        {
          where: {
            id: id,
          },
        }
      );

      const favorite = await Favourite.findByPk(id);

      res.status(201).json({ message: "Hero has been updated" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controllers;
