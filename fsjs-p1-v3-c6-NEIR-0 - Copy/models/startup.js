'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Startup extends Model {
    static associate(models) {  // IMPORTANT!!
      Startup.belongsTo(models.Incubator) // 1 TO MANY
    }

    // getter
    get age(){
      const newDate = new Date().getFullYear()
      const foundDate = new Date(this.dateFound).getFullYear()
      let age = newDate - foundDate
      return age
    }

    get formatValuation(){
      if(!this.valuation){
        return "-"
      }

      const format = this.valuation.toLocaleString("id-ID");
      return `Rp. ${format}`
    }

    static getStartUpByRoleOfFounder(role, Incubator){
      let data;

      if(!role || role === "all"){
        data = Startup.findAll({
          include:{
              model: Incubator
          },
          order:[
            ['valuation', 'DESC']
          ]
        })
      }
      else{
        data = Startup.findAll({
          where: {
            roleOfFounder: role
          },
          include:{
              model: Incubator
          },
          order:[
            ['valuation', 'DESC']
          ]
        })
      }

      return data
    }
  }
  Startup.init({
    startUpName: {
      type: DataTypes.STRING, // tambahin type
      allowNull:false, //kalo mau pake "notNull" harus ada "allowNull:false"
      validate: {
        notNull: {
          args: true,
          msg: "startUpName gak boleh null"
        },
        notEmpty: {
          args: true,
          msg: "startUpName gak boleh kosong"
        },
      },
    }, 
    

    founderName: {
      type: DataTypes.STRING, // tambahin type
      allowNull:false, //kalo mau pake "notNull" harus ada "allowNull:false"
      validate: {
        notNull: {
          args: true,
          msg: "founderName gak boleh null"
        },
        notEmpty: {
          args: true,
          msg: "founderName gak boleh kosong"
        },
      },
    },

    dateFound: {
      type: DataTypes.DATE, // tambahin type
      allowNull:false, //kalo mau pake "notNull" harus ada "allowNull:false"
      validate: {
        notNull: {
          args: true,
          msg: "dateFound gak boleh null"
        },
        notEmpty: {
          args: true,
          msg: "dateFound gak boleh kosong"
        },

        minimumage(values){
          const nowDate = new Date().getFullYear() - 5 // min 5 tahun
          const startUpYear = new Date(values).getFullYear() // values itu data yang kita dapat dari form create
          console.log(nowDate, startUpYear);

          if( startUpYear > nowDate){
            throw new Error("minimal perusahaan berdiri 5 tahun"); // kalo custom kita pake "throw" bukan "msg"
          }
        }
      },
    },

    educationOfFounder: {
      type: DataTypes.STRING, // tambahin type
      allowNull:false, //kalo mau pake "notNull" harus ada "allowNull:false"
      validate: {
        notNull: {
          args: true,
          msg: "educationOfFounder gak boleh null"
        },
        notEmpty: {
          args: true,
          msg: "educationOfFounder gak boleh kosong"
        },
      },
    },
    
    roleOfFounder: {
      type: DataTypes.STRING, // tambahin type
      allowNull:false, //kalo mau pake "notNull" harus ada "allowNull:false"
      validate: {
        notNull: {
          args: true,
          msg: "roleOfFounder gak boleh null"
        },
        notEmpty: {
          args: true,
          msg: "roleOfFounder gak boleh kosong"
        },

        // di scope "validate"
        filterHustler(values){
          // console.log(values, this.educationOfFounder); // bisa pake "this" ?!
          if(values === "Hustler" && this.educationOfFounder !== "S2"){ // bisa pake "this", baru tau gw :V
            throw new Error("Hustler harus S2"); // kalo custom kita pake "throw" bukan "msg"
          }
        }
      },
    },

    IncubatorId: {
      type: DataTypes.INTEGER, // tambahin type 
      allowNull:false, //kalo mau pake "notNull" harus ada "allowNull:false"
      validate: {
        notNull: {
          args: true,
          msg: "IncubatorId gak boleh null"
        },
        notEmpty: {
          args: true,
          msg: "IncubatorId gak boleh kosong"
        },
      },
    },

    // valuation
    valuation: {
      type: DataTypes.INTEGER, // tambahin type
      allowNull:false, //kalo mau pake "notNull" harus ada "allowNull:false"
      validate: {
        notNull: {
          args: true,
          msg: "valuation gak boleh null"
        },
        notEmpty: {
          args: true,
          msg: "valuation gak boleh kosong"
        },
      },
    } 
  }, {
    sequelize,
    modelName: 'Startup',
  });
  return Startup;
};