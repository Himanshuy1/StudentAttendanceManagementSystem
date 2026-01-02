const express = require("express");
const Student = require("../models/Student");

const router = express.Router();


// ➕ Add Student
router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student added", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// 📋 Get All Students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


// 🔍 Search by Roll Number
router.get("/:roll", async (req, res) => {
  const student = await Student.findOne({ rollNumber: req.params.roll });
  if (!student) return res.status(404).json({ message: "Not found" });
  res.json(student);
});


// 📝 Mark Attendance
router.post("/attendance/:roll", async (req, res) => {
  const { status } = req.body;
  const student = await Student.findOne({ rollNumber: req.params.roll });

  if (!student) return res.status(404).json({ message: "Student not found" });

  student.attendance.push({
    date: new Date(),
    status
  });

  await student.save();
  res.json({ message: "Attendance marked" });
});


// 📊 Attendance Percentage
router.get("/percentage/:roll", async (req, res) => {
  const student = await Student.findOne({ rollNumber: req.params.roll });
  if (!student) return res.status(404).json({ message: "Not found" });

  const total = student.attendance.length;
  const present = student.attendance.filter(a => a.status === "Present").length;

  const percentage = total === 0 ? 0 : (present / total) * 100;

  res.json({ percentage: percentage.toFixed(2) });
});

module.exports = router;
