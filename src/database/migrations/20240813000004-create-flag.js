'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('flagCards', {
      flagId: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nameFlag: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('flagCards');
  }
};
