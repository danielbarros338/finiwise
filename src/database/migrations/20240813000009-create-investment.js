'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('investments', {
      investimentId: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      instituition: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unitaireValue: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      liquidity: {
        type: Sequelize.CHAR(3),
        allowNull: false
      },
      revenueInvestmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'revenueInvestments',
          key: 'revenueInvestmentId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      earningInvestmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'earningInvestments',
          key: 'earningInvestmentId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('investments');
  }
};
