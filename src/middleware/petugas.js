function petugasMid(req, res, next) {
  try {
    if (req.additional.role === "petugas" || req.additional.role === "admin") {
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
