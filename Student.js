const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true
  }
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: Number,
    unique: true,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  attendance: [attendanceSchema]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
