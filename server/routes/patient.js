const express = require("express");
const router = express.Router();

const {
  getPatients,
  getSpecificPatient,
  getPreviousRefills,
  createPatient,
  createRefill,
  getSpecificRefill,
  getPendingPatient,
  addTrackRecord,
  getDailyRecord,
} = require("../controllers/patient");

router.route("/patients").get(getPatients);
router.route("/specificPatient").post(getSpecificPatient);
router.route("/previousRefills").post(getPreviousRefills);
router.route("/createPatient").post(createPatient);
router.route("/createRefill").post(createRefill);
router.route("/specificRefill").get(getSpecificRefill);
router.route("/pendingPatients").get(getPendingPatient);
router.route("/dailyRecord").post(addTrackRecord);
router.route("/getDailyRecords").post(getDailyRecord);

module.exports = router;
