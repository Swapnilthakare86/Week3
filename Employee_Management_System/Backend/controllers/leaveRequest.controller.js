const LeaveRequest = require("../models/leaveRequest.model");

exports.createLeave = async (req, res) => {
  try {
    const result = await LeaveRequest.createLeaveRequest(req.body);
    res.json({ message: "Leave request created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const rows = await LeaveRequest.getAllLeaveRequests();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getLeaveById = async (req, res) => {
  try {
    const rows = await LeaveRequest.getLeaveRequestById(req.params.id);
    if (!rows.length) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const rows = await LeaveRequest.getLeaveRequestById(req.params.id);
    if (!rows.length) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    await LeaveRequest.updateLeaveRequest(req.params.id, req.body);
    res.json({ message: "Leave request updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const result = await LeaveRequest.deleteLeaveRequest(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.json({ message: "Leave request deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getLeavesByEmployeeId = async (req, res, next) => {
  try {
    const rows = await LeaveRequest.getLeaveRequestsByEmployeeId(
      req.params.empId
    );

    if (!rows.length) {
      return res.status(404).json({ message: "No leave requests found for this employee" });
    }

    res.json(rows);
  } catch (err) {
    next(err);
  }
};