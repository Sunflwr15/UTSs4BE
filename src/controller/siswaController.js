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

module.exports = { getSiswaList };
