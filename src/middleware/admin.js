function adminMid(req, res, next) {
  try {
    if (req.additional.role !== "admin") {
        // console.log(req);
      return res.json({
        msg: "Anda tidak memiliki hak akses untuk fitur ini",
        // role: req.additional
      });
    } else return next();
  } catch (error) {}
}

module.exports = adminMid;
