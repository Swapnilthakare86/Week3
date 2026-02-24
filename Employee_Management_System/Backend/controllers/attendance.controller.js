const Attendance = require("../models/attendance.model");

exports.createAttendance = async (req, res) => {
  try {
    const result = await Attendance.createAttendance(req.body);
    res.json({ message: "Attendance created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const rows = await Attendance.getAllAttendance();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const rows = await Attendance.getAttendanceById(req.params.id);
    if (!rows.length) 
      return res.status(404).json({ message: "Attendance not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const rows = await Attendance.getAttendanceById(req.params.id);
    if (!rows.length)
       return res.status(404).json({ message: "Attendance not found" });

    await Attendance.updateAttendance(req.params.id, req.body);
    res.json({ message: "Attendance updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const result = await Attendance.deleteAttendance(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Attendance not found" });

    res.json({ message: "Attendance deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};