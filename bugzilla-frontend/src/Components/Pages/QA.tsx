import React, { useState } from "react";
import { Navbar, Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../Images/Logo1.png";

function QA() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const projects = [
    "Project A",
    "Project B",
    "Project C",
    "Project D",
    "Project E",
  ];

  // State to manage the selected project and modal visibility
  const [selectedProject, setSelectedProject] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal and set the selected project
  const openProjectModal = (projectName : any) => {
    setSelectedProject(projectName);
    setShowModal(true);
  };

  // Function to close the modal
  const closeProjectModal = () => {
    setShowModal(false);
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

      <div className="projects-table">
        <h2>Projects</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project Names</th>
            </tr>
          </thead>
          <tbody className="project-name">
            {projects.map((project, index) => (
              <tr key={index} onClick={() => openProjectModal(project)}>
                <td>{project}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Project Description Modal */}
      <Modal show={showModal} onHide={closeProjectModal}>
        <Modal.Header closeButton>
          <Modal.Title>Project Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Description for {selectedProject}</p>
          {/* Add your project description here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeProjectModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QA;
