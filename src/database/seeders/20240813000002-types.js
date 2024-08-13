'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('types', [
      {
        name: 'Contas',
        code: 'CON',
        isFrom: 0,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Investimentos',
        code: 'ING',
        isFrom: 0,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Débitos no cartão',
        code: 'DNC',
        isFrom: 0,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Taxas',
        code: 'TAX',
        isFrom: 0,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Financinamento',
        code: 'FIN',
        isFrom: 0,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Investimentos',
        code: 'ING',
        isFrom: 1,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Bonus',
        code: 'BON',
        isFrom: 1,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Compensações de empresas',
        code: 'CDE',
        isFrom: 1,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Restituição de Taxas',
        code: 'RST',
        isFrom: 1,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        name: 'Trabalho Extra',
        code: 'TRE',
        isFrom: 1,
        createdAt: new Date(),
        updatedAt: null
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('types', null, {})
  }
};
