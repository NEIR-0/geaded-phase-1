"use strict";
const { createPassword } = require("../Helper/bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = [
      {
        email: "admin@gmail.com",
        password: createPassword("admin"),
        createdAt: "2023-11-06T03:05:34.366Z",
        updatedAt: "2023-11-06T03:05:34.366Z",
      },
    ];
    await queryInterface.bulkInsert("Users", user);

    const voucher = require("../hacktiv_voucher.json");
    voucher.forEach((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    // console.log(voucher);
    await queryInterface.bulkInsert("Vouchers", voucher);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Vouchers", null, {});
  },
};
