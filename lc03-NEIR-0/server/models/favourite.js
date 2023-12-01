"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User, { foreignKey: "userId" });
      Favourite.belongsTo(models.Hero, { foreignKey: "heroId", as: "hero" });
    }
  }
  Favourite.init(
    {
      heroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "heroId cant null",
          },
          notEmpty: {
            msg: "heroId cant empty",
          },
        },
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "userId cant null",
          },
          notEmpty: {
            msg: "userId cant empty",
          },
        },
      },
      role: DataTypes.STRING,
      power: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Favourite",
    }
  );
  return Favourite;
};
