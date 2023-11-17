// models/studentModel.js
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  teacherId: String,
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
