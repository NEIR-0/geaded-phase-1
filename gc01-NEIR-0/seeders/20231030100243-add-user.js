'use strict';
const { hashing } = require("../Helper/bcryptjs") // bcryptjs

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require("../data/admin.json").map(user => {
      delete user.id
      user.password = hashing(user.password) // hashing bcryptjs
      user.createdAt = new Date()
      user.updatedAt = new Date()
      return user
    })

    await queryInterface.bulkInsert("Users", users)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
