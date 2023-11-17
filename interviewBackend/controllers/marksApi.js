const Marks = require("../modules/Marks");

// Create a new Marks
const createMarks = async (req, res) => {
  try {
    const { studentId, name, teacherName, subject, marks } = req.body;

    if (!studentId || !name || !teacherName || !subject || !marks) {
      return res.status(400).json({ error: "Please provide all details" });
    }

    const saveMarks = new Marks({
      studentId,
      name,
      teacherName,
      subject,
      marks,
    });

    await saveMarks.save();
    return res.json({
      status: "success",
      message: "Marks created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Marks

const getMarks = async (req, res) => {
  try {
    const marks = await Marks.find();
    return res.json({
      status: "success",
      data: marks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMarks = async (req, res) => {
  try {
    const { id, studentId, name, teacherName, subject, marks } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Please provide all details" });
    }

    const updateMarks = {
      studentId,
      name,
      teacherName,
      subject,
      marks,
    };

    await Marks.findByIdAndUpdate(id, updateMarks);
    return res.json({
      status: "success",
      message: "Marks updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMarks = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Please provide all details" });
    }

    await Marks.findByIdAndDelete(id);
    return res.json({
      status: "success",
      message: "Marks deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMarks,
  getMarks,
  updateMarks,
  deleteMarks,
};
