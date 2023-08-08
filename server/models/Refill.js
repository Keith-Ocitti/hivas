const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema(
  {
    patientCode: {
      type: String,
      minlength: 6,
    },
    refill: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", RecordSchema);
