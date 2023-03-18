import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function RecordForm({ addRecord }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    addRecord({ message, title, image, category });

    setMessage("");
    setImage("");
    setTitle("");
    setCategory("");
  };

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add new convoy note</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="title"
              placeholder="Enter Note Caption Here"
            />

            <input
              id="message-input"
              className="form-control "
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              type="text"
              placeholder="Enter your message here"
            />

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
                <option>safety</option>
                <option>vehicle-info</option>
                <option>convoy-checklist</option>
              </select>
            </div>
            <Button type="submit">Add Convoy Notes</Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default RecordForm;
