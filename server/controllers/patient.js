const Patient = require("../models/Patient");
const Refill = require("../models/Refill");
const DailyRecord = require("../models/DailyRecord");
const { BadRequestError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

// function to get patients
const getPatients = async (req, res) => {
  const patients = await Patient.find({});
  if (!patients) {
    patients = [];
  }
  res.send({ patients });
};

// function to get specific patient
const getSpecificPatient = async (req, res) => {
  const { patientCode } = req.body;
  if (!req.body) {
    throw new BadRequestError("Please enter patient code");
  }
  const patient = await Patient.findOne({ uniqueCode: patientCode });
  if (!patient) {
    throw new BadRequestError(`There is no patient with id ${patientCode}`);
  }
  res.send({ patient });
};

// function to get previous refills
const getPreviousRefills = async (req, res) => {
  const { id: uniqueCode } = req.body;
  const patient = await Patient.findOne({ uniqueCode: uniqueCode });
  if (!patient) {
    throw new BadRequestError(
      `There is no patient with patientCode ${uniqueCode}`
    );
  }

  const previousRefills = await Refill.find({ patientCode: uniqueCode });
  if (!previousRefills) {
    previousRefills = [];
  }
  res.status(StatusCodes.OK).json({ patient, previousRefills });
};

// function to create patient
const createPatient = async (req, res) => {
  if (!req.body === "") {
    throw new BadRequestError("Please enter details");
  }
  const {
    firstName,
    lastName,
    dateOfBirth,
    telephone,
    nextOfKin,
    drugTime,
    address,
    sex,
  } = req.body;
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const uniqueCodeArray = [];
  for (let i = 0; i < 3; i++) {
    const letterIndex = Math.floor(Math.random() * 27);
    uniqueCodeArray.push(letters[letterIndex]);
  }
  for (let i = 0; i < 3; i++) {
    const numberIndex = Math.floor(Math.random() * 10);
    uniqueCodeArray.push(numbers[numberIndex]);
  }
  let uniqueCode = uniqueCodeArray.toString();
  uniqueCode = uniqueCode.replaceAll(",", "");

  const patient = await Patient.create({
    firstName,
    lastName,
    dateOfBirth,
    telephone,
    nextOfKin,
    uniqueCode,
    sex,
    drugTime,
    address,
  });

  res.status(StatusCodes.CREATED).json({ patient });
};

// function to create a new refill
const createRefill = async (req, res) => {
  const {
    patientCode,
    medicine,
    cd4Count,
    status,
    viralLoad,
    nextRefillDate,
    issuingStaff,
    generalNotes,
  } = req.body;

  if (!req.body === "") {
    throw new BadRequestError("Invalid entry");
  }
  let patientRefill = await Refill.findOne({ patientCode: patientCode });
  if (!patientRefill) {
    let newRefill = await Refill.create({
      patientCode: patientCode,
      refill: [
        {
          id: 1,
          patientCode: patientCode,
          medicine: medicine,
          status: "on time",
          cd4Count: cd4Count,
          dateCreated: new Date().toLocaleDateString(),
          viralLoad: viralLoad,
          nextRefillDate: nextRefillDate,
          issuingStaff: issuingStaff,
          generalNotes: generalNotes,
        },
      ],
    });
    return res.send({ newRefill });
  }

  patientRefill.refill.push({
    id: patientRefill.refill.length + 1,
    patientCode: patientCode,
    medicine: medicine,
    status: status,
    cd4Count: cd4Count,
    dateCreated: new Date().toLocaleDateString(),
    viralLoad: viralLoad,
    nextRefillDate: nextRefillDate,
    issuingStaff: issuingStaff,
    generalNotes: generalNotes,
  });

  await patientRefill.save();
  res.send({ patientRefill });
};

// function to get a specific refill
const getSpecificRefill = async (req, res) => {
  const { refillId, patientCode } = req.body;
  if (!req.body) {
    throw new BadRequestError("Enter refill id");
  }
  const refill = await Refill.findOne({ patientCode: patientCode });
  let refillDetails = refill.refill.filter(
    (refill) => refill.id == Number(refillId)
  );
  res.send({ refillDetails });
};

// function to get pending patients
const getPendingPatient = async (req, res) => {
  let pending = [];
  let allRefills = await Refill.find({});
  if (!allRefills) {
    throw new BadRequestError("no previous refill");
  }
  allRefills.map((refillObj) => {
    let refillArray = refillObj.refill;
    let lastItem = refillArray[refillArray.length - 1];
    let refillDate1 = lastItem.nextRefillDate;
    let currentDate1 = new Date();
    let date = currentDate1.getDate();
    let month = currentDate1.getMonth() + 1;
    let year = currentDate1.getFullYear();
    // console.log(refillDate1);
    let refillDateArray = refillDate1.split("/");
    let refillDate =
      refillDateArray[1] + "/" + refillDateArray[2] + "/" + refillDateArray[0];
    let currentDate = month + "/" + date + "/" + year;
    if (new Date(currentDate).getTime() > new Date(refillDate).getTime()) {
      pending.push(refillObj.patientCode);
    }
  });
  // console.log({ pending: pending });
  let allPatients = await Patient.find({});
  let pendingPatients = allPatients.filter((patient) =>
    pending.includes(patient.uniqueCode)
  );

  res.send({ pendingPatients });
};
// Add daily track record to the db
const addTrackRecord = async (req, res) => {
  const { phone_number, medication_status, call_status, created_at } = req.body;

  let phone = phone_number.replace("+256", "0");
  // console.log(phone);
  let patients = await Patient.find({});
  let patient = patients.filter((patient) => patient.telephone === phone);
  if (!patient) {
    throw new BadRequestError(`No patient with telephone ${phone}`);
  }
  let patientCode = patient[0].uniqueCode;

  if (!req.body === "") {
    throw new BadRequestError("Invalid entry");
  }
  let patientRecord = await DailyRecord.findOne({ patientCode: patientCode });
  if (!patientRecord) {
    let newDailyRecord = await DailyRecord.create({
      patientCode: patientCode,
      dailyResponse: [
        {
          id: 1,
          patientCode: patientCode,
          medicineStatus: medication_status,
          callStatus: call_status,
          date: new Date(created_at).toLocaleDateString(),
        },
      ],
    });
    return res.send({ newDailyRecord });
  }

  patientRecord.dailyResponse.push({
    id: patientRecord.dailyResponse.length + 1,
    patientCode: patientCode,
    medicineStatus: medication_status,
    callStatus: call_status,
    date: new Date(created_at).toDateString(),
  });

  await patientRecord.save();
  res.send({ patientRecord });
};
// fetching the daily track record
const getDailyRecord = async (req, res) => {
  const { patientCode } = req.body;
  const dailyRecords = await DailyRecord.findOne({ patientCode: patientCode });
  res.send(dailyRecords.dailyResponse);
};

module.exports = {
  getPatients,
  getSpecificPatient,
  getPreviousRefills,
  createPatient,
  createRefill,
  getSpecificRefill,
  getPendingPatient,
  addTrackRecord,
  getDailyRecord,
};
