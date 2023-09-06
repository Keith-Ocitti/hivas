const Staff = require("../models/Staff");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please enter email and password");
  }

  const staff = await Staff.findOne({ email: email });
  if (!staff) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordCorrect = await staff.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Please enter correct password");
  }
  const token = staff.createToken();
  res.status(StatusCodes.ACCEPTED).json({
    name: staff.firstName,
    lastName: staff.lastName,
    position: staff.position,
    doctorId: staff.doctorId,
    token,
  });
};
const getDoctor = async (req, res) => {
  const { doctorId } = req.body;
  if (!doctorId) {
    throw new BadRequestError("Please enter   doctorId");
  }

  const staff = await Staff.findOne({ doctorId: doctorId });
  if (!staff) {
    throw new BadRequestError("Invalid credentials");
  }

  // const token = staff.createToken();
  res.status(StatusCodes.ACCEPTED).json({
    doctorId: staff.doctorId,
    phone: staff.phone,
  });
};
const getDoctorReset = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please enter email");
  }

  const staff = await Staff.findOne({ email: email });
  if (!staff) {
    throw new BadRequestError("Invalid credentials");
  }

  // const token = staff.createToken();
  res.status(StatusCodes.ACCEPTED).json({
    email: staff.email,
    phone: staff.phone,
  });
};

const signup = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("Provide credentials");
  }
  const { firstName, lastName, phone, hospital, position, password, email } =
    req.body;
  let randomIndex = Math.floor(Math.random() * 1000);
  let doctorId = "MBR-" + randomIndex;
  const staff = await Staff.create({
    firstName,
    lastName,
    phone,
    hospital,
    position,
    password,
    doctorId,
    email,
  });
  res.status(StatusCodes.CREATED).json({ staff });
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  let newPassword = await bcrypt.hash(password, salt);
  let doctor = await Staff.findOneAndUpdate(
    { email: email },
    { password: newPassword }
  );
  res.send({ doctor });
};

module.exports = { login, signup, getDoctor, updatePassword, getDoctorReset };
