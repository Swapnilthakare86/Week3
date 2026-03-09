import { useEffect, useState } from "react";
import axios from "axios";
import { validateDepartment } from "../validation/validation";

function DepartmentManagement() {
  const emptyForm = { company_id: "", department_name: "" };

  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDepartments();
    fetchCompanies();
  }, []);

  const fetchDepartments = async () => {
    const res = await axios.get("http://localhost:3000/api/departments");
    setDepartments(res.data.data || res.data);
  };

  const fetchCompanies = async () => {
    const res = await axios.get("http://localhost:3000/api/companies");
    setCompanies(res.data.data || res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateDepartment(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/api/departments/${editId}`,
          formData
        );
        alert("Department Updated");
      } else {
        await axios.post("http://localhost:3000/api/departments", formData);
        alert("Department Added");
      }

      setFormData(emptyForm);
      setEditId(null);
      fetchDepartments();
    } catch (err) {
      console.log(err);
      alert("Error saving department");
    }
  };

  const editDepartment = (dept) => {
    setFormData({ company_id: dept.company_id, department_name: dept.department_name });
    setEditId(dept.department_id);
    setErrors({});
  };

  const deleteDepartment = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    await axios.delete(`http://localhost:3000/api/departments/${id}`);
    fetchDepartments();
  };

  const getCompany = (id) => {
    const comp = companies.find((c) => c.company_id === id);
    return comp ? comp.company_name : id;
  };

  return (
    <div className="container mt-4">
      {/* FORM */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white text-center">
          {editId ? "Update Department" : "Add Department"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <select
                  className={`form-select ${errors.company_id ? "is-invalid" : ""}`}
                  name="company_id"
                  value={formData.company_id}
                  onChange={handleChange}
                >
                  <option value="">Select Company</option>
                  {companies.map((c) => (
                    <option key={c.company_id} value={c.company_id}>
                      {c.company_name}
                    </option>
                  ))}
                </select>
                {errors.company_id && <div className="invalid-feedback">{errors.company_id}</div>}
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className={`form-control ${errors.department_name ? "is-invalid" : ""}`}
                  placeholder="Department Name"
                  name="department_name"
                  value={formData.department_name}
                  onChange={handleChange}
                />
                {errors.department_name && <div className="invalid-feedback">{errors.department_name}</div>}
              </div>

              <div className="col-12 text-end">
                <button className="btn btn-success me-2">{editId ? "Update" : "Add"}</button>
                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => { setFormData(emptyForm); setEditId(null); setErrors({}); }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d.department_id}>
              <td>{d.department_id}</td>
              <td>{getCompany(d.company_id)}</td>
              <td>{d.department_name}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => editDepartment(d)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteDepartment(d.department_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentManagement;