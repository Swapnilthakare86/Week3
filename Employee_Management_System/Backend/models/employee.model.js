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

  return new Promise((resolve, reject) => {
    db.query(
      insertSql,
      [
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
      ],
      (err, result) => {
        if (err) return reject(err);

        const insertedId = result.insertId;

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

        db.query(selectSql, [insertedId], (err2, rows) => {
          if (err2) reject(err2);
          else resolve(rows);
        });
      }
    );
  });
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

  return new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
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

  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// UPDATE EMPLOYEE BY ID
exports.updateEmployee = async (id, data) => {
  const sql = `
    UPDATE Employee 
    SET first_name = ?, last_name = ?, email = ?, phone = ?
    WHERE employee_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.phone,
        id
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// DELETE EMPLOYEE
exports.deleteEmployee = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM Employee WHERE employee_id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};