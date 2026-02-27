import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeForm() {
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [managers, setManagers] = useState([]);

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

  // ---------------- FETCH MASTER DATA ----------------
  useEffect(() => {
    axios.get("http://localhost:3000/api/companies")
      .then(res => setCompanies(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/departments")
      .then(res => setDepartments(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/job-positions")
      .then(res => setJobPositions(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/master-data/category/employment_type")
      .then(res => setEmploymentTypes(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/employees")
      .then(res => setManagers(res.data.data || res.data || []));
  }, []);

  // ---------------- FETCH LOCATIONS BY COMPANY ----------------
  useEffect(() => {
    if (!formData.company_id) {
      setLocations([]);
      return;
    }

    axios.get(`http://localhost:3000/api/locations/company/${formData.company_id}`)
      .then(res => setLocations(res.data.data || res.data || []))
      .catch(() => setLocations([]));
  }, [formData.company_id]);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending:", formData);

    try {
      await axios.post("http://localhost:3000/api/employees", formData);
      alert("Employee added successfully!");

      setFormData({
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
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h4>Add Employee</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <label>Employee Code</label>
                <input className="form-control" name="employee_code" value={formData.employee_code} onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label>First Name</label>
                <input className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label>Last Name</label>
                <input className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label>Phone</label>
                <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label>DOB</label>
                <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label>Gender</label>
                <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Company</label>
                <select className="form-select" name="company_id" value={formData.company_id} onChange={handleChange}>
                  <option value="">Select Company</option>
                  {companies.map(c => (
                    <option key={c.company_id} value={c.company_id}>{c.company_name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label>Location</label>
                <select className="form-select" name="location_id" value={formData.location_id} onChange={handleChange}>
                  <option value="">Select Location</option>
                  {locations.map(l => (
                    <option key={l.location_id} value={l.location_id}>
                      {l.location_name} - {l.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label>Department</label>
                <select className="form-select" name="department_id" value={formData.department_id} onChange={handleChange}>
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d.department_id} value={d.department_id}>{d.department_name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label>Job Position</label>
                <select className="form-select" name="job_position_id" value={formData.job_position_id} onChange={handleChange}>
                  <option value="">Select Job</option>
                  {jobPositions.map(j => (
                    <option key={j.job_position_id} value={j.job_position_id}>{j.position_title}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label>Employment Type</label>
                <select className="form-select" name="employment_type_id" value={formData.employment_type_id} onChange={handleChange}>
                  <option value="">Select Type</option>
                  {employmentTypes.map(e => (
                    <option key={e.master_data_id} value={e.master_data_id}>{e.value}</option>
                  ))}
                </select>
              </div>

              {/* ✅ REPORTING MANAGER */}
              <div className="col-md-4">
                <label>Reporting Manager</label>
                <select
                  className="form-select"
                  name="reporting_manager_id"
                  value={formData.reporting_manager_id}
                  onChange={handleChange}
                >
                  <option value="">Select Manager</option>
                  {managers
                    .filter(m => Number(m.role_id) === 3)
                    .map(m => (
                      <option key={m.employee_id} value={m.employee_id}>
                        {m.first_name} {m.last_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-4">
                <label>Joining Date</label>
                <input type="date" className="form-control" name="hire_date" value={formData.hire_date} onChange={handleChange} />
              </div>

            </div>

            <div className="mt-4 text-end">
              <button className="btn btn-success">Add Employee</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;