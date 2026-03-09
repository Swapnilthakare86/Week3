const Employee = require("../models/employee.model");

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    // If this is a validation error (like email exists), send structured response
    if (err.code === "ER_DUP_ENTRY" || err.message.includes("Email already exists")) {
      return res.status(400).json({
        errors: {
          email: { msg: "Email already exists" } // This matches React form errors state
        }
      });
    }

    // Default fallback for other errors
    next(err);
  }
};
// GET ALL EMPLOYEES
exports.getAllEmployees = async (req, res, next) => {
  try {
    const rows = await Employee.getAllEmployees();
    res.status(200).json({ count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
};

// GET EMPLOYEE BY ID
exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Employee.getEmployeeById(id);

    if (!rows.length) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// UPDATE EMPLOYEE
exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Employee.getEmployeeById(id);
    if (!rows.length) return res.status(404).json({ message: "Employee not found" });

    await Employee.updateEmployee(id, req.body);
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    next(err);
  }
};

// DELETE EMPLOYEE
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Employee.getEmployeeById(id);
    if (!rows.length) return res.status(404).json({ message: "Employee not found" });

    await Employee.deleteEmployee(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// GET NEXT EMPLOYEE CODE
exports.getNextEmployeeCode = async (req, res, next) => {
  try {
    const lastEmployee = await Employee.getLastEmployeeCode();
    let nextCode = "EMP001";

    if (lastEmployee) {
      const lastNumber = parseInt(lastEmployee.employee_code.replace("EMP", ""), 10);
      nextCode = "EMP" + (lastNumber + 1).toString().padStart(3, "0");
    }

    res.status(200).json({ nextCode });
  } catch (err) {
    next(err);
  }
};