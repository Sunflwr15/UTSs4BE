const express = require('express');
const { getSiswaList } = require('../controller/siswaController');
const router = express.Router();

router.get("/getlistSiswa", getSiswaList)
module.exports = router;
