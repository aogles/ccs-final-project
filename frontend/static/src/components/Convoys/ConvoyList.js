import Card from "react-bootstrap/Card";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ConvoyForm from "./ConvoyForm";
import ConvoyDetail from "./ConvoyDetail";
import RecordForm from "./RecordForm";

// Dont send the image url back to the database. Only send an image if you select a new image!!!

function ConvoyList() {
  const [convoys, setConvoys] = useState([]);
  const [text, setText] = useState("");
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
      if (selectedConvoyId) {
        const response = await fetch(
          `/api_v1/convoys/records/?convoy=${selectedConvoyId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        setRecords(data);
      }
    };

    getRecords();
  }, [selectedConvoyId]);

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
      setSelectedConvoyDetail(data);
    };

    if (selectedConvoyId !== null) {
      getConvoyDetail();
    }
  }, [selectedConvoyId]);

  const addConvoy = async () => {
    const convoy = {
      text: text,
    };
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

  const addRecord = async ({ message, title, image, category, convoy }) => {
    // event.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("title", title);
    formData.append("category", category);
    formData.append("message", message);
    formData.append("convoy", convoy);
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
    // setImage("");
    setTitle("");
    // setCategory("");
    // updatedConvoyDetail = { ...selectedConvoyDetail };
    // console.log(selectedConvoyDetail);
    // console.log(data);
    // updatedConvoyDetail.records.push(data);
  };
  // implement the logic to add a new record
  // sample snippet of what you want to do once you save the record
  // const data = { id: 2, prop: "value" };
  // updatedConvoyDetail = { ...selectedConvoyDetail };
  // updatedConvoyDetail.records.push(data);

  // const deleteRecord = async (id) => {
  //   const response = await fetch(`/api_v1/convoys/records/${id}/`, {
  //     method: "DELETE",
  //     headers: {
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //     },
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to delete note");
  //   }
  //   setRecords(records.filter((record) => record.id !== id));
  // };

  // Create a new FormData object and add the updated note's body to it

  // const editRecord = async (id, updatedRecord) => {
  //   const formData = new FormData();
  //   formData.append("message", updatedRecord.message);
  //   formData.append("title", updatedRecord.title);
  //   formData.append("image", updatedRecord.image);
  //   formData.append("convoy", updatedRecord.convoy);
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
  //   const response = await fetch(`/api_v1/convoys/records/${id}/`, options);

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

  //   const updatedRecords = [...records];

  //   const index = updatedRecords.findIndex((record) => record.id === id);
  //   updatedRecords[index] = data;

  //   setRecords([...updatedRecords]);
  // };

  // <Card
  //   key={record.id}
  //   {...record}
  //   // deleteRecord={deleteRecord}
  //   // editRecord={editRecord}
  // />;
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
      <RecordForm
        addRecord={addRecord}
        category={category}
        setCategory={setCategory}
        convoys={convoys}
        setConvoys={setConvoys}
      />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Convoy
        </Dropdown.Toggle>
        <Dropdown.Menu>{convoyHTML}</Dropdown.Menu>
      </Dropdown>
      <ConvoyForm addConvoy={addConvoy} />
      {selectedConvoyDetail && (
        <ConvoyDetail
          selectedConvoyDetail={selectedConvoyDetail}
          records={records}
          selectedConvoyId={selectedConvoyId}
          setRecords={setRecords}
        />
      )}
    </>
  );
}

export default ConvoyList;
