const Teacher = require("../modules/Teacher");

const createTeacher = async (req, res) => {
  let { name, teacherId } = req.body;

  if (!name || !teacherId) {
    return res.status(400).send("Data is missing");
  }

  let teacher = new Teacher({
    name,
    teacherId,
  });

  try {
    await teacher.save();
    return res.json({
      status: "success",
      message: "Teacher created successfully",
    });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};

const getTeachers = async (req, res) => {
  try {
    let teachers = await Teacher.find();
    return res.json({
      status: "success",
      data: teachers,
    });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};

const getTeacher = async (req, res) => {
  let { teacherId } = req.query;

  if (!teacherId) return res.status(400).send("Teacher ID is missing");

  try {
    let teacher = await Teacher.findOne({ teacherId: teacherId });

    if (!teacher) {
      return res.json({
        status: "error",
        message: "Teacher not found",
      });
    }
    return res.json({
      status: "success",
      data: teacher,
    });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};

const updateTeacher = async (req, res) => {
  let { name, teacherId } = req.body;

  if (!teacherId) return res.status(400).send("Data is missing");
  let teacher = {
    name,
    teacherId,
  };

  try {
    await Teacher.findOneAndUpdate({ teacherId }, teacher);
    return res.json({
      status: "success",
      message: "Teacher updated successfully",
    });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};

const deleteTeacher = async (req, res) => {
  let { teacherId } = req.body;
  if (!teacherId) return res.status(400).send("Teacher ID is missing");

  try {
    await Teacher.findOneAndDelete({ teacherId });
    return res.json({
      status: "success",
      message: "Teacher deleted successfully",
    });
  } catch (err) {
    return res.json({ status: "error", message: err.message });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};
