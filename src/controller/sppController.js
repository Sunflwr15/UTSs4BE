const dataSpp = require("../models").spp;
async function getSppList(req, res) {
  try {
    const spp = await dataSpp.findAndCountAll();
    // console.log(Spp);
    res.status(200).json({
      status: "success",
      msg: "List Spp Ditemukan",
      pagination: {
        totalData: spp.count,
      },
      response: spp.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "terdapat kesalahan pada backend",
    });
  }
}

async function createSpp(req, res) {
  try {
    const payload = req.body;
    await dataSpp.create(payload);
    res.status(200).json({
      status: "success",
      msg: "Spp telah didaftarkan",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "terdapat kesalahan pada backend",
    });
  }
}

async function updateSpp(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const spp = await dataSpp.findByPk(id);
    console.log(spp);
    if (spp == null) {
      res.status(200).json({
        status: "success",
        msg: "Spp dengan id ini tidak ditemukan",
      });
    }
    await dataSpp.update(payload, { where: { id } });
    res.status(200).json({
      status: "success",
      msg: "Berhasil mengubah data Spp",
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

async function deleteSpp(req, res) {
  try {
    const { id } = req.params;
    await dataSpp.destroy({ where: { id: id } });
    res.status(201).json({
      status: "success",
      msg: "Data Spp berhasil dihapus",
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
  getSppList,
  createSpp,
  updateSpp,
  deleteSpp,
};
