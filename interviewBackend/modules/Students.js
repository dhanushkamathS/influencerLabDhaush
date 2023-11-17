// models/studentModel.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
