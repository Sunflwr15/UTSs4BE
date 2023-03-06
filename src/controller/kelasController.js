const dataKelas = require("../models").kelas;
async function getKelasList(req, res) {
  try {
    const Kelas = await dataKelas.findAndCountAll();
    // console.log(Kelas);
    res.status(200).json({
      status: "success",    
      msg: "List Kelas Ditemukan",
      pagination: {
        totalData: Kelas.count,
      },
      response: Kelas.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "terdapat kesalahan pada backend",
    });
  }
}

async function createKelas(req, res) {
  try {
    const payload = req.body;
    await dataKelas.create(payload);
    res.status(200).json({
      status: "success",
      msg: "Kelas telah didaftarkan",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "terdapat kesalahan pada backend",
    });
  }
}

async function updateKelas(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const Kelas = await dataKelas.findByPk(id);
    console.log(Kelas);
    if (Kelas == null) {
      res.status(200).json({
        status: "success",
        msg: "Kelas dengan id ini tidak ditemukan",
      });
    }
    await dataKelas.update(payload, { where: { id } });
    res.status(200).json({
      status: "success",
      msg: "Berhasil mengubah data Kelas",
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

async function deleteKelas(req, res) {
  try {
    const { id } = req.params;
    await dataKelas.destroy({ where: { id: id } });
    res.status(201).json({
      status: "success",
      msg: "Data Kelas berhasil dihapus",
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
  getKelasList,
  createKelas,
  updateKelas,
  deleteKelas,
};
