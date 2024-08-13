'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Wallet = await queryInterface.createTable('wallets', {
      walletId: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.DOUBLE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'userId'
        },
        onUpdate: 'CASCADE'
      }
    });

    return Wallet;
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('wallets');
  }
};
