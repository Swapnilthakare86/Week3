import { useEffect, useState } from "react";
import axios from "axios";

function ManagerApproval() {

const [leaves, setLeaves] = useState([]);
const [employees, setEmployees] = useState([]);
const [managers, setManagers] = useState([]);
const [statuses, setStatuses] = useState([]);
const [leaveTypes, setLeaveTypes] = useState([]);
const [selectedManager, setSelectedManager] = useState("");
const [statusFilter, setStatusFilter] = useState(""); // NEW

// ================= FETCH DATA =================
useEffect(() => {
  fetchAllData();
}, []);

const fetchAllData = async () => {

  const [leaveRes, empRes, statusRes, typeRes] = await Promise.all([
    axios.get("http://localhost:3000/api/leave"),
    axios.get("http://localhost:3000/api/employees"),
    axios.get("http://localhost:3000/api/master-data/category/leave_status"),
    axios.get("http://localhost:3000/api/master-data/category/leave_type")
  ]);

  const employeesData = empRes.data.data || empRes.data;

  setEmployees(employeesData);
  setManagers(employeesData.filter(e => Number(e.role_id) === 3));
  setLeaves(leaveRes.data.data || leaveRes.data);
  setStatuses(statusRes.data.data || statusRes.data);
  setLeaveTypes(typeRes.data.data || typeRes.data);
};


// ================= HELPER FUNCTIONS =================

const getEmployeeName = (id) => {
  const emp = employees.find(e => e.employee_id === id);
  return emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : id;
};

const getLeaveTypeName = (id) => {
  const lt = leaveTypes.find(l => l.master_data_id === id);
  return lt ? lt.value : id;
};

const getStatusName = (id) => {
  const st = statuses.find(s => s.master_data_id === id);
  return st ? st.value : id;
};


// ================= FILTER LEAVES =================

let filteredLeaves = selectedManager
  ? leaves.filter(
      l => l.approved_by === null || Number(l.approved_by) === Number(selectedManager)
    )
  : leaves; // show all initially


if (statusFilter) {
  filteredLeaves = filteredLeaves.filter(
    l => getStatusName(l.status_id) === statusFilter
  );
}


// ================= COUNT SUMMARY =================

const pendingCount = leaves.filter(
  l => getStatusName(l.status_id) === "Pending"
).length;

const approvedCount = leaves.filter(
  l => getStatusName(l.status_id) === "Approved"
).length;

const rejectedCount = leaves.filter(
  l => getStatusName(l.status_id) === "Rejected"
).length;


// ================= UPDATE STATUS =================

const handleStatusChange = async (leaveId, statusId) => {

  if (!selectedManager) {
    alert("Please select a manager first");
    return;
  }

  await axios.put(
    `http://localhost:3000/api/leave/status/${leaveId}`,
    {
      status_id: Number(statusId),
      approved_by: Number(selectedManager)
    }
  );

  fetchAllData();
};


// ================= UI =================

return (

<div className="container mt-4">

<h3 className="mb-4">Manager Leave Approval</h3>

{/* Manager Dropdown */}
<div className="mb-4 w-25">

<label className="form-label">Select Manager</label>

<select
className="form-control"
value={selectedManager}
onChange={(e)=>setSelectedManager(e.target.value)}
>

<option value="">-- Select Manager --</option>

{managers.map(m => (
<option key={m.employee_id} value={m.employee_id}>
{m.employee_code} - {m.first_name} {m.last_name}
</option>
))}

</select>

</div>


{/* ===== SUMMARY CARDS ===== */}

<div className="row mb-3">

<div className="col-md-3">

<div
className="card text-center border-warning shadow-sm"
style={{cursor:"pointer"}}
onClick={()=>setStatusFilter("Pending")}
>

<div className="card-body">
<h6 className="text-warning">Pending Leaves</h6>
<h4>{pendingCount}</h4>
</div>

</div>

</div>


<div className="col-md-3">

<div
className="card text-center border-success shadow-sm"
style={{cursor:"pointer"}}
onClick={()=>setStatusFilter("Approved")}
>

<div className="card-body">
<h6 className="text-success">Approved Leaves</h6>
<h4>{approvedCount}</h4>
</div>

</div>

</div>


<div className="col-md-3">

<div
className="card text-center border-danger shadow-sm"
style={{cursor:"pointer"}}
onClick={()=>setStatusFilter("Rejected")}
>

<div className="card-body">
<h6 className="text-danger">Rejected Leaves</h6>
<h4>{rejectedCount}</h4>
</div>

</div>

</div>


<div className="col-md-3 d-flex align-items-center">

<button
className="btn btn-secondary w-100"
onClick={()=>setStatusFilter("")}
>
Show All
</button>

</div>

</div>


{/* ===== TABLE ===== */}

<table className="table table-bordered table-striped shadow-sm">

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
onChange={(e)=>handleStatusChange(l.leave_request_id, e.target.value)}
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

</div>

);

}

export default ManagerApproval;