'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Startups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startUpName: {
        type: Sequelize.STRING
      },
      founderName: {
        type: Sequelize.STRING
      },
      dateFound: {
        type: Sequelize.DATE
      },
      educationOfFounder: {
        type: Sequelize.STRING
      },
      roleOfFounder: {
        type: Sequelize.STRING
      },
      IncubatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Incubators',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Startups');
  }
};