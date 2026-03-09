import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function LeaveRequest() {
  const emptyForm = { employee_id:"", leave_type_id:"", start_date:"", end_date:"", total_days:"", reason:"", status_id:"", applied_on:"", approved_by:"" };
  const [formData, setFormData] = useState(emptyForm);
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/employees").then(res => {
      const data = res.data.data || res.data;
      setEmployees(data);
      setManagers(data.filter(e => Number(e.role_id) === 3));
    });
    axios.get("http://localhost:3000/api/master-data/category/leave_type").then(res => setLeaveTypes(res.data.data || res.data));
    axios.get("http://localhost:3000/api/master-data/category/leave_status").then(res => {
      const pending = (res.data.data || res.data).find(s => s.value==="Pending");
      if(pending) setFormData(prev=>({...prev,status_id:pending.master_data_id}));
    });
  }, []);

  const employeeOptions = employees.map(emp=>({value:emp.employee_id,label:`${emp.employee_code} - ${emp.first_name} ${emp.last_name}`}));

  const handleEmployeeSelect = selected => setFormData({...formData, employee_id:selected.value});
  const handleManagerSelect = e => setFormData({...formData, approved_by:e.target.value});
  const handleChange = e => setFormData({...formData,[e.target.name]:e.target.value});
  const handleDateChange = e => {
    const {name,value}=e.target;
    const updated={...formData,[name]:value};
    updated.total_days=updated.start_date && updated.end_date ? (new Date(updated.end_date)-new Date(updated.start_date))/(1000*60*60*24)+1 : "";
    setFormData(updated);
  };

  const handleSubmit = async e=>{
    e.preventDefault();
    try {
      const payload = {...formData,total_days:Number(formData.total_days),applied_on:new Date().toISOString().slice(0,10)};
      await axios.post("http://localhost:3000/api/leave",payload);
      alert("Leave Request Sent To Manager");
      setFormData(emptyForm);
    } catch(err){console.log(err); alert("Error submitting leave");}
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white"><h4>Apply Leave</h4></div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6"><label>Employee</label>
                <Select options={employeeOptions} onChange={handleEmployeeSelect} placeholder="Search Employee" />
              </div>
              <div className="col-md-6"><label>Leave Type</label>
                <select className="form-control" name="leave_type_id" value={formData.leave_type_id} onChange={handleChange} required>
                  <option value="">Select Leave Type</option>
                  {leaveTypes.map(l=><option key={l.master_data_id} value={l.master_data_id}>{l.value}</option>)}
                </select>
              </div>
              <div className="col-md-4"><label>Start Date</label>
                <input type="date" className="form-control" name="start_date" value={formData.start_date} onChange={handleDateChange} required />
              </div>
              <div className="col-md-4"><label>End Date</label>
                <input type="date" className="form-control" name="end_date" value={formData.end_date} onChange={handleDateChange} required />
              </div>
              <div className="col-md-4"><label>Total Days</label>
                <input className="form-control" value={formData.total_days} readOnly />
              </div>
              <div className="col-md-12"><label>Reason</label>
                <textarea className="form-control" name="reason" value={formData.reason} onChange={handleChange} required />
              </div>
              <div className="col-md-6"><label>Select Manager</label>
                <select className="form-control" value={formData.approved_by} onChange={handleManagerSelect} required>
                  <option value="">Select Manager</option>
                  {managers.map(m=><option key={m.employee_id} value={m.employee_id}>{m.first_name} {m.last_name}</option>)}
                </select>
              </div>
              <div className="col-md-6"><label>Status</label>
                <input className="form-control" value="Pending" readOnly />
              </div>
              <div className="col-12 text-end"><button className="btn btn-success">Apply Leave</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;