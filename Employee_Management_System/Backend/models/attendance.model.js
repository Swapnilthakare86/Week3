const db = require("../config/db");

// CREATE
exports.createAttendance = async (data) => {
  const sql = `
    INSERT INTO attendance 
    (employee_id, attendance_date, check_in, check_out, attendance_status_id, remarks)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.employee_id,
        data.attendance_date,
        data.check_in,
        data.check_out,
        data.attendance_status_id,
        data.remarks
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// GET ALL
exports.getAllAttendance = async () => {
  const sql = `
    SELECT 
      a.attendance_id,
      a.attendance_date,
      a.check_in,
      a.check_out,
      a.remarks,
      e.employee_id,
      e.employee_code,
      e.first_name,
      e.last_name
    FROM attendance a
    JOIN employee e ON a.employee_id = e.employee_id
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET BY ID
exports.getAttendanceById = async (id) => {
  const sql = `
    SELECT 
      a.attendance_id,
      a.attendance_date,
      a.check_in,
      a.check_out,
      a.remarks,
      e.employee_code,
      e.first_name,
      e.last_name
    FROM attendance a
    JOIN employee e ON a.employee_id = e.employee_id
    WHERE a.attendance_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// UPDATE
exports.updateAttendance = async (id, data) => {
  const sql = `
    UPDATE attendance
    SET employee_id = ?, attendance_date = ?, check_in = ?, check_out = ?, 
        attendance_status_id = ?, remarks = ?
    WHERE attendance_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.employee_id,
        data.attendance_date,
        data.check_in,
        data.check_out,
        data.attendance_status_id,
        data.remarks,
        id
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// DELETE
exports.deleteAttendance = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM attendance WHERE attendance_id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};