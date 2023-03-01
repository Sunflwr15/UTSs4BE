const express = require("express");
const { loginSiswa, loginPetugas, authMe } = require("../controller/authController");
const {
  getKelasList,
  createKelas,
  deleteKelas,
  updateKelas,
} = require("../controller/kelasController");
const { createPembayaran, getPembayaran } = require("../controller/pembayaranController");
const {
  getPetugasList,
  createPetugas,
  deletePetugas,
  updatePetugas,
} = require("../controller/petugasController");
const {
  getSiswaList,
  createSiswa,
  deleteSiswa,
  updateSiswa,
} = require("../controller/siswaController");
const {
  getSppList,
  createSpp,
  deleteSpp,
  updateSpp,
} = require("../controller/sppController");
const adminMid = require("../middleware/admin");
const { jwtValidateMid } = require("../middleware/jwt");
const petugasMid = require("../middleware/petugas");
const router = express.Router();

// Login
router.post("/login-siswa", loginSiswa);
router.post("/login-petugas", loginPetugas);
router.post("/authSiswa", authMe);

router.use(jwtValidateMid);

router.use(petugasMid);
// Pembayaran
router.get('/getListPembayaran', getPembayaran)
router.post("/pembayaran", createPembayaran);

router.use(adminMid);
// Siswa
router.get("/getlistSiswa", getSiswaList);
router.post("/createSiswa", createSiswa);
router.delete("/deleteSiswa/:id", deleteSiswa);
router.put("/updateSiswa/:id", updateSiswa);
//Petugas
router.get("/getlistPetugas", getPetugasList);
router.post("/createPetugas", createPetugas);
router.delete("/deletePetugas/:id", deletePetugas);
router.put("/updatePetugas/:id", updatePetugas);
// Spp
router.get("/getListSpp", getSppList);
router.post("/createSpp", createSpp);
router.delete("/deleteSpp/:id", deleteSpp);
router.put("/updateSpp/:id", updateSpp);
// Kelas
router.get("/getListKelas", getKelasList);
router.post("/createKelas", createKelas);
router.delete("/deleteKelas/:id", deleteKelas);
router.put("/updateKelas/:id", updateKelas);
module.exports = router;
