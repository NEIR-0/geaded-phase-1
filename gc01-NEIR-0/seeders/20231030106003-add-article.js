'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const articles = require("../data/news.json").map(article => {
      delete article.id
      article.createdAt = new Date()
      article.updatedAt = new Date()
      return article
    })

    await queryInterface.bulkInsert("Articles", articles)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {})
  }
};
