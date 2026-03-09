const db = require("../config/db");

// CREATE EMPLOYEE
exports.createEmployee = async (data) => {
  // Generate employee_code
  const [rows] = await db.execute(
    "SELECT employee_code FROM Employee ORDER BY employee_id DESC LIMIT 1"
  );

  let newCode = "EMP001";
  if (rows.length) {
    const lastNumber = parseInt(rows[0].employee_code.replace("EMP", ""), 10);
    newCode = "EMP" + (lastNumber + 1).toString().padStart(3, "0");
  }

  const insertSql = `
    INSERT INTO Employee
      (employee_code, first_name, last_name, email, phone, dob, gender,
       company_id, location_id, department_id, job_position_id,
       employment_type_id, reporting_manager_id, hire_date)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  const [result] = await db.execute(insertSql, [
    newCode,
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
    data.reporting_manager_id || null,
    data.hire_date
  ]);

  const [newEmployee] = await db.execute(
    `SELECT * FROM Employee WHERE employee_id = ?`,
    [result.insertId]
  );

  return newEmployee[0];
};

// GET LAST EMPLOYEE CODE
exports.getLastEmployeeCode = async () => {
  const [rows] = await db.execute(
    "SELECT employee_code FROM Employee ORDER BY employee_id DESC LIMIT 1"
  );
  return rows.length ? rows[0] : null;
};

// GET ALL EMPLOYEES
exports.getAllEmployees = async () => {
  const sql = `
    SELECT 
      e.employee_id,
      e.employee_code,
      e.first_name,
      e.last_name,
      e.email,
      e.gender,
      e.phone,
      DATE_FORMAT(e.dob, '%Y-%m-%d') AS dob,
      DATE_FORMAT(e.hire_date, '%Y-%m-%d') AS hire_date,
      c.company_name,
      d.department_name,
      j.position_title,
      e.role_id
    FROM Employee e
    LEFT JOIN Company c ON e.company_id = c.company_id
    LEFT JOIN Department d ON e.department_id = d.department_id
    LEFT JOIN Job_Position j ON e.job_position_id = j.job_position_id
  `;
  const [rows] = await db.execute(sql);
  return rows;
};

// GET EMPLOYEE BY ID
exports.getEmployeeById = async (id) => {
  const sql = `
    SELECT 
      e.employee_id,
      e.employee_code,
      e.first_name,
      e.last_name,
      e.email,
      e.gender,
      e.phone,
      DATE_FORMAT(e.dob, '%Y-%m-%d') AS dob,
      DATE_FORMAT(e.hire_date, '%Y-%m-%d') AS hire_date,
      c.company_name,
      d.department_name,
      j.position_title,
      e.role_id
    FROM Employee e
    LEFT JOIN Company c ON e.company_id = c.company_id
    LEFT JOIN Department d ON e.department_id = d.department_id
    LEFT JOIN Job_Position j ON e.job_position_id = j.job_position_id
    WHERE e.employee_id = ?
  `;
  const [rows] = await db.execute(sql, [id]);
  return rows;
};

// UPDATE EMPLOYEE
exports.updateEmployee = async (id, data) => {
  const sql = `
    UPDATE Employee 
    SET first_name = ?, last_name = ?, email = ?, phone = ?, gender = ?, reporting_manager_id = ?
    WHERE employee_id = ?
  `;
  const [result] = await db.execute(sql, [
    data.first_name,
    data.last_name,
    data.email,
    data.phone,
    data.gender,
    data.reporting_manager_id || null,
    id
  ]);
  return result;
};

// DELETE EMPLOYEE
exports.deleteEmployee = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM Employee WHERE employee_id = ?",
    [id]
  );
  return result;
};