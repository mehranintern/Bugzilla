import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
axios.defaults.baseURL = "http://localhost:5000";

interface FileUploadProps {
  onUpload: (name: string, users: any, bugs: any, description: string) => void; // Updated type to accept a string
}

function FileUpload({ onUpload }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("my_file", selectedFile);

      const response = await axios.post("/upload", formData);

      if (response.data.secure_url) {
        onUpload(projectName, [], [], projectDescription); // Pass the project name to the onUpload function
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleAddProjectClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {

    try {
      console.log(projectDescription);
      const response = await axios.post("/api/project/postItem", {name: projectName, users: [], bugs: [], description: projectDescription});
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // You can handle the form submission here
    // For example, send the project name and description to a server
    // Reset the form fields and close the modal
    onUpload(projectName, [], [], projectDescription); // Pass the project name when the form is submitted
    setProjectName("");
    setProjectDescription("");
    setShowModal(false);
  };

  return (
    <div>
      
      <Button
        variant="transparent"
        size="sm"
        className="buttons"
        onClick={handleAddProjectClick}
      >
        Add Project
      </Button>
     

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="project-form">
            <Form.Group controlId="projectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FileUpload;
