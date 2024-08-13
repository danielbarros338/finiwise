'use strict';

const { where } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      user: 'admin',
      email: 'danielbarros.dev.contato@gmail.com',
      password: 'admin',
      createdAt: new Date(),
      updatedAt: null
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', null , { where: { user: 'admin' }})
  }
};
