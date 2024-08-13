'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('flagCards', [
      {
        nameFlag: 'Mastercard',
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nameFlag: 'Visa',
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nameFlag: 'American Express',
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nameFlag: 'Diners Club',
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nameFlag: 'Hipercard',
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nameFlag: 'Elo',
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nameFlag: 'Rede Shop',
        createdAt: new Date(),
        updatedAt: null
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('flagCards', null, {})
  }
};
