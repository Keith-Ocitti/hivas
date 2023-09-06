const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter second name"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Please enter date of birth"],
  },
  telephone: {
    type: String,
    required: [true, "Please enter telephone number"],
  },
  nextOfKin: {
    type: String,
    required: [true, "Please provide next of Kin"],
  },
  uniqueCode: {
    type: String,
    required: [true, "Please enter unique key"],
    minlength: 6,
    unique: true,
  },
  sex: {
    type: String,
    required: [true, "Please enter sex"],
  },
  drugTime: {
    type: String,
    required: [true, "Please enter the drug time"],
  },
  address: {
    type: String,
    required: [true, "Please enter the address"],
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
