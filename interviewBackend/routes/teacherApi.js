const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherApi");
// Routes
router.get("/teachers", getTeachers);
router.get("/teacher", getTeacher);
router.post("/teacher", createTeacher);
router.post("/updateTeacher", updateTeacher);
router.post("/deleteTeacher", deleteTeacher);

module.exports = router;
