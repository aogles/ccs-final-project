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

  const convoyHTML = convoys.map((convoy) => (
    <Dropdown.Item
      className="convoytoggle"
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
      <main>
        <Card className="sticky-top">
          <Card.Header id="infoHeading">
            <h2>
              <span>☆</span>Convoy Information
            </h2>
          </Card.Header>
          <Card.Body
            style={{
              backgroundImage:
                "url(https://api.army.mil/e2/c/images/2022/10/21/ba22d1b8/max1200.jpg)",
            }}
            className="infoHeaderImage "
          >
            {/* <img
            className="infoHeaderImage"
            src="https://api.army.mil/e2/c/images/2022/12/14/f0e963fa/size1.jpg"
            alt=""
          />  */}
          </Card.Body>
        </Card>
        <Card.Header id="selectconvoyheader">
          Select an existing convoy from below, or create a new one
        </Card.Header>
        <div className="convoybody">
          <RecordForm
            addRecord={addRecord}
            category={category}
            setCategory={setCategory}
            convoys={convoys}
            setConvoys={setConvoys}
          />

          <Dropdown id="convoydropdown">
            <Dropdown.Toggle
              className="convoytoggle"
              variant="success"
              id="dropdown-basic"
            >
              Select a Convoy
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
          <Card.Footer id="convoyformfooter"></Card.Footer>
        </div>
      </main>
    </>
  );
}

export default ConvoyList;
