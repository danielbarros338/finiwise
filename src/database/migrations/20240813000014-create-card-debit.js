'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('cardDebits', {
      cardDebitId: {
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
      cardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cards',
          key: 'cardId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      paymentType: {
        type: Sequelize.CHAR(2),
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
    return await queryInterface.dropTable('cardDebits');
  }
};
