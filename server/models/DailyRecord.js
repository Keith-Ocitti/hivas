const mongoose = require("mongoose");

const DailyRecordRecordSchema = new mongoose.Schema(
  {
    patientCode: {
      type: String,
      minlength: 6,
    },
    dailyResponse: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyRecord", DailyRecordRecordSchema);
