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
          model: 'card_debits',
          key: 'cardDebitId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      extraJobId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'extra_jobs',
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
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('installments');
  }
};
