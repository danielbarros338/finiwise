'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('transaction_history', {
      transactionHistoryId: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'types',
          key: 'typeId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      walletId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'wallets',
          key: 'walletId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      balance: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('transaction_history');
  }
};
