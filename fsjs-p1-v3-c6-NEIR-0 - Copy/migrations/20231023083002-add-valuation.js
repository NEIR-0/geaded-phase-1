'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Startups', 'valuation', { type: Sequelize.INTEGER });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Startups', 'valuation', { /* query options */ });
  }
};
