"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("siswas", {
      nisn: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      nis: {
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      id_kelas: {
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          as: "id_kelas",
          key: "id_kelas",
          model: "kelas",
        },
        type: Sequelize.INTEGER,
      },
      alamat: {
        allowNull: false,

        type: Sequelize.TEXT,
      },
      no_telp: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      id_spp: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          as: "id",
          key: "id_spp",
          model: "spps",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("siswas");
  },
};
