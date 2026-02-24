const db = require("../config/db");

// CREATE
exports.createJobPosition = async (data) => {
  const sql = `
    INSERT INTO job_position (department_id, position_title)
    VALUES (?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [data.department_id, data.position_title], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// GET ALL
exports.getAllJobPositions = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM job_position", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET BY ID
exports.getJobPositionById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM job_position WHERE job_position_id = ?",
      [id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// UPDATE
exports.updateJobPosition = async (id, data) => {
  const sql = `
    UPDATE job_position
    SET department_id = ?, position_title = ?
    WHERE job_position_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [data.department_id, data.position_title, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// DELETE
exports.deleteJobPosition = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM job_position WHERE job_position_id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};