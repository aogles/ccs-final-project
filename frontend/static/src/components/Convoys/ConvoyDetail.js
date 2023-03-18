import { useState, useEffect } from "react";
import ListNotes from "./ConvoyList";
import AddNotes from "./ConvoyList";
import NoteList from "./ConvoyList";
import ConvoyList from "./ConvoyList";

function ConvoyDetail({ selectedConvoyDetail }) {
  const [category, setCategory] = useState("safety");
  const [records, setRecords] = useState(null);
  const categories = ["safety", "vehicle-info", "convoy-checklist"];

  useEffect(() => {
    const { records } = selectedConvoyDetail;
    console.log(records);
    setRecords(records);
  }, [selectedConvoyDetail]);

  const buttons = categories.map((category) => {
    return (
      <button
        className="category-buttons"
        id="button"
        onClick={() => setCategory(category)}
      >
        {category}{" "}
      </button>
    );
  });

  let recordsHTML;
  if (records) {
    recordsHTML = records
      .filter((record) => record.category === category)
      .map((record) => <div>I am a record</div>);
  }

  return (
    <>
      <h2>{selectedConvoyDetail.text}</h2>
      {recordsHTML}
      {buttons}
    </>
  );
}

export default ConvoyDetail;
