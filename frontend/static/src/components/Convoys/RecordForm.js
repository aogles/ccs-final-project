import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faFilePen } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Dropdown } from "react-bootstrap";

function RecordForm({ convoys, setConvoys, addRecord, category, setCategory }) {
  const { isStaff } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [convoy, setConvoy] = useState("");
  const [show, setShow] = useState(false);
  //   const [category, setCategory] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    addRecord({ message, title, image, category });
    handleClose();
    setConvoy("");
    setMessage("");
    setImage("");
    setTitle("");
    setCategory("");
  };
  const convoyHTML = convoys.map((convoy) => (
    <Dropdown.Item
      id="selectconvoybutton"
      key={convoy.id}
      type="button"
      onClick={() => {
        setConvoy(convoy.id);
      }}
    >
      {convoy.text}
    </Dropdown.Item>
  ));
  //   console.log(category);
  return (
    <>
      {isStaff && (
        <Button className="infoaddform" id="infoaddform" onClick={handleShow}>
          <FontAwesomeIcon icon={faFilePen} />
        </Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a note for you convoy</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div class="mb-3">
              <label for="formFile" class="form-label">
                Select an image
              </label>
              <input
                class="form-control image"
                type="file"
                id="formFile"
                accept="image/png, image/jpeg"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <Form.Group className="mb-3" controlId="origin">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                className="title"
                placeholder="Enter Note Caption Here"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="destination">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="textarea"
                id="message-input"
                className="form-control "
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Enter your message here"
              />
            </Form.Group>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">
                Select a Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option>Select a note category </option>
                <option>Safety</option>
                <option>Vehicle Info</option>
                <option>Convoy Checklist</option>
              </select>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecordForm;
