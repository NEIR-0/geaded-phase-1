'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: 'authorId'
      }) // taro fk juga di "belongsTo"
      Article.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      }); // taro fk juga di "belongsTo"
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "title can't null"
        },
        notEmpty: {
          msg: "title can't empty"
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull:{
          msg: "content can't null"
        },
        notEmpty: {
          msg: "content can't empty"
        },
      },
    },
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};