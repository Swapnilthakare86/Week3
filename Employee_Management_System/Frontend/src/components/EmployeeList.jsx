import { useEffect, useState } from "react";
import axios from "axios";
import { InputGroup, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function EmployeeList() {

  const navigate = useNavigate();
  const location = useLocation();

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("success");

  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // ================= FETCH EMPLOYEES =================

  const fetchEmployees = (goLastPage = false) => {

    setLoading(true);

    axios
      .get("http://localhost:3000/api/employees")
      .then((res) => {

        const data = res.data.data || res.data;

        if (Array.isArray(data)) {

          setEmployees(data);
          setFilteredEmployees(data);

          const totalPages = Math.ceil(data.length / recordsPerPage);

          if (goLastPage) {
            setCurrentPage(totalPages || 1);
          } else {
            setCurrentPage(1);
          }
        }

        setLoading(false);

      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // ================= LOAD DATA =================

  useEffect(() => {

    if (location.state?.goLastPage) {
      fetchEmployees(true);
    } else {
      fetchEmployees(false);
    }

  }, []);

  // ================= SEARCH =================

  useEffect(() => {

    if (searchText === "") {
      setFilteredEmployees(employees);
      setCurrentPage(1);
      return;
    }

    const filtered = employees.filter((emp) => {

      const text = searchText.toLowerCase();

      return (
        emp.employee_code?.toLowerCase().includes(text) ||
        emp.first_name?.toLowerCase().includes(text) ||
        emp.last_name?.toLowerCase().includes(text) ||
        emp.department_name?.toLowerCase().includes(text)
      );

    });

    setFilteredEmployees(filtered);
    setCurrentPage(1);

  }, [searchText, employees]);

  // ================= DELETE =================

  const handleDelete = (id) => {

    if (!window.confirm("Delete this employee?")) return;

    axios
      .delete(`http://localhost:3000/api/employees/${id}`)
      .then(() => {

        setMessage("Employee deleted successfully");
        setMsgType("success");

        fetchEmployees();

      })
      .catch(() => {

        setMessage("Delete failed");
        setMsgType("danger");

      });
  };

  // ================= PAGINATION =================

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = filteredEmployees.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return <div className="text-center mt-4">Loading...</div>;

  return (

    <div className="container mt-4">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-success text-white text-center py-3">
          <h4 className="mb-0 fw-bold">Employees Details</h4>
        </div>

        <div className="card-body">

          {message && (

            <Alert
              variant={msgType}
              dismissible
              onClose={() => setMessage("")}
              className="text-center"
            >
              {message}
            </Alert>

          )}

          <div className="d-flex justify-content-end mb-3">

            <Button
              variant="success"
              onClick={() => navigate("/add-employee")}
            >
              + Add Employee
            </Button>

          </div>

          {/* SEARCH */}

          <div className="row justify-content-center mb-4">

            <div className="col-md-6">

              <InputGroup>

                <Form.Control
                  type="text"
                  placeholder="Search by Emp Code, Name, Department..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

              </InputGroup>

            </div>

          </div>

          {/* TABLE */}

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-dark">

                <tr>
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
                  <th width="150">Action</th>
                </tr>

              </thead>

              <tbody>

                {currentRecords.length > 0 ? (

                  currentRecords.map((emp) => (

                    <tr key={emp.employee_id}>

                      <td>
                        <span className="badge bg-primary">
                          {emp.employee_code}
                        </span>
                      </td>

                      <td>{emp.first_name} {emp.last_name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.gender}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.dob}</td>
                      <td>{emp.hire_date}</td>
                      <td>{emp.company_name}</td>
                      <td>{emp.department_name}</td>
                      <td>{emp.position_title}</td>

                      <td>

                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            navigate(`/update-employee/${emp.employee_id}`)
                          }
                        >
                          Edit
                        </Button>

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

                    <td colSpan="11" className="text-center text-muted">
                      No employees found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}

          {totalPages > 1 && (

            <div className="d-flex justify-content-center mt-4">

              <ul className="pagination">

                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => changePage(currentPage - 1)}
                  >
                    «
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (

                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                  >

                    <button
                      className="page-link"
                      onClick={() => changePage(index + 1)}
                    >
                      {index + 1}
                    </button>

                  </li>

                ))}

                <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => changePage(currentPage + 1)}
                  >
                    »
                  </button>
                </li>

              </ul>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default EmployeeList;