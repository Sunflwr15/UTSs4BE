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
        references: {
          as: "id_petugas",
          key: "id_petugas",
          model: "petugas",
        },
      },
      nisn: {
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          as: "nisn",
          key: "nisn",
          model: "siswas",
        },
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          as: "id_spp",
          key: "id_spp",
          model: "siswas",
        },
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
