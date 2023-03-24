// import { useState } from "react";
import parse from "html-react-parser";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import { useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
  InfoBox,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

const SECRET_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const libraries = ["places"];

const NavigationMap = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [directions, setDirections] = useState(null);
  const [infoBox, setInfoBox] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: SECRET_KEY,
    libraries,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          setResponse(result);

          setDistance(result.routes[0].legs[0].distance.text);
          setDuration(result.routes[0].legs[0].duration.text);

          // const instructions = result.routes[0].legs[0].instructions;

          const instructions = result.routes[0].legs[0].steps;

          setInstructions(instructions.map((x) => x.instructions));

          // make an api call that saves the route:
          // setStartLat(result.routes[0].legs[0].start_location.lat())
          // setStartLong(result.routes[0].legs[0].start_location.lng())
        }
        console.log({ result });
      }
    );
  };

  const handleDirectionsRender = (directions) => {
    setDirections(directions);
  };

  const position = {
    lat: 29.9511,
    lng: -90.0715,
  };
  const tmc = {
    lat: 31.2043,
    lng: -89.2254,
  };
  const forrestGeneral = {
    lat: 31.3182,
    lng: -89.3293,
  };
  const meritHealth = {
    lat: 31.3262,
    lng: -89.36685,
  };
  const mgFiringRange = {
    lat: 31.123,
    lng: -89.1526,
  };

  const onLoad = (marker) => {};

  const options = { closeBoxURL: "", enableEventPropagation: true };

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  console.log({ instructions });

  const instructionsHTML = instructions?.map((instruction, index) => (
    <li key={index}>
      <h2>Step {index + 1}</h2>
      <p>{parse(instruction)}</p>
    </li>
  ));
  console.log({ instructionsHTML });

  return (
    <div>
      <Card>
        <Card.Header id="navigationheadertext" sticky="top">
          <h2>
            <span>☆</span> Navigation
          </h2>
        </Card.Header>
        <Card.Body className="navigationheaderimage">
          <p>Please enter your convoy origin and destination to begin</p>
        </Card.Body>
      </Card>

      <Form className="  m-2 navigationform" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Convoy Origin"
        />
        <Form.Control
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Convoy Destination"
        />
        <Button type="submit">Get Directions</Button>
      </Form>
      {response && (
        <GoogleMap
          id="googlemap"
          className="googlemap"
          mapContainerStyle={{ height: "600px", width: "600px" }}
          center={response.routes[0].legs[0].start_location}
          zoom={10}
        >
          <DirectionsRenderer
            directions={response}
            onReady={handleDirectionsRender}
          />

          <MarkerF
            onLoad={onLoad}
            position={position}
            options={options}
          ></MarkerF>
          <MarkerF onLoad={onLoad} position={tmc} options={options}></MarkerF>
          <MarkerF
            onLoad={onLoad}
            position={meritHealth}
            options={options}
          ></MarkerF>
          <MarkerF
            onLoad={onLoad}
            position={forrestGeneral}
            options={options}
          ></MarkerF>
          <MarkerF
            onLoad={onLoad}
            position={mgFiringRange}
            options={options}
          ></MarkerF>
        </GoogleMap>
      )}

      <Card
        id="directionscard"
        className="directionscard"
        style={{ width: "25rem" }}
      >
        <h3>{distance}</h3>
        <h3>{duration}</h3>
        <p>{instructionsHTML}</p>
      </Card>
    </div>
  );
};

export default NavigationMap;
