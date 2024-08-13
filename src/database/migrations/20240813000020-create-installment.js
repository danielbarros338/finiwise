'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('installments', {
      installmentId: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cardDebitId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cardDebits',
          key: 'cardDebitId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      extraJobId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'extraJobs',
          key: 'extraJobId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      financingId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'financings',
          key: 'financingId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fullValue: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      totalInstallment: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fees: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('installments');
  }
};
