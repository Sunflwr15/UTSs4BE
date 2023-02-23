'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pembayaran.belongsTo(models.siswa, {as: "nisn", foreignKey: "nisn"})
      pembayaran.belongsTo(models.siswa, {as: "id_spp", foreignKey: "id_spp"})
    }
  }
  pembayaran.init({
    id_pembayaran: DataTypes.INTEGER,
    id_petugas: DataTypes.INTEGER,
    nisn: DataTypes.STRING,
    tgl_bayar: DataTypes.DATE,
    bulan_dibayar: DataTypes.STRING,
    tahun_dibayar: DataTypes.STRING,
    id_spp: DataTypes.INTEGER,
    jumlah_bayar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pembayaran',
  });
  return pembayaran;
};