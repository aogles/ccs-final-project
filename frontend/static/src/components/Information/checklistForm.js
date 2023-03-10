import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Note({ id, image, title, body, ...props }) {
  const [isEditing, setEditing] = useState(false);
  const [newBody, setNewBody] = useState(body);
  const [newTitle, setNewTitle] = useState(title);
  const [newImage, setNewImage] = useState(image);

  // Dont send the image url back to the database. Only send an image if you select a new image!!!

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = {
      body: newBody,
      title: newTitle,
      image: newImage,
    };

    props.editNote(id, updatedNote);
    setEditing(false);
  };

  const editHTML = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <input
        id={id}
        className="todo-text"
        type="text"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
      />
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="image"
        onChange={(e) => setNewImage(e.target.files[0])}
      />
      <input
        id={id}
        className="todo-text"
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => setEditing(false)}>
        Cancel
      </button>
    </form>
  );

  const previewHTML = (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={image} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
      </div>

      <div className="card-body">
        <button
          variant="secondary"
          type="button"
          onClick={() => props.deleteNote(id)}
        >
          Delete Note
        </button>
        <button
          variant="secondary"
          type="button"
          onClick={() => setEditing(true)}
        >
          Edit Note
        </button>
      </div>
    </div>
  );

  return <>{isEditing ? editHTML : previewHTML}</>;
}

function NoteList({ Notes }) {
  const [notes, setNotes] = useState(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch("/api_v1/notes/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setNotes(data);
    };
    getNotes();
  }, []);

  const addNote = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("body", body);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/notes/", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();
    setNotes([...notes, data]);
    setBody("");
    setImage("");
    setTitle("");
  };

  const deleteNote = async (id) => {
    const response = await fetch(`/api_v1/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Create a new FormData object and add the updated note's body to it
  const editNote = async (id, updatedNote) => {
    const formData = new FormData();
    formData.append("body", updatedNote.body);
    formData.append("title", updatedNote.title);
    formData.append("image", updatedNote.image);
    // Use the HTTP PATCH method to update the note
    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      // Set the body of the request to the FormData object created earlier
      body: formData,
      title: formData,
      image: formData,
    };
    // Send the fetch request to the API endpoint for updating a note
    const response = await fetch(`/api_v1/notes/${id}/`, options);

    if (!response.ok) {
      throw new Error("Failed to edit note");
    }
    // Copy the current list of notes and add the updated note to it
    const data = await response.json();
    //const updatedNotes = [...notes, data];
    // Find the index of the note with the specified id in the updated list of notes
    //const index = updatedNotes.findIndex((note) => note.id === id);
    //Replace the old note with the updated note at the specified index
    //updatedNotes[index] = data;
    // Set the state of the notes to the updated list of notes

    const updatedNotes = [...notes];

    const index = updatedNotes.findIndex((note) => note.id === id);
    updatedNotes[index] = data;

    setNotes([...updatedNotes]);
  };

  if (notes === null) {
    return <div>Fetching data(add spinner) ...</div>;
  }

  const notesHTML = notes.map((note) => (
    <Note key={note.id} {...note} deleteNote={deleteNote} editNote={editNote} />
  ));

  return (
    <>
      <form
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        onSubmit={addNote}
      >
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
          onChange={(e) => setBody(e.target.value)}
          value={body}
          type="text"
          className="body"
          placeholder="Enter your message here"
        />

        <div className="mt-2 pt-2 border-top">
          <button type="submit">Add Convoy Notes</button>
        </div>
      </form>
      {notesHTML}
    </>
  );
}

export default NoteList;