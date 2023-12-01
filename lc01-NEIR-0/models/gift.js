"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gift.belongsTo(models.User, {
        foreignKey: "voucherId",
        as: "voucher"
      });
      Gift.belongsTo(models.Voucher, {
        foreignKey: "senderId",
      });
    }
  }
  Gift.init(
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Message is required",
          },
          notEmpty: {
            msg: "Message is required",
          },
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "senderId cant null",
          },
          notEmpty: {
            msg: "senderId cant empty",
          },
        },
      },

      amount: DataTypes.INTEGER,

      voucherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "voucherId cant null",
          },
          notEmpty: {
            msg: "voucherId cant empty",
          },
        },
      },

      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "receiverId is required",
          },
          notEmpty: {
            msg: "receiverId is required",
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Gift",
    }
  );
  return Gift;
};
