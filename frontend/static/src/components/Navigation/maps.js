// import { useState } from "react";
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
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [instructions, setInstructions] = useState(0);

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
        console.log(result);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button type="submit">Get Directions</button>
      </form>
      {response && (
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "400px" }}
          center={response.routes[0].legs[0].start_location}
          zoom={10}
        >
          <DirectionsRenderer
            directions={response}
            onReady={handleDirectionsRender}
          />
          <InfoWindow style={divStyle} onLoad={onLoad} position={position}>
            <div>
              <h1>Info</h1>
            </div>
          </InfoWindow>
          <InfoBox onLoad={onLoad} position={position} options={options}>
            <div
              style={{ backgroundColor: "blue", opacity: 0.75, padding: 12 }}
            >
              <div style={{ fontSize: 12, fontColor: `#08233B` }}>
                Start: Jackson Barracks
              </div>
            </div>
          </InfoBox>
          <InfoBox onLoad={onLoad} position={tmc} options={options}>
            <div style={{ backgroundColor: "red", opacity: 0.85, padding: 12 }}>
              <div style={{ fontSize: 12, fontColor: `#08233B` }}>
                Start: Troop Medical Clinic
              </div>
            </div>
          </InfoBox>
          <InfoBox onLoad={onLoad} position={meritHealth} options={options}>
            <div style={{ backgroundColor: "red", opacity: 0.85, padding: 12 }}>
              <div style={{ fontSize: 12, fontColor: `#08233B` }}>
                Start: Merit Health
              </div>
            </div>
          </InfoBox>
          <InfoBox onLoad={onLoad} position={forrestGeneral} options={options}>
            <div style={{ backgroundColor: "red", opacity: 0.85, padding: 12 }}>
              <div style={{ fontSize: 12, fontColor: `#08233B` }}>
                Start: Forrest General Hospital
              </div>
            </div>
          </InfoBox>
          <InfoBox onLoad={onLoad} position={mgFiringRange} options={options}>
            <div
              style={{ backgroundColor: "yellow", opacity: 0.75, padding: 12 }}
            >
              <div style={{ fontSize: 12, fontColor: `#08233B` }}>
                Start: Machine Gun Range
              </div>
            </div>
          </InfoBox>
        </GoogleMap>
      )}

      <Card style={{ width: "25rem" }}>
        <div>{distance}</div>
        <div>{duration}</div>
        <div>{`${instructions}`}</div>
      </Card>
    </div>
  );
};

export default NavigationMap;
