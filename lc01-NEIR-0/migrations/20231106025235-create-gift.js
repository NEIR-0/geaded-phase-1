"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Gifts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      voucherId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Vouchers",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "unclaimed",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Gifts");
  },
};
