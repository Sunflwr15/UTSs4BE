const express = require("express");
const { login, loginPetugas, authMe } = require("../controller/authController");
const {
  getKelasList,
  createKelas,
  deleteKelas,
  updateKelas,
} = require("../controller/kelasController");
const {
  createPembayaran,
  getPembayaran,
} = require("../controller/pembayaranController");
const {
  getPetugasList,
  createPetugas,
  deletePetugas,
  updatePetugas,
  getDetailPetugas,
} = require("../controller/petugasController");
const {
  getSiswaList,
  createSiswa,
  deleteSiswa,
  updateSiswa,
  getDetailSiswa,
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
const ValidationResult = require("../middleware/validationResult");
const { CreateUserValidator } = require("../validators/userValidator");
const router = express.Router();

// Login
router.post("/login", login);

router.use(jwtValidateMid);
router.get("/authme", authMe);
// console.log(jwtValidateMid)
// router.use(petugasMid);
// Pembayaran
router.get("/getListPembayaran", getPembayaran);
router.post("/pembayaran", createPembayaran);

// router.use(adminMid);
// Siswa
router.get("/getlistSiswa", getSiswaList);
router.get("/getDetailSiswa/:id", getDetailSiswa);
router.post("/createSiswa", CreateUserValidator, ValidationResult, createSiswa);
router.delete("/deleteSiswa/:id", deleteSiswa);
router.put("/updateSiswa/:id", updateSiswa);
//Petugas
router.get("/getlistPetugas", getPetugasList);
router.get("/getDetailPetugas/:id", getDetailPetugas);
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
