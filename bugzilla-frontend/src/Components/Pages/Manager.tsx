import React, { useState, useEffect } from "react";
import { Navbar, Button, Table, Modal, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../Images/Logo1.png";
import FileUpload from "./FileUpload";
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5000";



function Manager() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any>();
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showProjectDescriptionModal, setShowProjectDescriptionModal] =
    useState(false);
  const [showAvailableDevelopersModal, setShowAvailableDevelopersModal] =
    useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [developers, setDevelopers] = useState<string[]>([]); // State to store the list of developers

  useEffect(() => {
    fetchProjects();
    fetchDevelopers();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const addProject = (name: string, users: any, bugs: any, description: string) => {
    setProjects([...projects, {name: name, users, bugs, description: description}]);
    setShowAddProjectModal(false);
  };

  const openProjectDescriptionModal = (project: any) => {
    setSelectedProject(project?.name);
    // For demonstration, set a static project description here.
    setProjectDescription(project?.description);
    setShowProjectDescriptionModal(true);
  };

  const deleteProject = () => {
    // Implement your logic to delete the project here
    // For example, you can filter the projects array to remove the selected project
    setProjects(projects.filter((project:any) => project !== selectedProject));
    setShowProjectDescriptionModal(false);
  };

  const editProjectDescription = () => {
    // Implement your logic to edit the project description here
    // For example, you can open an editable text area for the description
  };

  const openAvailableDevelopersModal = () => {
    setShowAvailableDevelopersModal(true);
  };

  const closeAvailableDevelopersModal = () => {
    setShowAvailableDevelopersModal(false);
  };

  const fetchDevelopers = async () => {
    try {
      const response = await axios.get("/api/user/getDevelopers");
  
      if (response.status === 200) {
        const developerNames = response?.data?.developers.map((developer : any) => developer?.name);
        setDevelopers(developerNames);
        
      } else {
        console.error("Failed to fetch developers");
      }
    } catch (error) {
      console.error("Error fetching developers:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/project/getItem");
      
      if (response.status === 200) {
        const Projects = response?.data?.projects.map((project:any) => project)
        setProjects(Projects);
      } else {
        console.error("Failed to fetch developers");
      }
    } catch (error) {
      console.error("Error fetching developers:", error);
    }
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
              <th className="d-flex justify-content-between align-items-center">
                Project Name
                <FileUpload onUpload={addProject} />
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project:any, index:any) => (
              <tr key={index}>
                <td className="d-flex justify-content-between align-items-center">
                  <span
                    className="project-name-link"
                    onClick={() => openProjectDescriptionModal(project)}
                  >
                    <div className="project-name">{project.name}</div>
                  </span>
                  <Button
                    variant="dark"
                    size="sm"
                    className="ml-auto"
                    onClick={openAvailableDevelopersModal}
                  >
                    Assign
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/*  Project Modal */}
      <Modal
        show={showAddProjectModal}
        onHide={() => setShowAddProjectModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* Your add project form content goes here */}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddProjectModal(false)}
          >
            Close
          </Button>
          <Button variant="dark" onClick={() => addProject(selectedProject,[],[],projectDescription)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Project Description Modal */}
      <Modal
        show={showProjectDescriptionModal}
        onHide={() => setShowProjectDescriptionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{projectDescription}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteProject}>
            Delete
          </Button>
          <Button variant="dark" onClick={editProjectDescription}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Available Developers Modal */}
      <Modal
        show={showAvailableDevelopersModal}
        onHide={closeAvailableDevelopersModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Available Developers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {developers.map((developer, index) => (
              <ListGroup.Item key={index}>{developer}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAvailableDevelopersModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Manager;