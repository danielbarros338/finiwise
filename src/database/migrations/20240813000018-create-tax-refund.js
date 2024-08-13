'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('taxRefunds', {
      taxRefundId: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
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
      publicPartition: {
        type: Sequelize.STRING(200),
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
    return await queryInterface.dropTable('taxRefunds');
  }
};
