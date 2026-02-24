const db = require("../config/db");

// CREATE
exports.createLeaveRequest = async (data) => {
  const sql = `
    INSERT INTO leave_request
    (employee_id, leave_type_id, start_date, end_date, total_days, reason, status_id, applied_on, approved_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.employee_id,
        data.leave_type_id,
        data.start_date,
        data.end_date,
        data.total_days,
        data.reason,
        data.status_id,
        data.applied_on,
        data.approved_by
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// GET ALL
exports.getAllLeaveRequests = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM leave_request", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET BY ID
exports.getLeaveRequestById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM leave_request WHERE leave_request_id = ?",
      [id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// UPDATE
exports.updateLeaveRequest = async (id, data) => {
  const sql = `
    UPDATE leave_request
    SET employee_id = ?, leave_type_id = ?, start_date = ?, end_date = ?, 
        total_days = ?, reason = ?, status_id = ?, applied_on = ?, approved_by = ?
    WHERE leave_request_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.employee_id,
        data.leave_type_id,
        data.start_date,
        data.end_date,
        data.total_days,
        data.reason,
        data.status_id,
        data.applied_on,
        data.approved_by,
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
exports.deleteLeaveRequest = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM leave_request WHERE leave_request_id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// GET BY EMPLOYEE ID
exports.getLeaveRequestsByEmployeeId = async (empId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM leave_request WHERE employee_id = ?",
      [empId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};