"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hero.hasMany(models.Favourite, { foreignKey: "heroId" });
    }
  }
  Hero.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name cant null",
          },
          notEmpty: {
            msg: "name cant empty",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "type cant null",
          },
          notEmpty: {
            msg: "type cant empty",
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
      modelName: "Hero",
    }
  );
  return Hero;
};
