const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtValidateMid = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if (!authorization)
    return res.status(401).json({
      msg: "Unauthorized",
    });
  const bearerHeader = authorization.split(" ");
  const token = bearerHeader[1];
  jwt.verify(token, process.env.JWT_SCRIPT, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({
        status: "Fail",
        err: err,
      });
    } else {
      console.log("TES");
      req.id = decoded.id;
      req.nama = decoded.nama;
      req.namaPetugas = decoded.namaPetugas;
      req.level = decoded.level;
      req.nis = decoded.nis;
      next();
    }
  });
};

module.exports = { jwtValidateMid };
