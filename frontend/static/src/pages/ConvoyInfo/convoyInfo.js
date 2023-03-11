// import NoteList from "../../components/Information/checklistForm";
// import { useState, useEffect } from "react";

// function ConvoyInfo() {
//   const categories = ["safety", "vehicle-info", "convoy-checklist"];
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [notes, setNotes] = useState(null);

//   const getNotes = async () => {
//     const response = await fetch(`/api_v1/notes/?category=${selectedCategory}`);

//     if (!response.ok) {
//       throw new Error("Network response was not OK");
//     }
//     const data = await response.json();
//     setNotes(data);
//   };

//   useEffect(() => {
//     getNotes();
//     console.log(notes);
//     // useEffect Dependency array
//   }, [selectedCategory]);

//   return (
//     <>
//       <div>THIS IS INFORMATION PAGE</div>
//       <div>
//         {categories.map((category, index) => (
//           <button
//             id="button"
//             key={index}
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
//       {notes ? (
//         <NoteList notes={notes} setNotes={setNotes} />
//       ) : (
//         <div>Fetching data(add spinner) ...</div>
//       )}
//     </>
//   );
// }

// export default ConvoyInfo;
