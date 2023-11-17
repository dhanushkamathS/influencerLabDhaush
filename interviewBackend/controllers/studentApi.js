//import student model
const Student = require("../modules/Students");

const createStudent = async (req, res) => {
  // console.log(req.body);
  let { name, studentId } = req.body;

  if (!name || !studentId) {
    return res.status(400).send("Data is missing");
  }

  let student = new Student({
    name,
    studentId,
  });

  // console.log(student);
  try {
    await student.save();
    return res.json({
      status: "success",
      message: "Student created successfully",
    });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};

const getStudents = async (req, res) => {
  try {
    let students = await Student.find();
    return res.json({
      status: "success",
      data: students,
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

const getStudent = async (req, res) => {
  //get student id from request params
  let { studentId } = req.query;
  console.log(studentId);
  if (!studentId) return res.status(400).send("Student ID is missing");

  try {
    let student = await Student.findOne({ studentId: studentId });

    if (!student) {
      return res.json({
        status: "error",
        message: "Student not found",
      });
    }
    return res.json({
      status: "success",
      data: student,
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

const updateStudent = async (req, res) => {
  let { name, studentId } = req.body;

  if (!studentId) return res.status(400).send("Data is missing");
  let student = {
    name,
    studentId,
  };

  try {
    await Student.findOneAndUpdate({ studentId }, student);
    return res.json({
      status: "success",
      message: "Student updated successfully",
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  let { studentId } = req.body;
  console.log(studentId);
  if (!studentId) return res.status(400).send("Student ID is missing");
  try {
    await Student.findOneAndDelete({ studentId });
    return res.json({
      status: "success",
      message: "Student deleted successfully",
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
