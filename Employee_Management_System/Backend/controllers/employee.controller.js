const Employee = require("../models/employee.model");

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.getAllEmployees = async (req, res, next) => {
  try {
    const rows = await Employee.getAllEmployees();

     return res.status(200).json({
      count: rows.length,
      data: rows
    });
    
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Employee.getEmployeeById(id);

    if (!rows.length) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Check if employee exists
    const rows = await Employee.getEmployeeById(id);

    if (!rows.length) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    // Update employee
    const result = await Employee.updateEmployee(req.params.id, req.body);

    return res.status(200).json({
      message: "Employee updated successfully"
    });

  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if employee exists
    const rows = await Employee.getEmployeeById(id);
    if (!rows.length) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete employee
    await Employee.deleteEmployee(id);

    return res.status(200).json({
      message: "Employee deleted successfully"
    });

  } catch (err) {
    next(err);
  }
};


exports.getManagers = async () => {
  const sql = `
    SELECT employee_id, first_name, last_name, role_id
    FROM employee
    WHERE role_id = 3
  `;
  const [rows] = await db.execute(sql);
  return rows;
};