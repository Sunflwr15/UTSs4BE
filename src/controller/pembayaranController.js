const dayjs = require("dayjs");
const models = require("../models");
const dataPembayaran = require("../models").pembayaran;
const dataSiswa = require("../models").siswa;
const dataPetugas = require("../models").petugas;
const dataSpp = require("../models").spp;

async function getPembayaran(req, res) {
  try {
    const data = await dataPembayaran.findAndCountAll({
      attributes: [
        "id_petugas",
        "nisn",
        "tgl_dibayar",
        "bulan_dibayar",
        "tahun_dibayar",
        "id_spp",
        ["jumlah_bayar", "nominal"],
      ],
      include: [
        {
          model: models.petugas,
          require: true,
          as: "petugas",
          attributes: ["nama_petugas", ["level", "role"]],
        },
        {
          model: models.siswa,
          require: true,
          as: "siswa",
        //   attributes: ["nama_petugas", "level"],
        },
      ],
    });
    res.json({
      status: "Success",
      msg: "Menampilkan semua data pembayaran",
      response: data.rows,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      msg: "Terjadi kesalahan pada backend",
    });
  }
}
async function createPembayaran(req, res) {
  try {
    const {
      //   id_petugas,
      nisn,
      tgl_dibayar,
      tahun_dibayar,
      bulan_dibayar,
      id_spp,
      jumlah_bayar,
    } = req.body;
    // console.log(req.body);
    console.log([nisn, id_spp]);
    const tanggal = new Date();
    const tanggalPembayaran = dayjs(tanggal).format("YYYY-MM-DD");
    const siswa = await dataSiswa.findOne({ where: { nisn: nisn } });
    const petugas = await dataPetugas.findOne({ where: { id: req.id } });
    if (nisn === null || nisn !== siswa?.nisn) {
      console.log(nisn);
      return res.json({
        status: "Failed",
        msg: "nisn salah",
      });
    }
    // else if (id_spp !== siswa?.id_spp) {
    //   return res.json({
    //     status: "Failed",
    //     msg: "Input Spp Salah",
    //   });
    // }
    // await dataPembayaran.create({
    //   id_petugas: req.id,
    //   nisn,
    //   tgl_dibayar: tanggalPembayaran,
    //   tahun_dibayar,
    //   bulan_dibayar,
    //   id_spp,
    //   jumlah_bayar,
    // });
    return res.json({
      status: "Success",
      msg: `Pembayaran berhasil untuk siswa ${siswa.nama}, pembayaran dilakukan oleh petugas ${petugas.nama_petugas}`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      msg: "Terjadi kesalahan pada backend",
      err: error,
    });
  }
}

module.exports = { getPembayaran, createPembayaran };
