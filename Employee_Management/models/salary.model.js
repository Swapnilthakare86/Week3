const db = require("../config/db");

// CREATE salary
exports.createSalary = async (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO salary (employee_id, basic_salary, deductions, start_date)
      VALUES (?,?,?,?)
    `;

    db.query(sql, [
      data.employee_id,
      data.basic_salary,
      data.deductions,
      data.start_date
    ], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// GET all salaries (with employee info)
exports.getAllSalaries = async () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        s.salary_id,
        s.basic_salary,
        s.deductions,
        s.start_date,
        e.employee_id,
        e.employee_code,
        e.first_name,
        e.last_name
      FROM salary s
      JOIN employee e ON s.employee_id = e.employee_id
    `;
    db.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET salary by ID
exports.getSalaryById = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        s.salary_id,
        s.basic_salary,
        s.deductions,
        s.start_date,
        e.employee_code,
        e.first_name,
        e.last_name
      FROM salary s
      JOIN employee e ON s.employee_id = e.employee_id
      WHERE s.salary_id = ?
    `;
    db.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// UPDATE salary
exports.updateSalary = async (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE salary 
      SET basic_salary = ?, deductions = ?, start_date = ?
      WHERE salary_id = ?
    `;
    db.query(sql, [
      data.basic_salary,
      data.deductions,
      data.start_date,
      id
    ], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// DELETE salary
exports.deleteSalary = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM salary WHERE salary_id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// GET salary by employee ID
exports.getSalaryByEmployeeId = async (employeeId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        s.salary_id,
        s.basic_salary,
        s.deductions,
        s.start_date,
        e.employee_id,
        e.employee_code,
        e.first_name,
        e.last_name
      FROM salary s
      JOIN employee e ON s.employee_id = e.employee_id
      WHERE e.employee_id = ?
    `;
    db.query(sql, [employeeId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};