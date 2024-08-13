'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('levels', [
      {
        name: 'Não Essencial',
        code: 'NES',
        classification: 0,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Essencial',
        code: 'ESS',
        classification: 1,
        createdAt: new Date(),
        updatedAt: null
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('levels', null, {})
  }
};
