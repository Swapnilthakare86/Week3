import { useEffect, useState } from "react";
import axios from "axios";

function ManagerApproval() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [leaveRes, empRes, statusRes, typeRes] = await Promise.all([
        axios.get("http://localhost:3000/api/leave"),
        axios.get("http://localhost:3000/api/employees"),
        axios.get("http://localhost:3000/api/master-data/category/leave_status"),
        axios.get("http://localhost:3000/api/master-data/category/leave_type"),
      ]);

      const employeesData = empRes.data.data || empRes.data;
      setEmployees(employeesData);
      setManagers(employeesData.filter(e => Number(e.role_id) === 3));

      setLeaves(leaveRes.data.data || leaveRes.data);
      setStatuses(statusRes.data.data || statusRes.data);
      setLeaveTypes(typeRes.data.data || typeRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= GET NAMES =================
  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.employee_id === id);
    return emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : id;
  };

  const getStatusName = (id) => {
    const st = statuses.find(s => s.master_data_id === id);
    return st ? st.value : id;
  };

  const getLeaveTypeName = (id) => {
    const lt = leaveTypes.find(l => l.master_data_id === id);
    return lt ? lt.value : id;
  };

  // ================= FILTER BY SELECTED MANAGER =================
  // Show leaves assigned to the manager or with approved_by null
  const filteredLeaves = selectedManager
    ? leaves.filter(
        l => l.approved_by === null || Number(l.approved_by) === Number(selectedManager)
      )
    : [];

  // ================= UPDATE STATUS =================
  const handleStatusChange = async (leaveId, statusId) => {
    try {
      const leaveToUpdate = leaves.find(l => l.leave_request_id === leaveId);
      const managerId = leaveToUpdate.approved_by || selectedManager; // assign manager if null

      await axios.put(`http://localhost:3000/api/leave/${leaveId}`, {
        status_id: Number(statusId),
        approved_by: Number(managerId),
      });

      fetchAllData(); // Refresh table
      alert("Leave status updated!");
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  // ================= UI =================
  return (
    <div className="container mt-4">
      <h3>Manager Leave Requests</h3>

      {/* Select Manager */}
      <div className="mb-3 w-25">
        <label>Select Manager:</label>
        <select
          className="form-control"
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
        >
          <option value="">-- Select Manager --</option>
          {managers.map(m => (
            <option key={m.employee_id} value={m.employee_id}>
              {m.first_name} {m.last_name}
            </option>
          ))}
        </select>
      </div>

      {selectedManager && filteredLeaves.length === 0 && (
        <p>No leave requests assigned to this manager.</p>
      )}

      {filteredLeaves.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map(l => (
              <tr key={l.leave_request_id}>
                <td>{getEmployeeName(l.employee_id)}</td>
                <td>{getLeaveTypeName(l.leave_type_id)}</td>
                <td>{l.start_date}</td>
                <td>{l.end_date}</td>
                <td>{l.total_days}</td>
                <td>{l.reason}</td>
                <td>
                  <select
                    className="form-select"
                    value={l.status_id || ""}
                    onChange={(e) =>
                      handleStatusChange(l.leave_request_id, e.target.value)
                    }
                  >
                    {statuses.map(s => (
                      <option key={s.master_data_id} value={s.master_data_id}>
                        {s.value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManagerApproval;