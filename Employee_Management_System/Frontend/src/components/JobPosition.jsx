import { useEffect, useState } from "react";
import axios from "axios";

function JobPosition() {

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [positionTitle, setPositionTitle] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDepartments();
    fetchPositions();
  }, []);

  const fetchDepartments = async () => {
    const res = await axios.get("http://localhost:3000/api/departments");
    setDepartments(res.data.data || res.data);
  };

  const fetchPositions = async () => {
    const res = await axios.get("http://localhost:3000/api/job-positions");
    setPositions(res.data.data || res.data);
  };

  const handleDepartmentChange = (e) => {

    const deptId = e.target.value;

    setSelectedDepartment(deptId);

    const filtered = positions.filter(
      (p) => p.department_id == deptId
    );

    setFilteredPositions(filtered);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!selectedDepartment) {
      alert("Please select department");
      return;
    }

    const data = {
      department_id: selectedDepartment,
      position_title: positionTitle
    };

    try {

      if (editId) {

        await axios.put(
          `http://localhost:3000/api/job-positions/${editId}`,
          data
        );

        alert("Position Updated");

      } else {

        await axios.post(
          "http://localhost:3000/api/job-positions",
          data
        );

        alert("Position Added");
      }

      setPositionTitle("");
      setEditId(null);

      const updated = await axios.get("http://localhost:3000/api/job-positions");

      const all = updated.data.data || updated.data;

      setPositions(all);

      const filtered = all.filter(
        (p) => p.department_id == selectedDepartment
      );

      setFilteredPositions(filtered);

    } catch (err) {

      console.log(err);
      alert("Error saving position");

    }

  };

  const editPosition = (pos) => {

    setPositionTitle(pos.position_title);
    setEditId(pos.job_position_id);

  };

  const deletePosition = async (id) => {

    if (!window.confirm("Delete this position?")) return;

    await axios.delete(`http://localhost:3000/api/job-positions/${id}`);

    const updated = positions.filter(
      (p) => p.job_position_id !== id
    );

    setPositions(updated);

    const filtered = updated.filter(
      (p) => p.department_id == selectedDepartment
    );

    setFilteredPositions(filtered);

  };

  return (

    <div className="container mt-4">

      {/* Department Card */}

      <div className="card shadow mb-4 col-md-6 mx-auto">

        <div className="card-header bg-primary text-white text-center">
          Select Department
        </div>

        <div className="card-body">

          <select
            className="form-select"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >

            <option value="">Select Department</option>

            {departments.map((d) => (
              <option key={d.department_id} value={d.department_id}>
                {d.department_name}
              </option>
            ))}

          </select>

        </div>

      </div>

      {/* Add Position Card */}

      {selectedDepartment && (

        <div className="card shadow mb-4 col-md-6 mx-auto">

          <div className="card-header bg-success text-white text-center">
            {editId ? "Update Position" : "Add New Position"}
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Position Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Position Title"
                  value={positionTitle}
                  onChange={(e) => setPositionTitle(e.target.value)}
                  required
                />

              </div>

              <div className="text-center">

                <button className="btn btn-success px-4">
                  {editId ? "Update Position" : "Add Position"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* Table Card */}

      {selectedDepartment && (

        <div className="card shadow">

          <div className="card-header bg-dark text-white text-center">
            Job Positions List
          </div>

          <div className="card-body">

            <table className="table table-bordered table-hover">

              <thead className="table-secondary">

                <tr>
                  <th>ID</th>
                  <th>Position Title</th>
                  <th width="150">Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredPositions.length === 0 ? (

                  <tr>
                    <td colSpan="3" className="text-center">
                      No positions found
                    </td>
                  </tr>

                ) : (

                  filteredPositions.map((p) => (

                    <tr key={p.job_position_id}>

                      <td>{p.job_position_id}</td>

                      <td>{p.position_title}</td>

                      <td>

                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => editPosition(p)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deletePosition(p.job_position_id)}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>

  );

}

export default JobPosition;