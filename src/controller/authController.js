const dataPetugas = require("../models").petugas;
const jwt = require("jsonwebtoken");
const dataSiswa = require("../models").siswa;
const models = require("../models");

async function loginSiswa(req, res) {
  try {
    const { nama, nis, role } = req.body;
    console.log(nama, nis, role);
    const siswa = await dataSiswa.findOne({
      where: { nis: nis },
      attributes: ["id", "nisn", "nis", "nama", "alamat", "no_telp"],
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
    console.log(siswa);
    const token = jwt.sign(
      {
        id: siswa?.id,
        name: siswa?.nama,
        additional: { nis: siswa?.nis },
      },
      process.env.JWT_SCRIPT,
      { expiresIn: "7d" }
    );
    if (siswa === null) {
      return res.status(422).json({
        status: "failed",
        msg: "Siswa tidak ditemukan",
      });
    } else {
      return res.json({
        status: "success",
        msg: "login berhasil",
        token: token,
        response: siswa,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "Terjadi kesalahan pada backend",
    });
  }
}
async function authMe(req, res) {
  try {
    // const { nama, nis, role } = req.body;
    const { nis } = req.additional;
    console.log(nama, nis, role);
    const siswa = await dataSiswa.findOne({
      where: { nis: nis },
      attributes: ["id", "nisn", "nis", "nama", "alamat", "no_telp"],
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
    console.log(siswa);
    const token = jwt.sign(
      {
        id: siswa?.id,
        name: siswa?.nama,
        additional: { nis: siswa?.nis },
      },
      process.env.JWT_SCRIPT,
      { expiresIn: "7d" }
    );
    if (siswa === null) {
      return res.status(422).json({
        status: "failed",
        msg: "Siswa tidak ditemukan",
      });
    } else {
      return res.json({
        status: "success",
        msg: "login berhasil",
        token: token,
        response: siswa,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "Terjadi kesalahan pada backend",
    });
  }
}

async function loginPetugas(req, res) {
  try {
    const { nama, nis, role } = req.body;
    const petugas = await dataPetugas.findOne({
      where: { username: nama, password: nis, level: role },
    });
    const token = jwt.sign(
      {
        id: petugas?.id,
        name: petugas?.nama_petugas,
        // role: petugas.level,
        additional: { role: petugas?.level },
      },
      process.env.JWT_SCRIPT,
      { expiresIn: "7d" }
    );
    if (petugas === null) {
      return res.status(422).json({
        status: "failed",
        msg: "Petugas tidak ditemukan",
      });
    } else {
      return res.json({
        status: "success",
        msg: "login berhasil",
        token: token,
        response: petugas,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "Terjadi kesalahan pada backend",
    });
  }
}

module.exports = { loginSiswa, loginPetugas, authMe };
