"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const heroes = require("../heroes.json").map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(heroes);

    await queryInterface.bulkInsert("Heros", heroes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Heros", null, {});
  },
};
