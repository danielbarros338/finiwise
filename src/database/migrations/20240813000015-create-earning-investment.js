'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('earningInvestments', {
      earningInvestmentId: {
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
      investmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'investments',
          key: 'investmentId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('earningInvestments');
  }
};
