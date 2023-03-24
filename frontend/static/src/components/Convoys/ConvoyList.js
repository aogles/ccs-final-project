// import Card from "react-bootstrap/Card";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import ConvoyForm from "./ConvoyForm";
import ConvoyDetail from "./ConvoyDetail";
import RecordForm from "./RecordForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faFilePen,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

// // Dont send the image url back to the database. Only send an image if you select a new image!!!

function ConvoyList() {
  const [convoys, setConvoys] = useState(null);
  const [selectedConvoyId, setSelectedConvoyId] = useState(null);
  const [selectedConvoyDetail, setSelectedConvoyDetail] = useState(null);
  const [records, setRecords] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getConvoys = async () => {
      const response = await fetch("/api_v1/convoys/?is_active=True");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setConvoys(data);
    };
    getConvoys();
  }, []);

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

  if (!convoys) {
    return <Spinner animation="border" variant="success" />;
  }
  const addRecord = async ({ message, title, image, category }) => {
    // event.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("title", title);
    formData.append("category", category);
    formData.append("message", message);
    formData.append("convoy", selectedConvoyId);
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
    // setMessage("");
    // // setImage("");
    // setTitle("");
    // setCategory("");
    // updatedConvoyDetail = { ...selectedConvoyDetail };
    // console.log(selectedConvoyDetail);
    // console.log(data);
    // updatedConvoyDetail.records.push(data);
  };
  const archiveConvoy = async (id) => {
    // setIsActive(false);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        is_active: false,
      }),
    };
    const response = await fetch(`/api_v1/convoys/${id}/`, options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();
    const updatedConvoys = [...convoys];
    const index = updatedConvoys.findIndex(
      (convoy) => convoy.id === selectedConvoyId
    );
    updatedConvoys.splice(index, 1);
    setConvoys(updatedConvoys);
    setSelectedConvoyId(null);
    setSelectedConvoyDetail(null);
  };

  const convoySelectHTML = convoys.map((convoy) => (
    <Dropdown.Item
      className="convoytoggle"
      key={convoy.id}
      type="button"
      onClick={() => setSelectedConvoyId(convoy.id)}
    >
      {convoy.text}
    </Dropdown.Item>
  ));
  return (
    <>
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
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
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

      <div>
        <Dropdown id="convoydropdown">
          <Dropdown.Toggle className="convoytoggle" id="dropdown-basic">
            Select a convoy
          </Dropdown.Toggle>
          <Dropdown.Menu>{convoySelectHTML}</Dropdown.Menu>
        </Dropdown>
        <ConvoyForm addConvoy={addConvoy} />
      </div>
      {selectedConvoyDetail && (
        <>
          <div className="convoybody">
            <RecordForm
              addRecord={addRecord}
              category={category}
              setCategory={setCategory}
              convoys={convoys}
              setConvoys={setConvoys}
            />
          </div>
          <ConvoyDetail
            selectedConvoyDetail={selectedConvoyDetail}
            records={records}
            selectedConvoyId={selectedConvoyId}
            setRecords={setRecords}
            archiveConvoy={archiveConvoy}
          />
        </>
      )}
    </>
  );
}

export default ConvoyList;
