'use strict';
const {
  Model, where
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incubator extends Model {
    static associate(models) { // IMPORTANT!!
      Incubator.hasMany(models.Startup) // 1 on 1, bagian fk
    }
  }
  Incubator.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    location: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Incubator',
  });

  // hooks (BEFORE CREATE)
  Incubator.addHook('beforeCreate', (instances, options) => { // "Incubator", kan nama kelas file ini Incubator
    let newDate = new Date() // new date()
  
    if(instances.level === "International"){
      instances.code = `1992-A-${newDate.getTime()}` // pake "getTime()" biar formatnya "1698054787295"
    }
    else if(instances.level === "National"){
      instances.code = `1994-B-${newDate.getTime()}` // pake "getTime()"
    }
    else if(instances.level === "Province"){
      instances.code = `1996-C-${newDate.getTime()}` // pake "getTime()"
    }
  });

  return Incubator;
};