import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeUpdate() {

const { id } = useParams();
const navigate = useNavigate();

const [formData, setFormData] = useState({
employee_code: "",
first_name: "",
last_name: "",
email: "",
phone: "",
dob: "",
gender: "",
company_id: "",
location_id: "",
department_id: "",
job_position_id: "",
employment_type_id: "",
reporting_manager_id: "",
hire_date: ""
});

const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

const [companies,setCompanies] = useState([]);
const [locations,setLocations] = useState([]);
const [departments,setDepartments] = useState([]);
const [positions,setPositions] = useState([]);
const [types,setTypes] = useState([]);
const [managers,setManagers] = useState([]);

useEffect(()=>{

fetchEmployee();

axios.get("http://localhost:3000/api/companies")
.then(res=>setCompanies(res.data.data || res.data));

axios.get("http://localhost:3000/api/departments")
.then(res=>setDepartments(res.data.data || res.data));

axios.get("http://localhost:3000/api/job-positions")
.then(res=>setPositions(res.data.data || res.data));

axios.get("http://localhost:3000/api/master-data/category/employment_type")
.then(res=>setTypes(res.data.data || res.data));

axios.get("http://localhost:3000/api/employees")
.then(res=>setManagers(res.data.data || res.data));

},[]);

useEffect(()=>{

if(!formData.company_id) return;

axios
.get(`http://localhost:3000/api/locations/company/${formData.company_id}`)
.then(res=>setLocations(res.data.data || res.data));

},[formData.company_id]);


const fetchEmployee = async () => {

try{

const res = await axios.get(`http://localhost:3000/api/employees/${id}`);
const data = res.data.data || res.data;

setFormData({
employee_code: data.employee_code || "",
first_name: data.first_name || "",
last_name: data.last_name || "",
email: data.email || "",
phone: data.phone || "",
dob: data.dob ? data.dob.split("T")[0] : "",
gender: data.gender || "",
company_id: data.company_id || "",
location_id: data.location_id || "",
department_id: data.department_id || "",
job_position_id: data.job_position_id || "",
employment_type_id: data.employment_type_id || "",
reporting_manager_id: data.reporting_manager_id || "",
hire_date: data.hire_date ? data.hire_date.split("T")[0] : ""
});

}catch(err){
console.error(err);
}

};

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handleSubmit = async(e)=>{

e.preventDefault();

setLoading(true);
setErrors({});

try{

await axios.put(
`http://localhost:3000/api/employees/${id}`,
formData
);

alert("Employee Updated Successfully");

navigate("/employees");

}catch(err){

if(err.response?.data?.errors){
setErrors(err.response.data.errors);
}

}

setLoading(false);

};

return(

<div className="container py-4">

<div className="d-flex justify-content-between align-items-center mb-3">
<h3 className="fw-bold">Update Employee</h3>
<button
className="btn btn-outline-secondary"
onClick={() => navigate("/employees")}
>
← Back
</button>
</div>

<div className="card shadow-lg border-0">

<div className="card-body">

<form onSubmit={handleSubmit}>

<div className="row g-4">

<div className="col-md-4">
<label className="form-label">Employee Code</label>
<input
className="form-control"
name="employee_code"
value={formData.employee_code}
onChange={handleChange}
/>
<small className="text-danger">{errors.employee_code}</small>
</div>

<div className="col-md-4">
<label className="form-label">First Name</label>
<input
className="form-control"
name="first_name"
value={formData.first_name}
onChange={handleChange}
/>
<small className="text-danger">{errors.first_name}</small>
</div>

<div className="col-md-4">
<label className="form-label">Last Name</label>
<input
className="form-control"
name="last_name"
value={formData.last_name}
onChange={handleChange}
/>
</div>

<div className="col-md-4">
<label className="form-label">Email</label>
<input
className="form-control"
name="email"
value={formData.email}
onChange={handleChange}
/>
<small className="text-danger">{errors.email}</small>
</div>

<div className="col-md-4">
<label className="form-label">Phone</label>
<input
className="form-control"
name="phone"
value={formData.phone}
onChange={handleChange}
/>
</div>

<div className="col-md-4">
<label className="form-label">DOB</label>
<input
type="date"
className="form-control"
name="dob"
value={formData.dob}
onChange={handleChange}
/>
</div>

<div className="col-md-4">
<label className="form-label">Gender</label>
<select
className="form-select"
name="gender"
value={formData.gender}
onChange={handleChange}
>
<option value="">Select</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select>
</div>

<div className="col-md-4">
<label className="form-label">Company</label>
<select
className="form-select"
name="company_id"
value={formData.company_id}
onChange={handleChange}
>
<option value="">Select</option>
{companies.map(c=>(
<option key={c.company_id} value={c.company_id}>
{c.company_name}
</option>
))}
</select>
</div>

<div className="col-md-4">
<label className="form-label">Location</label>
<select
className="form-select"
name="location_id"
value={formData.location_id}
onChange={handleChange}
>
<option value="">Select</option>
{locations.map(l=>(
<option key={l.location_id} value={l.location_id}>
{l.location_name} - {l.city}
</option>
))}
</select>
</div>

<div className="col-md-4">
<label className="form-label">Department</label>
<select
className="form-select"
name="department_id"
value={formData.department_id}
onChange={handleChange}
>
<option value="">Select</option>
{departments.map(d=>(
<option key={d.department_id} value={d.department_id}>
{d.department_name}
</option>
))}
</select>
</div>

<div className="col-md-4">
<label className="form-label">Job Position</label>
<select
className="form-select"
name="job_position_id"
value={formData.job_position_id}
onChange={handleChange}
>
<option value="">Select</option>
{positions.map(p=>(
<option key={p.job_position_id} value={p.job_position_id}>
{p.position_title}
</option>
))}
</select>
</div>

<div className="col-md-4">
<label className="form-label">Employment Type</label>
<select
className="form-select"
name="employment_type_id"
value={formData.employment_type_id}
onChange={handleChange}
>
<option value="">Select</option>
{types.map(t=>(
<option key={t.master_data_id} value={t.master_data_id}>
{t.value}
</option>
))}
</select>
</div>

<div className="col-md-4">
<label className="form-label">Reporting Manager</label>
<select
className="form-select"
name="reporting_manager_id"
value={formData.reporting_manager_id}
onChange={handleChange}
>
<option value="">Select</option>
{managers
.filter(m=>Number(m.role_id) === 3)
.map(m=>(
<option key={m.employee_id} value={m.employee_id}>
{m.first_name} {m.last_name}
</option>
))}
</select>
</div>

<div className="col-md-4">
<label className="form-label">Hire Date</label>
<input
type="date"
className="form-control"
name="hire_date"
value={formData.hire_date}
onChange={handleChange}
/>
</div>

</div>

<div className="text-end mt-4">

<button
type="button"
className="btn btn-secondary me-2"
onClick={()=>navigate("/employees")}
>
Cancel
</button>

<button
className="btn btn-primary"
disabled={loading}
>
{loading ? "Updating..." : "Update Employee"}
</button>

</div>

</form>

</div>

</div>

</div>

);

}

export default EmployeeUpdate;