import Card from "react-bootstrap/Card";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ConvoyForm from "./ConvoyForm";
import ConvoyDetail from "./ConvoyDetail";
import RecordForm from "./RecordForm";

// function Note({ id, image, title, message, ...props }) {
//   const [isEditing, setEditing] = useState(false);
//   const [newMessage, setNewMessage] = useState(message);
//   const [newTitle, setNewTitle] = useState(title);
//   const [newImage, setNewImage] = useState(image);

//   // Dont send the image url back to the database. Only send an image if you select a new image!!!

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedNote = {
//       message: newMessage,
//       title: newTitle,
//       image: newImage,
//     };

//     props.editNote(id, updatedNote);
//     setEditing(false);
//   };

//   const editHTML = (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter new note </Form.Label>
//         <Form.Control
//           id={id}
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label> New image </Form.Label>
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           className="image"
//           onChange={(e) => setNewImage(e.target.files[0])}
//         />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Enter new caption </Form.Label>
//         <Form.Control
//           id={id}
//           className="todo-text"
//           type="text"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//       <Button type="button" onClick={() => setEditing(false)}>
//         Cancel{" "}
//       </Button>
//     </Form>
//   );

//   const previewHTML = (
//     <Card id="info-card" className="col-md-8 .max-h-112">
//       <Card.Img id="info-img" className="card-img-top" src={image} />
//       <Card.Body>
//         <Card.Text>{title}</Card.Text>
//         <Card.Text>{message}</Card.Text>

//         <Button
//           variant="secondary"
//           type="button"
//           onClick={() => props.deleteNote(id)}
//         >
//           Delete Note
//         </Button>

//         <Button
//           variant="secondary"
//           type="button"
//           onClick={() => setEditing(true)}
//         >
//           Edit Note
//         </Button>
//       </Card.Body>
//     </Card>
//   );

//   return <>{isEditing ? editHTML : previewHTML}</>;
// }

function ConvoyList() {
  const [convoys, setConvoys] = useState([]);
  const [selectedConvoyId, setSelectedConvoyId] = useState(null);
  const [selectedConvoyDetail, setSelectedConvoyDetail] = useState(null);
  const [updatedConvoyDetail, setupdatedConvoyDetail] = useState(null);
  const [records, setRecords] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getRecords = async () => {
      const response = await fetch("/api_v1/convoys/records");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setRecords(data);
      // setSelectedConvoy(data[0].id);
    };
    getRecords();
  }, []);

  useEffect(() => {
    const getConvoys = async () => {
      const response = await fetch("/api_v1/convoys/?is_active=True");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setConvoys(data);
      // setSelectedConvoy(data[0].id);
    };
    getConvoys();
  }, []);

  useEffect(() => {
    const getConvoyDetail = async () => {
      const response = await fetch(`/api_v1/convoys/${selectedConvoyId}/`);

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      console.log(data);
      setSelectedConvoyDetail(data);
    };

    if (selectedConvoyId !== null) {
      getConvoyDetail();
    }
  }, [selectedConvoyId]);

  const addConvoy = async (convoy) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(convoy),
    };
    const response = await fetch("/api_v1/convoys/", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();

    setConvoys([...convoys, data]);
    setSelectedConvoyId(data.id);
  };

  const addRecord = async (message, title, image, category) => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("message", message);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/convoys/records/", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();
    setRecords([...records, data]);
    setMessage("");
    setImage("");
    setTitle("");
    setCategory("");
    updatedConvoyDetail = { ...selectedConvoyDetail };
    console.log(selectedConvoyDetail);
    console.log(data);
    updatedConvoyDetail.records.push(data);
  };
  // implement the logic to add a new record
  // sample snippet of what you want to do once you save the record
  // const data = { id: 2, prop: "value" };
  // updatedConvoyDetail = { ...selectedConvoyDetail };
  // updateConvoyDetail.records.push(data);

  // const deleteNote = async (id) => {
  //   const response = await fetch(`/api_v1/notes/${id}/`, {
  //     method: "DELETE",
  //     headers: {
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //     },
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to delete note");
  //   }
  //   setNotes(notes.filter((note) => note.id !== id));
  // };

  // Create a new FormData object and add the updated note's body to it
  // const editNote = async (id, updatedNote) => {
  //   const formData = new FormData();
  //   formData.append("message", updatedNote.message);
  //   formData.append("title", updatedNote.title);
  //   formData.append("image", updatedNote.image);
  //   // Use the HTTP PATCH method to update the note
  //   const options = {
  //     method: "PATCH",
  //     headers: {
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //     },
  //     // Set the body of the request to the FormData object created earlier
  //     body: formData,
  //   };
  //   // Send the fetch request to the API endpoint for updating a note
  //   const response = await fetch(`/api_v1/notes/${id}/`, options);

  //   if (!response.ok) {
  //     throw new Error("Failed to edit note");
  //   }
  //   // Copy the current list of notes and add the updated note to it
  //   const data = await response.json();
  //   //const updatedNotes = [...notes, data];
  //   // Find the index of the note with the specified id in the updated list of notes
  //   //const index = updatedNotes.findIndex((note) => note.id === id);
  //   //Replace the old note with the updated note at the specified index
  //   //updatedNotes[index] = data;
  //   // Set the state of the notes to the updated list of notes

  //   const updatedNotes = [...notes];

  //   const index = updatedNotes.findIndex((note) => note.id === id);
  //   updatedNotes[index] = data;

  //   setNotes([...updatedNotes]);
  // };

  const recordsHTML = records.map((record) => (
    <Card
      key={record.id}
      {...record}
      // deleteRecord={deleterecord}
      // editRecord={editRecord}
    />
  ));

  if (convoys === null) {
    return <div>Loading...</div>;
  }

  const convoyHTML = convoys.map((convoy) => (
    <Dropdown.Item
      key={convoy.id}
      type="button"
      onClick={() => setSelectedConvoyId(convoy.id)}
    >
      {" "}
      {convoy.text}
    </Dropdown.Item>
  ));

  return (
    <>
      <RecordForm addRecord={addRecord} />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Convoy
        </Dropdown.Toggle>
        <Dropdown.Menu>{convoyHTML}</Dropdown.Menu>
      </Dropdown>
      <ConvoyForm addConvoy={addConvoy} />
      {selectedConvoyDetail && (
        <ConvoyDetail selectedConvoyDetail={selectedConvoyDetail} />
      )}
      {recordsHTML}
    </>
  );
}

export default ConvoyList;

//       <Card style={{ width: "18rem" }}>
//         <Card.Body>
//           <Card.Title>Add convoy</Card.Title>

//         </Card.Body>
//       </Card>
//       <Dropdown style={{ width: "18rem" }}>
//         <Dropdown.Toggle
//           style={{ width: "18rem" }}
//           className="togglebutton"
//           variant="success"
//           id="dropdown-basic"
//         >
//           Convoy by Section
//         </Dropdown.Toggle>

//       </Dropdown>

//       {buttons}
//       {notesHTML}
