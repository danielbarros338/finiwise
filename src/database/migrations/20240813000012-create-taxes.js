'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('taxes', {
      taxId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      revenueId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'revenues',
          key: 'revenueId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      publicPartition: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('taxes');
  }
};
