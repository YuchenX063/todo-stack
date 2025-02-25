'use strict';

const { create } = require('../controllers/list.controller');
const importData = require('./import/lists.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const importItem of importData) {
      await queryInterface.bulkInsert('Lists', [{
        id: importItem.id,
        title: importItem.title,
        createdAt: importItem.createdAt ? new Date(importItem.createdAt) : new Date(),
        updatedAt: importItem.updatedAt ? new Date(importItem.updatedAt) : new Date(),
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lists');
  }
};
