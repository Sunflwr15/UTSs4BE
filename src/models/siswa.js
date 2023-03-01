"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      siswa.belongsTo(models.spp, { as: "spp", foreignKey: "id_spp" });
      siswa.belongsTo(models.kelas, { as: "kelas", foreignKey: "id_kelas" });
      siswa.hasMany(models.pembayaran, {
        as: "siswa",
        foreignKey: "nisn",
      });
      siswa.hasMany(models.pembayaran, {
        as: "idspp",
        foreignKey: "id_spp",
      });
    }
  }
  siswa.init(
    {
      nisn: DataTypes.STRING,
      nis: DataTypes.STRING,
      nama: DataTypes.STRING,
      id_kelas: DataTypes.INTEGER,
      alamat: DataTypes.TEXT,
      no_telp: DataTypes.STRING,
      id_spp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "siswa",
    }
  );
  return siswa;
};
