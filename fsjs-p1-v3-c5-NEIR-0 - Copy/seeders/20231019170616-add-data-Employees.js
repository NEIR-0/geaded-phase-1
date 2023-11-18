'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/employees.json", "utf-8"))
    
    data.forEach(el => {
      el.createdAt = new Date(),
      el.updatedAt = new Date()
    });

    await queryInterface.bulkInsert("Employees", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
