import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/employees">
          EMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">

             {/* Employee Link (no dropdown) */}
            <Nav.Link as={Link} to="/employees">
              Employee
            </Nav.Link>

            {/* Master Dropdown */}
            <NavDropdown title="Master" id="master-dropdown">
              <NavDropdown.Item as={Link} to="/companies">
                Company
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/departments">
                Department
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/locations">
                Location
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/job-positions">
                Job Position
              </NavDropdown.Item>
            </NavDropdown>

           <Nav.Link as={Link} to="/salary">
              Salary
            </Nav.Link>
            {/* Leave Dropdown */}
            <NavDropdown title="Leave" id="leave-dropdown">
              <NavDropdown.Item as={Link} to="/leave-add">
                Apply Leave
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/leave-list">
                Leave List
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manager-approval">
                Manager Approval
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;