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
      siswa.belongsTo(models.spp, {
        as: "id_spp",
        foreignKey: "id_spp",
      });
      siswa.belongsTo(models.kelas, { as: "id_kelas", foreignKey: "id_kelas" });
      siswa.hasMany(models.pembayaran, { as: "nisn", foreignKey: "nisn" });
      siswa.hasMany(models.pembayaran, { as: "nisn", foreignKey: "nisn" });
    }
  }
  siswa.init(
    {
      nisn: DataTypes.STRING,
      nis: DataTypes.STRING,
      nama: DataTypes.STRING,
      id_kelas: DataTypes.INTEGER,
      alamat: DataTypes.STRING,
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
