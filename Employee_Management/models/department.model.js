const db = require("../config/db");

// CREATE
exports.createDepartment = async (data) => {
  const sql = `
    INSERT INTO department (company_id, department_name)
    VALUES (?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [data.company_id, data.department_name], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// GET ALL
exports.getAllDepartments = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM department", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET BY ID
exports.getDepartmentById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM department WHERE department_id = ?",
      [id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// UPDATE
exports.updateDepartment = async (id, data) => {
  const sql = `
    UPDATE department
    SET company_id = ?, department_name = ?
    WHERE department_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [data.company_id, data.department_name, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// DELETE
exports.deleteDepartment = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM department WHERE department_id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};