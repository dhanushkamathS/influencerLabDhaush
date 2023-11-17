const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentApi");
// Routes
router.get("/students", getStudents);
router.get("/student", getStudent);
router.post("/student", createStudent);
router.post("/updatestudent", updateStudent);
router.post("/deletestudent", deleteStudent);

module.exports = router;
