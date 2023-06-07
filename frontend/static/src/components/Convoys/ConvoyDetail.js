import { useState, useEffect } from "react";
import ListNotes from "./ConvoyList";
import AddNotes from "./ConvoyList";
import NoteList from "./ConvoyList";
import ConvoyList from "./ConvoyList";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPlus,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function ConvoyDetail({
  selectedConvoyDetail,
  records,
  record,

  selectedConvoyId,
  setRecords,
  id,
  archiveConvoy,
}) {
  function NoteCard({ note, deleteRecord, editRecord }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newMessage, setNewMessage] = useState(note.message);
    const [newTitle, setNewTitle] = useState(note.title);
    const [newImage, setNewImage] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      editRecord(note.id);
      setIsEditing(false);
    };

    return (
      <div key={note.id}>
        {isEditing ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="m-1-mb-3" controlId="formBasicEmail">
              <Form.Label>Enter new text for note</Form.Label>
              <Form.Control
                type="textarea"
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
                id={id}
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
              {isStaff && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => deleteRecord(record.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              )}
              {isStaff && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    editRecord(record.id);
                    setRecordId(record.id);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </Button>
              )}
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }

  const { isStaff } = useContext(AuthContext);
  console.log(isStaff);
  const categories = ["Safety", "Vehicle Info", "Convoy Checklist"];
  const [category, setCategory] = useState(categories[0]);
  const [recordId, setRecordId] = useState("");
  const [isActive, setIsActive] = useState(true);

  console.log(selectedConvoyId);
  console.log(newMessage);

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

  const editRecord = async (id) => {
    setIsEditing(true);
    const formData = new FormData();
    formData.append("message", newMessage);
    formData.append("title", newTitle);
    if (newImage) {
      formData.append("image", newImage);
    }
    formData.append("convoy", selectedConvoyId);

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api_v1/convoys/records/${id}/`, options);

    if (!response.ok) {
      throw new Error("Failed to edit note");
    }

    const data = await response.json();
    const updatedRecords = records.map((record) => {
      if (record.id === id) {
        return data;
      }
      return record;
    });
    setRecords(updatedRecords);
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

  const recordsHTML = records
    .filter((record) => record.category === category)
    .map((record) => (
      <NoteCard
        key={record.id}
        note={record}
        deleteRecord={deleteRecord}
        editRecord={editRecord}
      />
    ));

  // const recordsHTML = records
  //   .filter((record) => record.category === category)
  //   .map((record) => (
  //     <div key={note.id}>
  //       {isEditing ? (

  return (
    <>
      <div id="convoyname">
        {" "}
        <h2>
          {selectedConvoyDetail.text}
          {isStaff && (
            <Button
              id="archivebutton"
              onClick={() => archiveConvoy(selectedConvoyId)}
            >
              Archive Convoy
            </Button>
          )}
        </h2>
        <h4>From: ({selectedConvoyDetail.origin})</h4>
        <h4>To: ({selectedConvoyDetail.destination})</h4>
      </div>

      {categoryFilters}
      {records && recordsHTML}
    </>
  );
}

export default ConvoyDetail;
