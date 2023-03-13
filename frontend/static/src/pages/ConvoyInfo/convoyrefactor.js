// import React, { useState } from "react";

// function AutoCompleteInput() {
//   const [inputValue, setInputValue] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);
//     if (value.length > 0) {
//       setSuggestions(["Option 1", "Option 2", "Option 3"].filter(option =>
//         option.toLowerCase().includes(value.toLowerCase())
//       ));
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionClick = (option) => {
//     setInputValue(option);
//     setSuggestions([]);
//   };

//   return (
//     <div>
//       <input type="text" value={inputValue} onChange={handleInputChange} />
//       {suggestions.length > 0 && (
//         <ul>
//           {suggestions.map((option) => (
//             <li key={option} onClick={() => handleSuggestionClick(option)}>
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AutoCompleteInput;

// import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import Dropdown from "react-bootstrap/Dropdown";
// import Button from "react-bootstrap/Button";

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
//     <form className="stack-small" onSubmit={handleSubmit}>
//       <input
//         id={id}
//         className="todo-text"
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//       />
//       <input
//         type="file"
//         accept="image/png, image/jpeg"
//         className="image"
//         onChange={(e) => setNewImage(e.target.files[0])}
//       />
//       <input
//         id={id}
//         className="todo-text"
//         type="text"
//         value={newTitle}
//         onChange={(e) => setNewTitle(e.target.value)}
//       />
//       <button type="submit">Save Changes</button>
//       <button type="button" onClick={() => setEditing(false)}>
//         Cancel
//       </button>
//     </form>
//   );

//   const previewHTML = (
//     <div className="card" style={{ width: "18rem" }}>
//       <img className="card-img-top" src={image} alt="Card image cap" />
//       <div className="card-body">
//         <h5 className="card-title">{title}</h5>
//         <p className="card-text">{message}</p>
//       </div>

//       <div className="card-body">
//         <button
//           variant="secondary"
//           type="button"
//           onClick={() => props.deleteNote(id)}
//         >
//           Delete Note
//         </button>
//         <button
//           variant="secondary"
//           type="button"
//           onClick={() => setEditing(true)}
//         >
//           Edit Note
//         </button>
//       </div>
//     </div>
//   );

//   return <>{isEditing ? editHTML : previewHTML}</>;
// }

// function NoteList({ notes, setNotes }) {
//   const [isEditing, setEditing] = useState(false);
//   const [category, setCategory] = useState("");
//   const [message, setMessage] = useState("");
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");

//   // Create a new FormData object and add the updated note's body to it
//   const addNote = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();

//     formData.append("image");
//     formData.append("category", category);
//     formData.append("title", title);
//     formData.append("message", message);

//     const options = {
//       method: "POST",
//       headers: {
//         "X-CSRFToken": Cookies.get("csrftoken"),
//       },
//       body: formData,
//     };
//     const response = await fetch("/api_v1/notes/", options);
//     if (!response.ok) {
//       throw new Error("network repsonse not ok.");
//     }
//     const data = await response.json();

//     setNotes([...notes, data]);
//   };

//   const deleteNote = async (id) => {
//     const response = await fetch(`/api_v1/notes/${id}/`, {
//       method: "DELETE",
//       headers: {
//         "X-CSRFToken": Cookies.get("csrftoken"),
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to delete note");
//     }
//     setNotes(notes.filter((note) => note.id !== id));
//   };

//   const editNote = async (id, updatedNote) => {
//     const formData = new FormData();
//     formData.append("message", updatedNote.message);
//     formData.append("category", "safety");
//     formData.append("title", updatedNote.title);
//     formData.append("image", updatedNote.image);

//     console.log(formData);
//     // Use the HTTP PATCH method to update the note
//     const options = {
//       method: "PATCH",
//       headers: {
//         "X-CSRFToken": Cookies.get("csrftoken"),
//       },
//       // Set the body of the request to the FormData object created earlier
//       message: formData,
//       title: formData,
//       image: formData,
//       category: formData,
//     };
//     // Send the fetch request to the API endpoint for updating a note

//     const response = await fetch(`/api_v1/notes/${id}/`, options);

//     if (!response.ok) {
//       throw new Error("Failed to edit note");
//     }
//     // Copy the current list of notes and add the updated note to it
//     const data = await response.json();
//     //const updatedNotes = [...notes, data];
//     // Find the index of the note with the specified id in the updated list of notes
//     //const index = updatedNotes.findIndex((note) => note.id === id);
//     //Replace the old note with the updated note at the specified index
//     //updatedNotes[index] = data;
//     // Set the state of the notes to the updated list of notes

//     const updatedNotes = [...notes];

//     const index = updatedNotes.findIndex((note) => note.id === id);
//     updatedNotes[index] = data;

//     setNotes([...updatedNotes]);
//   };

//   const notesHTML = notes.map((note) => (
//     <Note key={note.id} {...note} deleteNote={deleteNote} editNote={editNote} />
//   ));

//   console.log(notes);

//   const AddNoteForm = () => {
//     return (
//       <form
//         role="alert"
//         aria-live="assertive"
//         aria-atomic="true"
//         onSubmit={addNote}
//       >
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           className="image"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <input
//           onChange={(e) => setTitle(e.target.value)}
//           value={title}
//           type="text"
//           className="title"
//           placeholder="Enter Note Caption Here"
//         />
//         <input
//           onChange={(e) => setMessage(e.target.value)}
//           value={message}
//           type="text"
//           className="message"
//           placeholder="Enter your message here"
//         />
//         <div className="mt-2 pt-2 border-top">
//           <Button type="submit">Add Convoy Notes</Button>
//         </div>
//       </form>
//     );
//   };

//   // add a category section
//   return (
//     <>
//       <div>
//         {notes.map((note) => (
//           <div>
//             <button onClick={() => setEditing(!isEditing)}>editing</button>
//             <div>
//               {!isEditing ? (
//                 " This is the title "
//               ) : (
//                 <input
//                   onChange={(e) => setTitle(e.target.value)}
//                   value={title}
//                   type="text"
//                   className="title"
//                   placeholder="Enter Note Caption Here"
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {AddNoteForm}
//       {/* {buttons} */}
//       {notesHTML}
//     </>
//   );
// }

// export default NoteList;
