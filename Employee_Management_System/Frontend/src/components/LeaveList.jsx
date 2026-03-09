import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LeaveList(){

const [leaves,setLeaves] = useState([]);
const [employees,setEmployees] = useState([]);
const [leaveTypes,setLeaveTypes] = useState([]);
const [statuses,setStatuses] = useState([]);

const [employeeFilter,setEmployeeFilter] = useState("");

// ================= FETCH DATA =================

useEffect(()=>{
fetchAll();
},[]);

const fetchAll = async ()=>{

const leaveRes = await axios.get("http://localhost:3000/api/leave");
const empRes = await axios.get("http://localhost:3000/api/employees");
const typeRes = await axios.get("http://localhost:3000/api/master-data/category/leave_type");
const statusRes = await axios.get("http://localhost:3000/api/master-data/category/leave_status");

setLeaves(leaveRes.data.data || leaveRes.data);
setEmployees(empRes.data.data || empRes.data);
setLeaveTypes(typeRes.data.data || typeRes.data);
setStatuses(statusRes.data.data || statusRes.data);

};

// ================= CANCEL LEAVE =================

const cancelLeave = async(id)=>{

if(!window.confirm("Cancel this leave request?")) return;

await axios.delete(`http://localhost:3000/api/leave/${id}`);

fetchAll();

};

// ================= GET EMPLOYEE NAME =================

const getEmployee = (id)=>{

const emp = employees.find(e => e.employee_id === id);

return emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : id;

};

// ================= GET LEAVE TYPE =================

const getLeaveType = (id)=>{

const type = leaveTypes.find(t => t.master_data_id === id);

return type ? type.value : id;

};

// ================= GET STATUS =================

const getStatus = (id)=>{

const st = statuses.find(s => s.master_data_id === id);

return st ? st.value : id;

};

// ================= STATUS BADGE COLOR =================

const getStatusBadge = (statusId)=>{

const status = getStatus(statusId);

if(status === "Pending") return "badge bg-warning";
if(status === "Approved") return "badge bg-success";
if(status === "Rejected") return "badge bg-danger";

return "badge bg-secondary";

};

// ================= FILTER =================

const filteredLeaves = employeeFilter
? leaves.filter(l => l.employee_id === Number(employeeFilter))
: leaves;


// ================= UI =================

return(

<div className="container mt-4">

<h3>Leave Requests</h3>


{/* Employee Filter */}

<div className="mb-3">

<select
className="form-control w-25"
value={employeeFilter}
onChange={(e)=>setEmployeeFilter(e.target.value)}
>

<option value="">All Employees</option>

{employees.map(emp=>(
<option key={emp.employee_id} value={emp.employee_id}>
{emp.employee_code} - {emp.first_name} {emp.last_name}
</option>
))}

</select>

</div>


<table className="table table-bordered table-striped">

<thead className="table-dark">

<tr>
<th>ID</th>
<th>Employee</th>
<th>Leave Type</th>
<th>Start Date</th>
<th>End Date</th>
<th>Total Days</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{filteredLeaves.map(l=>(

<tr key={l.leave_request_id}>

<td>{l.leave_request_id}</td>

<td>{getEmployee(l.employee_id)}</td>

<td>{getLeaveType(l.leave_type_id)}</td>

<td>{l.start_date}</td>

<td>{l.end_date}</td>

<td>{l.total_days}</td>

<td>
<span className={getStatusBadge(l.status_id)}>
{getStatus(l.status_id)}
</span>
</td>

<td>

{/* Edit allowed only if Pending */}

{getStatus(l.status_id) === "Pending" ? (
<Link
to={`/leave-edit/${l.leave_request_id}`}
className="btn btn-sm btn-primary me-2"
>
Edit
</Link>
) : (
<button className="btn btn-sm btn-secondary me-2" disabled>
Edit
</button>
)}

<button
className="btn btn-sm btn-danger"
onClick={()=>cancelLeave(l.leave_request_id)}
>
Cancel
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default LeaveList;