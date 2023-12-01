"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Voucher.hasMany(models.Gift, {
        foreignKey: "voucherId",
      });
    }
  }
  Voucher.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "title cant null",
          },
          notEmpty: {
            msg: "title cant empty",
          },
        },
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "tag cant null",
          },
          notEmpty: {
            msg: "tag cant empty",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "imageUrl cant null",
          },
          notEmpty: {
            msg: "imageUrl cant empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Voucher",
    }
  );
  return Voucher;
};
