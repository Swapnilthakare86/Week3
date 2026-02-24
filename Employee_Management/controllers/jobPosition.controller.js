const JobPosition = require("../models/jobPosition.model");

exports.createJobPosition = async (req, res) => {
  try {
    const result = await JobPosition.createJobPosition(req.body);
    res.json({ message: "Job position created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllJobPositions = async (req, res) => {
  try {
    const rows = await JobPosition.getAllJobPositions();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getJobPositionById = async (req, res) => {
  try {
    const rows = await JobPosition.getJobPositionById(req.params.id);
    if (!rows.length) 
        return res.status(404).json({ message: "Job position not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateJobPosition = async (req, res) => {
  try {
    const rows = await JobPosition.getJobPositionById(req.params.id);
    if (!rows.length) 
        return res.status(404).json({ message: "Job position not found" });

    await JobPosition.updateJobPosition(req.params.id, req.body);
    res.json({ message: "Job position updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteJobPosition = async (req, res) => {
  try {
    const result = await JobPosition.deleteJobPosition(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Job position not found" });

    res.json({ message: "Job position deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};