const Employee = require("../models/employee.model");

exports.createEmployee = async (req, res) => {
  try {
    const result = await Employee.createEmployee(req.body);
    res.status(201).json({ message: "Employee created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const rows = await Employee.getAllEmployees();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const rows = await Employee.getEmployeeById(req.params.id);
    if (!rows.length) 
        return res.status(404).json({ message: "Employee not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    await Employee.updateEmployee(req.params.id, req.body);
    res.json({ message: "Employee updated" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.deleteEmployee(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};