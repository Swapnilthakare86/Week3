import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { validateLeaveRequest } from "../validation/validation";

function LeaveRequest() {

  const { id } = useParams();
  const navigate = useNavigate();

  const emptyForm = {
    employee_id:"",
    leave_type_id:"",
    start_date:"",
    end_date:"",
    total_days:"",
    reason:"",
    status_id:"",
    applied_on:"",
    approved_by:""
  };

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [managers, setManagers] = useState([]);

  const isEdit = Boolean(id);

  useEffect(() => {
    fetchMasterData();
    if (isEdit) {
      fetchLeave();
    }
  }, []);

  const fetchMasterData = async () => {

    const empRes = await axios.get("http://localhost:3000/api/employees");
    const typeRes = await axios.get("http://localhost:3000/api/master-data/category/leave_type");
    const statusRes = await axios.get("http://localhost:3000/api/master-data/category/leave_status");

    const empData = empRes.data.data || empRes.data;

    setEmployees(empData);
    setManagers(empData.filter(e => Number(e.role_id) === 3));
    setLeaveTypes(typeRes.data.data || typeRes.data);

    const pending = (statusRes.data.data || statusRes.data)
      .find(s => s.value === "Pending");

    if (pending && !isEdit) {
      setFormData(prev => ({ ...prev, status_id: pending.master_data_id }));
    }
  };

  const fetchLeave = async () => {

    const res = await axios.get(`http://localhost:3000/api/leave/${id}`);
    const data = res.data.data || res.data;

    setFormData({
      employee_id: data.employee_id,
      leave_type_id: data.leave_type_id,
      start_date: data.start_date?.slice(0,10),
      end_date: data.end_date?.slice(0,10),
      total_days: data.total_days,
      reason: data.reason,
      status_id: data.status_id,
      approved_by: data.approved_by
    });
  };

  const employeeOptions = employees.map(emp => ({
    value: emp.employee_id,
    label: `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
  }));

  const handleEmployeeSelect = selected => {
    setFormData({ ...formData, employee_id: selected.value });
  };

  const handleManagerSelect = e => {
    setFormData({ ...formData, approved_by: e.target.value });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = e => {

    const { name, value } = e.target;

    const updated = { ...formData, [name]: value };

    if (updated.start_date && updated.end_date) {
      const diff =
        (new Date(updated.end_date) - new Date(updated.start_date)) /
        (1000 * 60 * 60 * 24) + 1;

      updated.total_days = diff > 0 ? diff : "";
    }

    setFormData(updated);
  };

  const handleSubmit = async e => {

    e.preventDefault();

    const validationErrors = validateLeaveRequest(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {

      const payload = {
        ...formData,
        total_days: Number(formData.total_days),
        applied_on: new Date().toISOString().slice(0,10)
      };

      if (isEdit) {
        await axios.put(`http://localhost:3000/api/leave/${id}`, payload);
        alert("Leave Updated Successfully");
      } else {
        await axios.post("http://localhost:3000/api/leave", payload);
        alert("Leave Request Sent To Manager");
      }

      navigate("/leaves");

    } catch(err) {

      console.log(err);
      alert("Error submitting leave");

    }
  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

          <h4 className="mb-0">{isEdit ? "Edit Leave" : "Apply Leave"}</h4>

          {isEdit && (
            <button
              className="btn btn-light btn-sm"
              onClick={() => navigate("/leaves")}
            >
              Back
            </button>
          )}

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-6">
                <label>Employee</label>

                <Select
                  options={employeeOptions}
                  value={employeeOptions.find(e => e.value === formData.employee_id)}
                  onChange={handleEmployeeSelect}
                />

                {errors.employee_id && (
                  <small className="text-danger">{errors.employee_id}</small>
                )}
              </div>

              <div className="col-md-6">
                <label>Leave Type</label>

                <select
                  className="form-control"
                  name="leave_type_id"
                  value={formData.leave_type_id}
                  onChange={handleChange}
                >

                  <option value="">Select Leave Type</option>

                  {leaveTypes.map(l => (
                    <option key={l.master_data_id} value={l.master_data_id}>
                      {l.value}
                    </option>
                  ))}

                </select>

                {errors.leave_type_id && (
                  <small className="text-danger">{errors.leave_type_id}</small>
                )}
              </div>

              <div className="col-md-4">
                <label>Start Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleDateChange}
                />

                {errors.start_date && (
                  <small className="text-danger">{errors.start_date}</small>
                )}
              </div>

              <div className="col-md-4">
                <label>End Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleDateChange}
                />

                {errors.end_date && (
                  <small className="text-danger">{errors.end_date}</small>
                )}
              </div>

              <div className="col-md-4">
                <label>Total Days</label>

                <input
                  className="form-control"
                  value={formData.total_days}
                  readOnly
                />
              </div>

              <div className="col-md-12">
                <label>Reason</label>

                <textarea
                  className="form-control"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                />

                {errors.reason && (
                  <small className="text-danger">{errors.reason}</small>
                )}
              </div>

              <div className="col-md-6">
                <label>Select Manager</label>

                <select
                  className="form-control"
                  value={formData.approved_by}
                  onChange={handleManagerSelect}
                >

                  <option value="">Select Manager</option>

                  {managers.map(m => (
                    <option key={m.employee_id} value={m.employee_id}>
                      {m.first_name} {m.last_name}
                    </option>
                  ))}

                </select>

                {errors.approved_by && (
                  <small className="text-danger">{errors.approved_by}</small>
                )}
              </div>

              <div className="col-md-6">
                <label>Status</label>

                <input className="form-control" value="Pending" readOnly />
              </div>

              <div className="col-12 text-end">

                <button className="btn btn-success">
                  {isEdit ? "Update Leave" : "Apply Leave"}
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default LeaveRequest;