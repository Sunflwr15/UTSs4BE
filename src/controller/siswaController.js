const dataUser = require("../models").siswa;

async function getSiswaList(req, res) {
  try {
    const user = await dataUser.findAndCountAll();
    // console.log(user);
    res.status(200).json({
      status: "success",
      msg: "List User Ditemukan",
      pagination: {
        totalData: user.count,
      },
      response: user.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "terdapat kesalahan pada backend",
    });
  }
}

async function createSiswa(req, res) {
  try {
    // const nisnRandom = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    // const nisRandom = Math.floor(Math.random() * 100000000) + 1;
    // const { nama, id_kelas, alamat, no_telp, id_spp } = req.body;
    // console.log({
    //   nisn: nisnRandom,
    //   nis: nisRandom,
    //   nama,
    //   id_kelas,
    //   alamat,
    //   no_telp,
    //   id_spp,
    // });
    // await dataUser.create({
    //   nisn: nisnRandom,
    //   nis: nisRandom,
    //   nama,
    //   id_kelas,
    //   alamat,
    //   no_telp,
    //   id_spp,
    // });
    // console.log(user);
    const payload = req.body;
    await dataUser.create(payload);
    res.status(200).json({
      status: "success",
      msg: "Siswa telah didaftarkan",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "terdapat kesalahan pada backend",
    });
  }
}

async function updateSiswa(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const user = await dataUser.findByPk(id);
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

module.exports = { getSiswaList, createSiswa, deleteSiswa, updateSiswa };
