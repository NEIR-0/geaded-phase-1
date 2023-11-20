'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/startup.json", "utf-8"))
   data.forEach(el => {
    delete el.id
    el.createdAt = new Date()
    el.updatedAt = new Date()
   });

   await queryInterface.bulkInsert("Startups", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Startups', null, {});
  }
};
