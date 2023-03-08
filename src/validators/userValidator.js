const { check } = require("express-validator");
const userModel = require("../models").siswa;

const CreateUserValidator = [
  check("nama")
    .isLength({
      min: 1,
    })
    .withMessage("You Must Fill The Field"),
  check("nisn")
    // .isEmail()
    // .withMessage("Email doesn't valid")
    .custom((value) => {
      return userModel
        .findOne({
          where: {
            nisn: value,
          },
        })
        .then((user) => {
          if (user) {
            return Promise.reject("NISN sudah terdaftar");
          }
        });
    }),
  check("nis")
    // .isEmail()
    // .withMessage("Email doesn't valid")
    .custom((value) => {
      return userModel
        .findOne({
          where: {
            nis: value,
          },
        })
        .then((user) => {
          if (user) {
            return Promise.reject("NIS sudah terdaftar");
          }
        });
    }),
  check("no_telp")
    // .isEmail()
    // .withMessage("Email doesn't valid")
    .custom((value) => {
      return userModel
        .findOne({
          where: {
            no_telp: value,
          },
        })
        .then((user) => {
          if (user) {
            return Promise.reject("No. Telepon sudah terdaftar");
          }
        });
    }),
];
const UpdateUserValidator = [
  check("name")
    .isLength({
      min: 1,
    })
    .withMessage("You Must Fill The Field"),
  check("tempatLahir")
    .isLength({
      min: 1,
    })
    .withMessage("You Must Fill The Field"),
  check("date")
    .isLength({
      min: 1,
    })
    .withMessage("You Must Fill The Field"),
];
const UpdatePasswordUserValidator = [
  check("newpassword")
    .isLength({
      min: 8,
    })
    .withMessage("Password must be 8 Character"),
];

module.exports = {
  CreateUserValidator,
  UpdateUserValidator,
  UpdatePasswordUserValidator,
};
