'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('petugas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,

        type: Sequelize.STRING
      },
      password: {
        allowNull: false,

        type: Sequelize.STRING
      },
      nama_petugas: {
        allowNull: false,

        type: Sequelize.STRING
      },
      level: {
        allowNull: false,

        type: Sequelize.ENUM(["admin", "petugas"]),
        // values: ["admin", "petugas"]
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('petugas');
  }
};