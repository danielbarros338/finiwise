'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('employementComponsations', {
      employementCompensationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      earningId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'earnings',
          key: 'earningId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      company: {
        type: Sequelize.STRING(200),
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('employementComponsations')
  }
};
