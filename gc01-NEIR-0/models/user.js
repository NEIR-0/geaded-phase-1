'use strict';
const {
  Model
} = require('sequelize');
const {
  hashing
} = require("../Helper/bcryptjs") // bcryptjs

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Article, {
        foreignKey: 'authorId'
      }); // taro fk juga di "hasMany"
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull:{
          msg: "email can't null"
        },
        notEmpty: {
          msg: "email can't empty"
        },
        isEmail: {
          msg: "must be email"
        }
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "password can't null"
        },
        notEmpty: {
          msg: "password can't empty"
        },
        len: { // minimal length
          args: [2],
          msg: "min password 2 lengths"
        }
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "staff"
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  // hooks
  User.addHook('beforeCreate', (instance, options) => {
    instance.password = hashing(instance.password) // hashing bcryptjs
  });
  return User;
};