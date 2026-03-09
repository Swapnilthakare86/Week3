import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function Salary() {
  const emptyForm = {
    employee_id: "",
    basic_salary: "",
    deductions: "",
    start_date: "", // blank for new entry
  };

  const [formData, setFormData] = useState(emptyForm);
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [editId, setEditId] = useState(null);

  // ================= FETCH EMPLOYEES & SALARIES =================
  useEffect(() => {
    fetchEmployees();
    fetchSalaries();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/employees");
      const data = res.data.data || res.data;
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSalaries = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/salaries");
      setSalaries(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= HANDLE FORM =================
  const handleEmployeeSelect = (selected) => {
    setFormData({ ...formData, employee_id: selected.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/salaries/${editId}`, formData);
        alert("Salary updated successfully");
      } else {
        await axios.post("http://localhost:3000/api/salaries", formData);
        alert("Salary added successfully");
      }
      setFormData(emptyForm);
      setEditId(null);
      fetchSalaries();
    } catch (err) {
      console.error(err);
      alert("Error submitting salary");
    }
  };

  // ================= EDIT =================
  const handleEdit = (salary) => {
    setFormData({
      employee_id: salary.employee_id,
      basic_salary: salary.basic_salary,
      deductions: salary.deductions,
      start_date: salary.start_date ? salary.start_date.slice(0, 10) : "",
    });
    setEditId(salary.salary_id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this salary?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/salaries/${id}`);
      alert("Salary deleted successfully");
      fetchSalaries();
    } catch (err) {
      console.error(err);
      alert("Error deleting salary");
    }
  };

  // ================= EMPLOYEE DROPDOWN =================
  const employeeOptions = employees.map(emp => ({
    value: emp.employee_id,
    label: `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`,
  }));

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.employee_id === id);
    return emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : id;
  };

  // ================= UI =================
  return (
    <div className="container mt-4">
      {/* Add/Edit Form */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h4>{editId ? "Edit Salary" : "Add Salary"}</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label>Employee</label>
                <Select
                  options={employeeOptions}
                  value={employeeOptions.find(e => e.value === formData.employee_id) || null}
                  onChange={handleEmployeeSelect}
                  placeholder="Select Employee"
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Basic Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="basic_salary"
                  value={formData.basic_salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Deductions</label>
                <input
                  type="number"
                  className="form-control"
                  name="deductions"
                  value={formData.deductions}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label>Salary Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="start_date"
                  value={formData.start_date ? formData.start_date.slice(0, 10) : ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 text-end">
                <button className="btn btn-success">{editId ? "Update Salary" : "Add Salary"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Salary List */}
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <h4>Salary List</h4>
        </div>
        <div className="card-body">
          {salaries.length === 0 ? (
            <p>No salaries found</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Employee</th>
                  <th>Basic Salary</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Salary Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map(s => (
                  <tr key={s.salary_id}>
                    <td>{getEmployeeName(s.employee_id)}</td>
                    <td>{s.basic_salary}</td>
                    <td>{s.deductions}</td>
                    <td>{s.basic_salary - s.deductions}</td>
                    <td>{s.start_date ? s.start_date.slice(0, 10) : ""}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.salary_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Salary;