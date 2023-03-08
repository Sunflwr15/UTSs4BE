const dataPetugas = require("../models").petugas;
const models = require("../models");

async function getPetugasList(req, res) {
  try {
    const petugas = await dataPetugas.findAndCountAll();
    // console.log(Petugas);
    res.status(200).json({
      status: "success",
      // req: req.additional.role,
      msg: "List Petugas Ditemukan",
      pagination: {
        totalData: petugas.count,
      },
      response: petugas.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "terdapat kesalahan pada backend",
    });
  }
}

async function getDetailPetugas(req, res) {
  try {
    const { id } = req.params;
    const user = await dataPetugas.findOne({
      where: { id: id },
    });
    // console.log(user);
    res.status(200).json({
      status: "success",
      msg: "Petugas ditemukan",
      req: req.level,
      pagination: {
        // totalData: user.count,
      },
      response: user,
    });
  } catch (error) {
    console.log(error);
    // res.json({
    //   msg: "terdapat kesalahan pada backend",
    // });
  }
}

async function createPetugas(req, res) {
  try {
    const payload = req.body;
    await dataPetugas.create(payload);
    res.status(200).json({
      status: "success",
      msg: "Petugas telah didaftarkan",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "terdapat kesalahan pada backend",
    });
  }
}

async function updatePetugas(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const petugas = await dataPetugas.findByPk(id);
    console.log(petugas);
    if (petugas == null) {
      res.status(200).json({
        status: "success",
        msg: "Petugas dengan id ini tidak ditemukan",
      });
    }
    await dataPetugas.update(payload, { where: { id } });
    res.status(200).json({
      status: "success",
      msg: "Berhasil mengubah data Petugas",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "terdapat kesalahan pada backend",
      err: error,
    });
  }
}

async function deletePetugas(req, res) {
  try {
    const { id } = req.params;
    await dataPetugas.destroy({ where: { id: id } });
    res.status(201).json({
      status: "success",
      msg: "Data Petugas berhasil dihapus",
    });
  } catch (error) {
    res.json({
      status: "failed",
      msg: "terdapat kesalahan pada backend",
    });
    console.log(error);
  }
}

module.exports = {
  getPetugasList,
  getDetailPetugas,
  createPetugas,
  updatePetugas,
  deletePetugas,
};
