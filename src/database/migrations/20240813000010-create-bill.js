'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('bills', {
      billId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
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
      company: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fullValue: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('bills');
  }
};
