const express = require("express");
const router = express.Router();

const {
  createMarks,
  getMarks,
  updateMarks,
  deleteMarks,
} = require("../controllers/marksApi");

// Routes
router.get("/marks", getMarks);
router.post("/marks", createMarks);
router.post("/updatemarks", updateMarks);
router.post("/deletemarks", deleteMarks);

module.exports = router;
