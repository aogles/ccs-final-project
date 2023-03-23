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
}) {
  const categories = ["Safety", "Vehicle Info", "Convoy Checklist"];
  const [category, setCategory] = useState(categories[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(message);
  const [newTitle, setNewTitle] = useState(title);
  const [newImage, setNewImage] = useState(image);
  const [recordId, setRecordId] = useState("");
  console.log(selectedConvoyId);
  console.log(newMessage);
  let recordsHTML;
  const handleSubmit = (e) => {
    e.preventDefault();

    editRecord();
    setIsEditing(false);
  };
  const deleteRecord = async (id) => {
    const response = await fetch(`/api_v1/convoys/records/${id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    setRecords(records.filter((record) => record.id !== id));
  };

  const editRecord = async () => {
    setIsEditing(true);
    const formData = new FormData();

    formData.append("message", newMessage);
    formData.append("title", newTitle);
    if (newImage) {
      formData.append("image", newImage);
    }
    formData.append("convoy", selectedConvoyId);
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

    const response = await fetch(
      `/api_v1/convoys/records/${recordId}/`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to edit note");
    }
    // Copy the current list of notes and add the updated note to it
    const data = await response.json();
    const updatedRecords = [...records];
    const index = updatedRecords.findIndex((record) => record.id === id);
    updatedRecords[index] = data;
    setRecords([...updatedRecords]);
    console.log(data);
  };

  const categoryFilters = categories.map((category) => {
    return (
      <button
        key={category}
        className="category-buttons"
        id="button"
        onClick={() => setCategory(category)}
      >
        {category}
      </button>
    );
  });
  if (records === null) {
    return <div>Loading...</div>;
  }

  // const recordsHTML = records.map((record) => (
  //   <Card key={record.id} {...record} deleteRecord={deleteRecord}></Card>
  // ));
  console.log(recordId);
  recordsHTML = records
    .filter((record) => record.category === category)
    .map((record) => (
      <div key={record.id}>
        {isEditing ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter new text for note </Form.Label>
              <Form.Control
                id={record.id}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Select new image (Optional) </Form.Label>
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
                onClick={() => deleteRecord(record.id)}
              >
                Delete Note
              </Button>

              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setRecordId(record.id);
                }}
              >
                Edit Note
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    ));
  return (
    <>
      <div id="convoyname">
        {" "}
        <h2>{selectedConvoyDetail.text}</h2>
        <h4>
          From: ({selectedConvoyDetail.origin}) To: (
          {selectedConvoyDetail.destination})
        </h4>
      </div>

      {categoryFilters}
      {records && recordsHTML}
      {deleteRecord}
    </>
  );
}

export default ConvoyDetail;
