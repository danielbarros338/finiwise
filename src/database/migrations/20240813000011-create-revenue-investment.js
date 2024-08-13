'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('revenueInvestments', {
      revenueInvestmentId: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      revenueId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'revenues',
          key: 'revenueId'
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
    return await queryInterface.dropTable('revenueInvestments');
  }
};
