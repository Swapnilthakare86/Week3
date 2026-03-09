import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";


function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await forgotPassword({ username });
      setMessage(response.data.message || "Check your email for reset instructions.");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default ForgotPassword;