import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ConvoyForm({ addConvoy }) {
  const [text, setText] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    addConvoy({ text, origin, destination });
    handleClose();
    setText("");
    setOrigin("");
    setDestination("");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add convoy information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="origin">
              <Form.Label>Origin</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setOrigin(e.target.value)}
                value={origin}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="destination">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Form className="convoyaddform" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="text"
          placeholder="Create a new convoy"
        />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form> */}
    </>
  );
}

export default ConvoyForm;
