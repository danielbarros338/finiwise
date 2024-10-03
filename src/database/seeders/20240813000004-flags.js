'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const flags = [
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
    ];

    const existingRecords = [];

    for (const flag of flags) {
      const result = await queryInterface.rawSelect(
        'flagCards',
        { where: { nameFlag: flag.nameFlag } },
        ['flagId']
      );

      if (result && result.flagId) {
        existingRecords.push(result);
      }
    }

    const newRecords = flags.filter(flag => !existingRecords.includes(flag.flagId));

    if (newRecords.length === 0) return;

    await queryInterface.bulkInsert('flagCards', newRecords);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('flagCards', null, {})
  }
};
