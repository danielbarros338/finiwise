'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const levels = [
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
    ];

    const existingRecords = [];

    for (const level of levels) {
      const result = await queryInterface.rawSelect(
        'levels',
        { where: { code: level.code } },
        ['levelId']
      );

      if (result && result.levelId) {
        existingRecords.push(result);
      }
    }

    const newRecords = levels.filter(level => !existingRecords.includes(level.levelId));

    if (newRecords.length === 0) return;

    await queryInterface.bulkInsert('levels', newRecords);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('levels', null, {});
  }
};
