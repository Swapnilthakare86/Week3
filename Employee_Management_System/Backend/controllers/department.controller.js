const Department = require("../models/department.model");

exports.createDepartment = async (req, res) => {
  try {
    const result = await Department.createDepartment(req.body);
    res.json({ message: "Department created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const rows = await Department.getAllDepartments();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const rows = await Department.getDepartmentById(req.params.id);
    if (!rows.length) 
        return res.status(404).json({ message: "Department not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const rows = await Department.getDepartmentById(req.params.id);
    if (!rows.length) 
        return res.status(404).json({ message: "Department not found" });

    await Department.updateDepartment(req.params.id, req.body);
    res.json({ message: "Department updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const result = await Department.deleteDepartment(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Department not found" });

    res.json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};