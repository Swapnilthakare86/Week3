import { useState } from "react";
import { Form, Button, Alert, Card, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
//import { loginUser } from "../services/api"; // make sure path is correct



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Row className="justify-content-center align-items-center mt-5">
      <Col md={6} lg={4}>
        <Card className="shadow p-4 rounded-2">
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 mb-3" variant="primary">
                Login
              </Button>
            </Form>

            <div className="d-flex justify-content-between">
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/register">Register</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;