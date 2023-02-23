"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class spp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spp.hasMany(models.siswa, { as: "siswa", foreignKey: "id_spp" });
    }
  }
  spp.init(
    {
      id_spp: DataTypes.INTEGER,
      tahun: DataTypes.INTEGER,
      nominal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "spp",
    }
  );
  return spp;
};
