const dataPetugas = require("../models").petugas;
const jwt = require("jsonwebtoken");
const dataSiswa = require("../models").siswa;
const models = require("../models");

async function login(req, res) {
  try {
    const { nama, nis, role } = req.body;
    // console.log("level:", req.level);
    if (role === "petugas" || role === "admin") {
      const petugas = await dataPetugas.findOne({
        where: { username: nama, password: nis, level: role },
      });
      const tokenPetugas = jwt.sign(
        {
          id: petugas?.id,
          nama: petugas?.nama_petugas,
          level: petugas?.level,
          nis: petugas?.password
        },
        process.env.JWT_SCRIPT,
        { expiresIn: "7d" }
      );
      if (!petugas) {
        return res.status(422).json({
          status: "failed",
          msg: "petugas tidak ditemukan",
          // data: siswa || petugas,
        });
      } else {
        return res.json({
          status: "success",
          msg: "login berhasil",
          token: tokenPetugas,
          data: petugas,
        });
      }
    }
    if (role === "siswa") {
      const siswa = await dataSiswa.findOne({
        where: { nama: nama, nis: nis },
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
      // console.log(siswa.level);
      const tokenSiswa = jwt.sign(
        {
          id: siswa?.id,
          nama: siswa?.nama,
          level: siswa?.level,
          nis: siswa?.nis,
        },
        process.env.JWT_SCRIPT,
        { expiresIn: "7d" }
      );
      if (!siswa) {
        return res.status(422).json({
          status: "failed",
          msg: "siswa tidak ditemukan",
          // data: siswa || petugas,
        });
      } else {
        return res.json({
          status: "success",
          msg: "login berhasil",
          token: tokenSiswa,
          data: siswa,
        });
      }
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
    console.log(req.id, req.nama, req.level, req.nis);
    if (req.level === "petugas" || req.level === "admin") {
      const petugas = await dataPetugas.findOne({
        where: { username: req.nama, password: req.nis, level: req.level },
      });
      if (petugas === null) {
        return res.json({
          status: "failed",
          msg: "petugas tidak ditemukan",
          // data: siswa || petugas,
        });
      } else {
        return res.json({
          status: "success",
          msg: "login berhasil",
          data: petugas,
        });
      }
    }
    if (req.level === "siswa") {
      const siswa = await dataSiswa.findOne({
        where: { nama: req.nama, nis: req.nis },
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
      if (siswa === null) {
        return res.json({
          status: "failed",
          msg: "siswa tidak ditemukan",
        });
      } else {
        return res.json({
          status: "success",
          msg: "login berhasil",
          data: siswa
        });
        console.log("tes");
      }
    }
    return res.json({
      req: req.level
    })
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "Terjadi kesalahan pada backend",
    });
  }
}
module.exports = { login, authMe };
