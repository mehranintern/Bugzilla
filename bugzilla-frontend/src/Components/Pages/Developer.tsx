import React from "react";
import { Navbar, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../Images/Logo1.png";

function Developer() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar>
        <img src={Logo} alt="Logo" className="logo-1" />
        <Button
          variant="transparent"
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Navbar>
      <div className="sidebar">
        <ul>
          <li>Home</li>
          <li>Services</li>
          <li>Options</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="mb-4">Assigned Project</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Project A</td>
                  <td>In Progress</td>
                  <td>2023-09-30</td>
                </tr>
                <tr>
                  <td>Project B</td>
                  <td>Completed</td>
                  <td>2023-10-15</td>
                </tr>
                {/* Add more project rows as needed */}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Developer;
