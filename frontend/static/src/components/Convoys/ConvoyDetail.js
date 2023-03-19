import { useState, useEffect } from "react";
import ListNotes from "./ConvoyList";
import AddNotes from "./ConvoyList";
import NoteList from "./ConvoyList";
import ConvoyList from "./ConvoyList";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ConvoyDetail({
  selectedConvoyDetail,
  records,
  selectedConvoyId,
  setRecords,
  id,
  image,
  title,
  message,
  ...props
}) {
  const categories = ["safety", "vehicle-info", "convoy-checklist"];
  const [category, setCategory] = useState(categories[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(message);
  const [newTitle, setNewTitle] = useState(title);
  const [newImage, setNewImage] = useState(image);
  let recordsHTML;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecord = {
      message: newMessage,
      title: newTitle,
      image: newImage,
    };
    props.editRecord(id, updatedRecord);
    setIsEditing(false);
  };

  const editRecord = async (id, updatedRecord) => {
    setIsEditing(true);
    const formData = new FormData();

    formData.append("message", newMessage);
    formData.append("title", newTitle);
    formData.append("image", newImage);
    // Use the HTTP PATCH method to update the note
    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      // Set the body of the request to the FormData object created earlier
      body: formData,
    };
    // Send the fetch request to the API endpoint for updating a note
    const response = await fetch(`/api_v1/convoys/records/${id}/`, options);

    if (!response.ok) {
      throw new Error("Failed to edit note");
    }
    // Copy the current list of notes and add the updated note to it
    const data = await response.json();
    const updatedRecords = [...records];
    const index = updatedRecords.findIndex((record) => record.id === id);
    updatedRecords[index] = data;
    setRecords([...updatedRecords]);
  };
  const categoryFilters = categories.map((category) => {
    return (
      <button
        className="category-buttons"
        id="button"
        onClick={() => setCategory(category)}
      >
        {category}
      </button>
    );
  });

  if (records) {
    recordsHTML = records
      .filter(
        (record) =>
          record.category === category && record.convoy === selectedConvoyId
      )
      .map((record) => (
        <div>
          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter new note </Form.Label>
                <Form.Control
                  id={record.id}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> New image </Form.Label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="image"
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter new caption </Form.Label>
                <Form.Control
                  id={record.id}
                  className="todo-text"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel{" "}
              </Button>
            </Form>
          ) : (
            <Card id="info-card" className="col-md-8 .max-h-112">
              <Card.Img
                id="info-img"
                className="card-img-top"
                src={record.image}
              />
              <Card.Body>
                <Card.Text>{record.title}</Card.Text>
                <Card.Text>{record.message}</Card.Text>

                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => props.deleteRecord(id)}
                >
                  Delete Note
                </Button>

                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Note
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
      ));
  }

  return (
    <>
      <h2>{selectedConvoyDetail.text}</h2>
      {categoryFilters}
      {recordsHTML}
    </>
  );
}

export default ConvoyDetail;
