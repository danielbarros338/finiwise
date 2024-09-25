'use strict';

const { where } = require("sequelize");
const dotenv = require('dotenv');
const { pbkdf2Sync } = require('crypto');

dotenv.config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.rawSelect(
      process.env.ADMIN_TABLE,
      { where: { user: process.env.ADMIN_USER }},
      ['userId']
    );

    if (users) return;

    const password = pbkdf2Sync(
      process.env.ADMIN_PASSWORD,
      process.env.CRYPT_SALT,
      Number(process.env.CRYPT_ITERATIONS),
      Number(process.env.CRYPT_KEY_LENGTH),
      process.env.CRYPT_ALG
    ).toString('hex');

    await queryInterface.bulkInsert('users', [{
      user: process.env.ADMIN_USER,
      email: process.env.ADMIN_EMAIL,
      password,
      createdAt: new Date(),
      updatedAt: null
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', null , { where: { user: 'admin' }})
  }
};
