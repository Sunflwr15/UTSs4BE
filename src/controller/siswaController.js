const dataUser = require("../models").siswa;
const models = require("../models");

async function getSiswaList(req, res) {
  try {
    const user = await dataUser.findAndCountAll({
      // where: { nama: nama, nis: nis },
      attributes: ["id", "nisn", "nis", "nama", "alamat", "no_telp", "level"],
      include: [
        {
          as: "kelas",
          model: models.kelas,
          attributes: ["nama_kelas"],
        },
        {
          as: "spp",
          model: models.spp,
          attributes: ["tahun", "nominal"],
        },
      ],
    });
    // console.log(user);
    res.status(200).json({
      status: "success",
      msg: "List User Ditemukan",
      req: req.level,
      pagination: {
        totalData: user.count,
      },
      response: user.rows,
    });
  } catch (error) {
    console.log(error);
    // res.json({
    //   msg: "terdapat kesalahan pada backend",
    // });
  }
}
async function getDetailSiswa(req, res) {
  try {
    const { id } = req.params;
    const user = await dataUser.findOne({
      where: { id: id },
      attributes: ["id", "nisn", "nis", "nama", "alamat", "no_telp", "level"],
      include: [
        {
          as: "kelas",
          model: models.kelas,
          attributes: ["nama_kelas", "id"],
        },
        {
          as: "spp",
          model: models.spp,
          attributes: ["tahun", "nominal", "id"],
        },
      ],
    });
    // console.log(user);
    res.status(200).json({
      status: "success",
      msg: "Siswa ditemukan",
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

async function createSiswa(req, res) {
  try {
    const payload = req.body;

    await dataUser.create(payload);
    console.log(payload);
    res.status(200).json({
      status: "success",
      msg: "Siswa telah didaftarkan",
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({
      status: "failed",
      msg: "terdapat kesalahan pada backend",
      error,
    });
  }
}

async function updateSiswa(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const user = await dataUser.findByPk(id);
    // console.log("id", id);
    // console.log("payload", payload);
    console.log(user);
    if (user == null) {
      res.status(200).json({
        status: "success",
        msg: "Siswa dengan id ini tidak ditemukan",
      });
    }
    await dataUser.update(payload, { where: { id } });
    res.status(200).json({
      status: "success",
      msg: "Berhasil mengubah data siswa",
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

async function deleteSiswa(req, res) {
  try {
    const { id } = req.params;
    const siswa = await dataUser.findByPk(id);
    await dataUser.destroy({ where: { id: id } });
    if (siswa === null)
      return res.json({
        status: "failed",
        msg: "Data siswa dengan id ini tidak ditemukan",
      });
    res.status(201).json({
      status: "success",
      msg: "Data siswa berhasil dihapus",
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
  getSiswaList,
  getDetailSiswa,
  createSiswa,
  deleteSiswa,
  updateSiswa,
};
