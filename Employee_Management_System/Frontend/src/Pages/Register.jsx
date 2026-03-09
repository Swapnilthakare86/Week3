import { useState, useEffect } from "react";
import { Form, Button, Alert, Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { registerUser, getRoles } from "../services/api"; // uncomment when API ready


function Register() {
  const [form, setForm] = useState({
    employee_id: "",
    username: "",
    password: "",
    role_id: ""
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (err) {
        console.error("Failed to fetch roles");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow p-4 rounded-3 register-card">
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="employee_id"
                    value={form.employee_id}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role_id"
                    value={form.role_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button type="submit" className="w-100 mb-2" variant="primary">
                  Register
                </Button>
              </Form>

              <div className="text-center mt-2">
                <a href="/login">Already have an account? Login</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;