import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ListNotes({ Notes }) {
  const [notes, setNotes] = useState(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch("/api_v1/notes/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setNotes(data);
      setCategory(data);
      setSelectedCategory(data[0].id);
      console.log(data);
    };
    getNotes();
  }, []);

  const addNotes = async () => {
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
    // formData("");
  };

  if (!notes) {
    return <div>Fetching data ...</div>;
  }

  const NotesHTML = notes.map((note, index) => (
    <div key={index} className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={note.image} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.body}</p>
        <p className="card-text">{note.category}</p>
      </div>

      <div className="card-body">
        <a href="#" className="card-link">
          Card link
        </a>
      </div>
    </div>
  ));
  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      image: image, //retrieves value of image
      title: title, //will give you the value of title
      body: body,
    };
    addNotes(newNote);
  };

  return (
    <>
      <form
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        onSubmit={handleSubmit}
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
          <button type="button" onClick={addNotes}>
            Add Convoy Notes
          </button>
        </div>
      </form>

      {NotesHTML}
    </>
  );
}

export default ListNotes;
