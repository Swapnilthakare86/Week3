const db = require("../config/db");

// CREATE EMPLOYEE
exports.createEmployee = async (data) => {
  const insertSql = `
    INSERT INTO Employee 
    (employee_code, first_name, last_name, email, phone, dob, gender,
     company_id, location_id, department_id, job_position_id,
     employment_type_id, reporting_manager_id, role_id, hire_date)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  const [result] = await db.execute(insertSql, [
    data.employee_code,
    data.first_name,
    data.last_name,
    data.email,
    data.phone,
    data.dob,
    data.gender,
    data.company_id,
    data.location_id,
    data.department_id,
    data.job_position_id,
    data.employment_type_id,
    data.reporting_manager_id,
    data.role_id,
    data.hire_date
  ]);

  const selectSql = `
    SELECT 
      e.employee_id,
      e.employee_code,
      e.first_name,
      e.last_name,
      e.email,
      c.company_name,
      d.department_name,
      j.position_title,
      r.role_name
    FROM Employee e
    LEFT JOIN Company c ON e.company_id = c.company_id
    LEFT JOIN Department d ON e.department_id = d.department_id
    LEFT JOIN Job_Position j ON e.job_position_id = j.job_position_id
    LEFT JOIN Role r ON e.role_id = r.role_id
    WHERE e.employee_id = ?
  `;

  const [rows] = await db.execute(selectSql, [result.insertId]);
  return rows[0];
};

// GET ALL
exports.getAllEmployees = async () => {
  const sql = `
    SELECT 
      e.employee_id,
      e.employee_code,
      e.first_name,
      e.last_name,
      e.email,
      e.gender,
      c.company_name,
      d.department_name,
      j.position_title,
      r.role_name
    FROM Employee e
    LEFT JOIN Company c ON e.company_id = c.company_id
    LEFT JOIN Department d ON e.department_id = d.department_id
    LEFT JOIN Job_Position j ON e.job_position_id = j.job_position_id
    LEFT JOIN Role r ON e.role_id = r.role_id
  `;

  const [rows] = await db.execute(sql);
  return rows;
};

// GET BY ID
exports.getEmployeeById = async (id) => {
  const sql = `
    SELECT 
      e.employee_id,
      e.employee_code,
      e.first_name,
      e.last_name,
      e.email,
      e.gender,
      c.company_name,
      d.department_name,
      j.position_title,
      r.role_name
    FROM Employee e
    LEFT JOIN Company c ON e.company_id = c.company_id
    LEFT JOIN Department d ON e.department_id = d.department_id
    LEFT JOIN Job_Position j ON e.job_position_id = j.job_position_id
    LEFT JOIN Role r ON e.role_id = r.role_id
    WHERE e.employee_id = ?
  `;

  const [rows] = await db.execute(sql, [id]);
  return rows;
};

// UPDATE
exports.updateEmployee = async (id, data) => {
  const sql = `
    UPDATE Employee 
    SET first_name = ?, last_name = ?, email = ?, phone = ?,gender = ?
    WHERE employee_id = ?
  `;

  const [result] = await db.execute(sql, [
    data.first_name,
    data.last_name,
    data.email,
    data.phone,
    data.gender,
    id
  ]);

  return result;
};

// DELETE
exports.deleteEmployee = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM Employee WHERE employee_id = ?",
    [id]
  );

  return result;
};