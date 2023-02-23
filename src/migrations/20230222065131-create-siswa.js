"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("siswa", {
      nisn: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.CHAR(10),
      },
      nis: {
        allowNull: false,

        type: Sequelize.CHAR(8),
      },
      nama: {
        allowNull: false,

        type: Sequelize.STRING(35),
      },
      id_kelas: {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "kelas",
          key: "id_kelas",
          as: "id_kelas",
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      alamat: {
        allowNull: false,

        type: Sequelize.TEXT,
      },
      no_telp: {
        allowNull: false,

        type: Sequelize.STRING(13),
      },
      id_spp: {
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "spp",
          key: "id_spp",
          as: "id_spp",
        },
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("siswa");
  },
};
