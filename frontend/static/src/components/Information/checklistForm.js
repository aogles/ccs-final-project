import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function AddNotes({ Notes }) {
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
      console.log(data);
    };
    getNotes();
  }, []);

  /* const addArticle = async () => {
    const article = {
      image: image,
      title: title,
      body: body,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(article),
    };
    const response = await fetch("/api_v1/articles/", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();
    setArticles([...articles, data]);
  };
*/
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

  return <ul>{NotesHTML}</ul>;
}

export default AddNotes;
