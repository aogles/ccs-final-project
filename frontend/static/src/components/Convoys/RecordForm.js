import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

import { Button, Form, Dropdown } from "react-bootstrap";

function RecordForm({ convoys, setConvoys, addRecord, category, setCategory }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [convoy, setConvoy] = useState("");
  //   const [category, setCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addRecord({ message, title, image, category, convoy });
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
    <Accordion id="recordform" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header id="recordformheader">
          Add a new note for your convoy
        </Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Convoy
              </Dropdown.Toggle>
              <Dropdown.Menu>{convoyHTML}</Dropdown.Menu>
            </Dropdown>
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
                <option>Safety</option>
                <option>Vehicle Info</option>
                <option>Convoy Checklist</option>
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
