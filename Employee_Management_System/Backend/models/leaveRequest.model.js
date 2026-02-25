const db = require("../config/db");

// CREATE
exports.createLeaveRequest = async (data) => {
  const sql = `
    INSERT INTO leave_request
    (employee_id, leave_type_id, start_date, end_date, total_days, reason, status_id, applied_on, approved_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(sql, [
    data.employee_id,
    data.leave_type_id,
    data.start_date,
    data.end_date,
    data.total_days,
    data.reason,
    data.status_id,
    data.applied_on,
    data.approved_by
  ]);

  return result;
};

// GET ALL
exports.getAllLeaveRequests = async () => {
  const [rows] = await db.execute("SELECT * FROM leave_request");
  return rows;
};

// GET BY ID
exports.getLeaveRequestById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM leave_request WHERE leave_request_id = ?",
    [id]
  );
  return rows;
};

// UPDATE
exports.updateLeaveRequest = async (id, data) => {
  const sql = `
    UPDATE leave_request
    SET employee_id = ?, leave_type_id = ?, start_date = ?, end_date = ?, 
        total_days = ?, reason = ?, status_id = ?, applied_on = ?, approved_by = ?
    WHERE leave_request_id = ?
  `;

  const [result] = await db.execute(sql, [
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
  ]);

  return result;
};

// DELETE
exports.deleteLeaveRequest = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM leave_request WHERE leave_request_id = ?",
    [id]
  );
  return result;
};

// GET BY EMPLOYEE ID
exports.getLeaveRequestsByEmployeeId = async (empId) => {
  const [rows] = await db.execute(
    "SELECT * FROM leave_request WHERE employee_id = ?",
    [empId]
  );
  return rows;
};