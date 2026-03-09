import { useState, useEffect } from "react";
import axios from "axios";
import { validateEmployee } from "../validation/validation";
import { useNavigate } from "react-router-dom";

function EmployeeCreate() {

  const navigate = useNavigate();

  const emptyForm = {
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
  };

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [managers, setManagers] = useState([]);

  // ================= LOAD MASTER DATA =================

  useEffect(() => {

    axios.get("http://localhost:3000/api/companies")
      .then(res => setCompanies(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/departments")
      .then(res => setDepartments(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/job-positions")
      .then(res => setPositions(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/master-data/category/employment_type")
      .then(res => setTypes(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/employees")
      .then(res => setManagers(res.data.data || res.data || []));

    axios.get("http://localhost:3000/api/employees/next-code")
      .then(res => {
        setFormData(prev => ({
          ...prev,
          employee_code: res.data.nextCode
        }));
      })
      .catch(() => {
        setFormData(prev => ({
          ...prev,
          employee_code: "EMP001"
        }));
      });

  }, []);

  // ================= LOAD LOCATIONS =================

  useEffect(() => {

    if (!formData.company_id) {
      setLocations([]);
      return;
    }

    axios
      .get(`http://localhost:3000/api/locations/company/${formData.company_id}`)
      .then(res => setLocations(res.data.data || res.data || []))
      .catch(() => setLocations([]));

  }, [formData.company_id]);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    const validationErrors = validateEmployee({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: validationErrors[name]
    });

  };

  // ================= TOAST =================

  const showToast = (message, type = "success") => {

    setToast({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success"
      });
    }, 1500);

  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validateEmployee(formData);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {

      await axios.post(
        "http://localhost:3000/api/employees",
        formData
      );

      showToast("Employee Created Successfully", "success");

      setFormData(emptyForm);
      setErrors({});

      setTimeout(() => {
        navigate("/employees", { state: { goLastPage: true } });
      }, 1200);

    } catch (err) {

      if (err.response?.data?.errors) {

        const backendErrors = {};

        Object.keys(err.response.data.errors).forEach(key => {
          backendErrors[key] = err.response.data.errors[key];
        });

        setErrors(backendErrors);

      } else if (err.response?.data?.message) {

        showToast(err.response.data.message, "danger");

      } else {

        showToast("Something went wrong", "danger");

      }

    }

    setLoading(false);

  };

  return (

    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold align-items-center">Add Employee</h3>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/employees")}
        >
          ← Back
        </button>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className={`alert alert-${toast.type} position-fixed top-0 end-0 m-4 shadow`}>
          {toast.message}
        </div>
      )}

      <div className="card shadow-lg border-0">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* Employee Code */}
              <div className="col-md-4">
                <label className="form-label">Employee Code</label>
                <input
                  className="form-control"
                  value={formData.employee_code}
                  readOnly
                />
              </div>

              {/* First Name */}
              <div className="col-md-4">
                <label className="form-label">First Name</label>
                <input
                  className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                  name="first_name"
                  value={formData.first_name}
                  placeholder="Enter First Name"
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.first_name}</div>
              </div>

              {/* Last Name */}
              <div className="col-md-4">
                <label className="form-label">Last Name</label>
                <input
                  className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                  name="last_name"
                  value={formData.last_name}
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.last_name}</div>
              </div>

              {/* Email */}
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  placeholder="Enter Email"
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              {/* Phone */}
              <div className="col-md-4">
                <label className="form-label">Phone</label>
                <input
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter Phone"
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.phone}</div>
              </div>

              {/* DOB */}
              <div className="col-md-4">
                <label className="form-label">DOB</label>
                <input
                  type="date"
                  className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.dob}</div>
              </div>

              {/* Gender */}
              <div className="col-md-4">
                <label className="form-label">Gender</label>
                <select
                  className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div className="invalid-feedback">{errors.gender}</div>
              </div>

              {/* Company */}
              <div className="col-md-4">
                <label className="form-label">Company</label>
                <select
                  className={`form-select ${errors.company_id ? "is-invalid" : ""}`}
                  name="company_id"
                  value={formData.company_id}
                  onChange={handleChange}
                >
                  <option value="">Select Company</option>
                  {companies.map(c => (
                    <option key={c.company_id} value={c.company_id}>
                      {c.company_name}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.company_id}</div>
              </div>

              {/* Location */}
              <div className="col-md-4">
                <label className="form-label">Location</label>
                <select
                  className={`form-select ${errors.location_id ? "is-invalid" : ""}`}
                  name="location_id"
                  value={formData.location_id}
                  onChange={handleChange}
                >
                  <option value="">Select Location</option>
                  {locations.map(l => (
                    <option key={l.location_id} value={l.location_id}>
                      {l.location_name} - {l.city}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.location_id}</div>
              </div>

              {/* Department */}
              <div className="col-md-4">
                <label className="form-label">Department</label>
                <select
                  className={`form-select ${errors.department_id ? "is-invalid" : ""}`}
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d.department_id} value={d.department_id}>
                      {d.department_name}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.department_id}</div>
              </div>

              {/* Job Position */}
              <div className="col-md-4">
                <label className="form-label">Job Position</label>
                <select
                  className={`form-select ${errors.job_position_id ? "is-invalid" : ""}`}
                  name="job_position_id"
                  value={formData.job_position_id}
                  onChange={handleChange}
                >
                  <option value="">Select Job</option>
                  {positions.map(p => (
                    <option key={p.job_position_id} value={p.job_position_id}>
                      {p.position_title}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.job_position_id}</div>
              </div>

              {/* Employment Type */}
              <div className="col-md-4">
                <label className="form-label">Employment Type</label>
                <select
                  className={`form-select ${errors.employment_type_id ? "is-invalid" : ""}`}
                  name="employment_type_id"
                  value={formData.employment_type_id}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  {types.map(t => (
                    <option key={t.master_data_id} value={t.master_data_id}>
                      {t.value}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.employment_type_id}</div>
              </div>

              {/* Manager */}
              <div className="col-md-4">
                <label className="form-label">Reporting Manager</label>
                <select
                  className="form-select"
                  name="reporting_manager_id"
                  value={formData.reporting_manager_id}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {managers
                    .filter(m => Number(m.role_id) === 3)
                    .map(m => (
                      <option key={m.employee_id} value={m.employee_id}>
                        {m.first_name} {m.last_name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Hire Date */}
              <div className="col-md-4">
                <label className="form-label">Hire Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.hire_date ? "is-invalid" : ""}`}
                  name="hire_date"
                  value={formData.hire_date}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.hire_date}</div>
              </div>

            </div>

            <div className="text-end mt-4">

              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("/employees")}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : "Add Employee"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default EmployeeCreate;