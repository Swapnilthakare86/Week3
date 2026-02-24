const Salary = require("../models/salary.model");

exports.createSalary = async (req, res) => {
  try {
    const result = await Salary.createSalary(req.body);
    res.json({ message: "Salary added", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllSalaries = async (req, res) => {
  try {
    const rows = await Salary.getAllSalaries();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSalaryById = async (req, res) => {
  try {
    const rows = await Salary.getSalaryById(req.params.id);
    if (!rows.length)
         return res.status(404).json({ message: "Salary not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateSalary = async (req, res) => {
  try {
    const rows = await Salary.getSalaryById(req.params.id);
    if (!rows.length)
         return res.status(404).json({ message: "Salary not found" });

    await Salary.updateSalary(req.params.id, req.body);
    res.json({ message: "Salary updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteSalary = async (req, res) => {
  try {
    const result = await Salary.deleteSalary(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Salary not found" });

    res.json({ message: "Salary deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSalaryByEmployeeId = async (req, res) => {
  try {
    const rows = await Salary.getSalaryByEmployeeId(req.params.employee_id);
    if (!rows.length)
      return res.status(404).json({ message: "No salary found for this employee" });
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};