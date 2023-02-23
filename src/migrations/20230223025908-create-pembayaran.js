"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pembayarans", {
      id_pembayaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      id_petugas: {
        allowNull: false,

        type: Sequelize.INTEGER,
      },
      nisn: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      tgl_dibayar: {
        allowNull: false,

        type: Sequelize.DATE,
      },
      bulan_dibayar: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      tahun_dibayar: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      id_spp: {
        allowNull: false,

        type: Sequelize.INTEGER,
      },
      jumlah_bayar: {
        allowNull: false,

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
    await queryInterface.dropTable("pembayarans");
  },
};
