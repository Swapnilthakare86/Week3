import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          EMS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link as={Link} to="/employees">Employee</Nav.Link>
            <Nav.Link as={Link} to="/companies">Company</Nav.Link>
            <Nav.Link as={Link} to="/departments">Department</Nav.Link>
            <Nav.Link as={Link} to="/locations">Location</Nav.Link>
            <Nav.Link as={Link} to="/job-positions">Job Position</Nav.Link>
            <Nav.Link as={Link} to="/salary">Salary</Nav.Link>
            <Nav.Link as={Link} to="/attendance">Attendance</Nav.Link>
            <Nav.Link as={Link} to="/leave-add">Apply Leave</Nav.Link>
            <Nav.Link as={Link} to="/leaves">Leave List</Nav.Link>
            <Nav.Link as={Link} to="/manager-approval">Manager Approval</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center ms-auto">
            <Form className="d-flex me-2">
              <Form.Control type="search" placeholder="Search" className="me-2" />
              <Button variant="outline-success">Search</Button>
            </Form>

            {/* Navigate to login */}
            <Button variant="primary" onClick={() => navigate("/login")}>
              Sign in
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;