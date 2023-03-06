function petugasMid(req, res, next) {
  try {
    if (req.level === "petugas" || req.level === "admin") {
    //   console.log(req);
      return next();
    } else;
  } catch (error) {
    return res.json({
      msg: "Anda tidak memiliki hak akses untuk fitur ini",
      // role: req.additional
    });
  }
}

module.exports = petugasMid;
