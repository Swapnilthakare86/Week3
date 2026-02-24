const LeaveRequest = require("../models/leaveRequest.model");

exports.createLeaveRequest = async (req, res) => {
  try {
    const result = await LeaveRequest.createLeaveRequest(req.body);
    res.json({ message: "Leave request created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllLeaveRequests = async (req, res) => {
  try {
    const rows = await LeaveRequest.getAllLeaveRequests();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getLeaveRequestById = async (req, res) => {
  try {
    const rows = await LeaveRequest.getLeaveRequestById(req.params.id);
    if (!rows.length)
         return res.status(404).json({ message: "Leave request not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateLeaveRequest = async (req, res) => {
  try {
    const rows = await LeaveRequest.getLeaveRequestById(req.params.id);
    if (!rows.length) 
        return res.status(404).json({ message: "Leave request not found" });

    await LeaveRequest.updateLeaveRequest(req.params.id, req.body);
    res.json({ message: "Leave request updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteLeaveRequest = async (req, res) => {
  try {
    const result = await LeaveRequest.deleteLeaveRequest(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Leave request not found" });

    res.json({ message: "Leave request deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};