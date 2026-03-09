import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SHIFT_START = "10:00";

function Attendance() {

const [employees,setEmployees] = useState([]);
const [attendance,setAttendance] = useState([]);
const [leaves,setLeaves] = useState([]);

const [date,setDate] = useState(new Date().toISOString().slice(0,10));
const [calendarDate,setCalendarDate] = useState(new Date());

const [selectedList,setSelectedList] = useState([]);


// ================= FETCH =================

useEffect(()=>{
fetchData();
},[]);

const fetchData = async()=>{

try{

const [emp,att,lv] = await Promise.all([
axios.get("http://localhost:3000/api/employees"),
axios.get("http://localhost:3000/api/attendance"),
axios.get("http://localhost:3000/api/leave")
]);

setEmployees(emp.data.data || emp.data);
setAttendance(att.data.data || att.data);
setLeaves(lv.data.data || lv.data);

}catch(err){

console.log("Fetch Error",err);

}

};


// ================= HOURS =================

const calculateHours = (checkIn,checkOut)=>{

if(!checkIn || !checkOut) return 0;

const start = new Date(`1970-01-01T${checkIn}`);
const end = new Date(`1970-01-01T${checkOut}`);

const diff = (end-start)/1000/60/60;

return parseFloat(diff.toFixed(2));

};


// ================= STATUS =================

const calculateStatus=(checkIn,checkOut)=>{

if(!checkIn) return 2;

const hours = calculateHours(checkIn,checkOut);

const late = checkIn > SHIFT_START;

if(hours >= 9 && late) return 3;

if(hours >= 8.40) return 1;

if(hours < 8.40) return 4;

return 2;

};


// ================= UPDATE =================

const updateAttendance=(empId,field,value)=>{

setAttendance(prev=>{

const exist = prev.find(a=>a.employee_id===empId && a.attendance_date===date);

if(exist){

return prev.map(a=>{

if(a.employee_id===empId && a.attendance_date===date){

const updated = {...a,[field]:value};

updated.working_hours = calculateHours(updated.check_in,updated.check_out);
updated.attendance_status_id = calculateStatus(updated.check_in,updated.check_out);

return updated;

}

return a;

});

}

return[
...prev,
{
employee_id:empId,
attendance_date:date,
check_in: field==="check_in"?value:"",
check_out: field==="check_out"?value:"",
attendance_status_id:2,
working_hours:0,
remarks:"Manual Entry"
}
];

});

};


// ================= SAVE =================

const saveAll = async()=>{

try{

for(const row of attendance){

if(row.attendance_date !== date) continue;

if(row.attendance_id){

await axios.put(
`http://localhost:3000/api/attendance/${row.attendance_id}`,
{
employee_id: row.employee_id,
attendance_date: row.attendance_date,
check_in: row.check_in || null,
check_out: row.check_out || null,
attendance_status_id: row.attendance_status_id || 2,
remarks: row.remarks || "Updated"
}
);

}else{

await axios.post(
"http://localhost:3000/api/attendance",
{
employee_id: row.employee_id,
attendance_date: row.attendance_date,
check_in: row.check_in || null,
check_out: row.check_out || null,
attendance_status_id: row.attendance_status_id || 2,
remarks: row.remarks || "Manual Entry"
}
);

}

}

alert("Attendance Saved");

fetchData();

}catch(err){

console.log("FULL ERROR:",err.response?.data || err);

alert("Error saving attendance");

}

};


// ================= GET ROW =================

const getEmpAttendance=(empId)=>{

return attendance.find(
a=>a.employee_id===empId && a.attendance_date===date
) || {};

};


// ================= STATUS LABEL =================

const getStatusLabel=(id)=>{

if(id===1) return "Present";
if(id===2) return "Absent";
if(id===3) return "Late";
if(id===4) return "Half Day";

return "";

};


// ================= BADGE =================

const badge=(status)=>{

if(status==="Present") return "badge bg-success";
if(status==="Late") return "badge bg-warning";
if(status==="Half Day") return "badge bg-info";
if(status==="Absent") return "badge bg-danger";

return "badge bg-secondary";

};


// ================= CALENDAR CLICK =================

const onDateClick = (value)=>{

const d = value.toISOString().slice(0,10);

setCalendarDate(value);

const list = attendance.filter(a=>a.attendance_date===d);

setSelectedList(list);

};


// ================= UI =================

return(

<div className="container mt-4">

<h3>Attendance</h3>


{/* DATE */}

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="form-control w-25 mb-3"
/>



{/* MARK ATTENDANCE */}

<table className="table table-bordered">

<thead className="table-dark">

<tr>
<th>Employee</th>
<th>Check In</th>
<th>Check Out</th>
<th>Hours</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{employees.map(emp=>{

const row = getEmpAttendance(emp.employee_id);

const hours = row.working_hours || 0;

const status = getStatusLabel(row.attendance_status_id) || "Absent";

return(

<tr key={emp.employee_id}>

<td>
{emp.employee_code} - {emp.first_name}
</td>

<td>

<input
type="time"
value={row.check_in || ""}
onChange={(e)=>updateAttendance(emp.employee_id,"check_in",e.target.value)}
className="form-control"
/>

</td>

<td>

<input
type="time"
value={row.check_out || ""}
onChange={(e)=>updateAttendance(emp.employee_id,"check_out",e.target.value)}
className="form-control"
/>

</td>

<td>{hours}</td>

<td>

<span className={badge(status)}>
{status}
</span>

</td>

</tr>

);

})}

</tbody>

</table>


<button
className="btn btn-success mb-4"
onClick={saveAll}
>
Save Attendance
</button>



{/* CALENDAR */}

<h4>Calendar Attendance View</h4>

<Calendar
onClickDay={onDateClick}
value={calendarDate}
/>



{/* DATE WISE LIST */}

<h4 className="mt-4">

Attendance on {calendarDate.toISOString().slice(0,10)}

</h4>

<table className="table table-striped">

<thead className="table-dark">

<tr>
<th>Employee</th>
<th>Check In</th>
<th>Check Out</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{selectedList.length === 0 ? (

<tr>
<td colSpan="4" className="text-center">
No Records
</td>
</tr>

) : (

selectedList.map(a=>(

<tr key={a.attendance_id}>

<td>
{a.employee_code} - {a.first_name}
</td>

<td>{a.check_in}</td>

<td>{a.check_out}</td>

<td>

<span className={badge(getStatusLabel(a.attendance_status_id))}>
{getStatusLabel(a.attendance_status_id)}
</span>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

);

}

export default Attendance;