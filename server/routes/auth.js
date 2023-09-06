const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  getDoctor,
  updatePassword,
  getDoctorReset,
} = require("../controllers/auth");
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/doctor").post(getDoctor);
router.route("/getDoctorReset").post(getDoctorReset);
router.route("/updateUser").post(updatePassword);

module.exports = router;
