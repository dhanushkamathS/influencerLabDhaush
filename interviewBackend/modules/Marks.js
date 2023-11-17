// models/studentModel.js
const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  teacherName: String,
  subject: String,
  marks: String,
});

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
