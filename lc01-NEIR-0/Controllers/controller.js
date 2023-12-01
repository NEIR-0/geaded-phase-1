const { User, Voucher, Gift } = require("../models");
const { Op } = require("sequelize");
const { comparePassword } = require("../Helper/bcryptjs");
const { createToken } = require("../Helper/jwt");
class Controllers {
  static async register(req, res, next) {
    try {
      //   console.log(req.body);
      const user = await User.create(req.body);

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error.name);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "InvalidEmail" };
      if (!password) throw { name: "InvalidPassword" };

      const user = await User.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });
      if (!user) throw { name: "Unauthorized" };

      const compare = comparePassword(password, user.password);
      if (!compare) throw { name: "Unauthorized" };

      const token = createToken({ id: user.id });
      res.status(200).json({ token });
    } catch (error) {
      console.log(error.name);
      next(error);
    }
  }

  // vouchers
  static async vouchers(req, res, next) {
    try {
      const vouchers = await Voucher.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      // console.log(vouchers);

      res.status(200).json(vouchers);
    } catch (error) {
      console.log(error.name);
      next(error);
    }
  }

  // gift
  static async gift(req, res, next) {
    try {
      const user = req.user;
      const { voucherId } = req.params;
      let { message, amount, receiverId } = req.body;
      if (!message) throw { name: "invalidMsg" };
      if (amount == "") {
        amount = 0;
      }

      const voucher = await Voucher.findByPk(voucherId);
      if (voucher) throw { name: "NotFounds" };
      console.log(voucher);

      const data = await Gift.create({ message: message, senderId: user.id, amount, voucherId: voucherId, receiverId: receiverId });

      res.status(201).json({ id: data.id, message: data.message, senderId: data.senderId, amount: data.amount, voucherId: data.voucherId, receiverId: data.receiverId, status: data.status });
    } catch (error) {
      console.log(error);
      console.log(error.name);
      next(error);
    }
  }

  // listGift
  static async listGift(req, res, next) {
    try {
      const data = await Gift.findAll({
        where: {
          receiverId: {
            [Op.eq]: req.user.id,
          },
        },
        include: {
          model: Voucher,
        },
      });
      console.log(data);

      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      console.log(error.name);
      next(error);
    }
  }

  // updateGift
  static async updateGift(req, res, next) {
    try {
      const { id } = req.params;
      const { message, amount, receiverId } = req.body;
      await Gift.update(
        { message, amount, receiverId },
        {
          where: {
            id: id,
          },
        }
      );

      const data = await Gift.findByPk(id, {
        attributes: { exclude: ["updatedAt", "createdAt"] },
      });
      if (!data) throw { name: "NotFounds" };

      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      console.log(error.name);
      next(error);
    }
  }

  // deleteGift
  static async deleteGift(req, res, next) {
    try {
      const { id } = req.params;
      await Gift.destroy({
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      });

      res.status(200).json({ message: "Gift has been deleted" });
    } catch (error) {
      console.log(error);
      console.log(error.name);
      next(error);
    }
  }

  // patchGift
  static async patchGift(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.user.id);
      await Gift.update(
        { status: "claim" },
        {
          where: {
            id: {
              [Op.eq]: id,
            },
          },
        }
      );

      res.status(200).json({ message: "Gift has been claimed" });
    } catch (error) {
      console.log(error);
      console.log(error.name);
      next(error);
    }
  }
}

module.exports = Controllers;
