import { useEffect, useState } from "react";
import axios from "axios";
import { InputGroup, Form, Button, Alert } from "react-bootstrap";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("success"); // success | danger

  // Fetch All Employees
  const fetchAllEmployees = () => {
    console.log("Fetching ALL employees...");
    setLoading(true);

    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => {
        console.log("All Employees API Response:", res.data);

        const data = res.data.data || res.data;

        if (Array.isArray(data)) {
          setEmployees(data);
        } else {
          setEmployees([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch all error:", err);
        setEmployees([]);
        setLoading(false);
      });
  };

  // Search by Employee ID
  const handleSearch = () => {
    if (!searchId) {
      setMessage("Please enter Employee ID");
      setMsgType("danger");
      return;
    }

    console.log("Searching employee with ID:", searchId);
    setLoading(true);

    axios
      .get(`http://localhost:3000/api/employees/${searchId}`)
      .then((res) => {
        console.log("Search API Response:", res.data);

        const result = res.data.data || res.data;

        if (Array.isArray(result)) {
          setEmployees(result);
        } else if (result && typeof result === "object") {
          setEmployees([result]);
        } else {
          setEmployees([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setEmployees([]);
        setLoading(false);
      });
  };

  // DELETE Employee
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    console.log("Deleting employee ID:", id);

    axios
      .delete(`http://localhost:3000/api/employees/${id}`)
      .then((res) => {
        console.log("Delete API Response:", res.data);

        setMessage("Employee deleted successfully!");
        setMsgType("success");

        fetchAllEmployees();
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setMessage("Failed to delete employee");
        setMsgType("danger");
      });
  };

  // Load all employees on page load
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0 text-center">Employees Details</h4>
        </div>

        <div className="card-body">

          {/* Message */}
          {message && (
            <Alert
              variant={msgType}
              className="text-center"
              onClose={() => setMessage("")}
              dismissible
            >
              {message}
            </Alert>
          )}

          {/* Search Box */}
          <div className="row justify-content-center mb-3">
            <div className="col-12 col-md-6 col-lg-5">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter Employee ID"
                  value={searchId}
                  style={{ width: "180px", flex: "none" }}
                  onChange={(e) => setSearchId(e.target.value)}
                />

                <Button variant="outline-info" className="ms-2" onClick={handleSearch}>
                  Search
                </Button>

                <Button variant="outline-info" className="ms-2" onClick={fetchAllEmployees}>
                  Get All
                </Button>
              </InputGroup>
            </div>
          </div>

          {/* Table */}
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Emp Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Hire Date</th>
                <th>Company</th>
                <th>Department</th>
                <th>Position</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.employee_code}</td>
                    <td>{emp.first_name} {emp.last_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.dob}</td>
                    <td>{emp.hire_date}</td>
                    <td>{emp.company_name}</td>
                    <td>{emp.department_name}</td>
                    <td>{emp.position_title}</td>
                    <td>{emp.role_name}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(emp.employee_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default EmployeeList;