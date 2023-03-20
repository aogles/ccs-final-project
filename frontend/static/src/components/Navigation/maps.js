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
  MarkerF,
} from "@react-google-maps/api";

const SECRET_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const libraries = ["places"];

const NavigationMap = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [directions, setDirections] = useState(null);
  const [infoBox, setInfoBox] = useState("");

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
        }
      }
    );
  };

  const handleDirectionsRender = (directions) => {
    setDirections(directions);
  };

  const center = {
    lat: 29.9511,
    lng: -90.0715,
  };

  const options = { closeBoxURL: "", enableEventPropagation: true };

  const onLoad = (marker) => {
    console.log("infoBox: ", marker);
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
          <MarkerF
            onLoad={onLoad}
            options={options}
            position={center}
          ></MarkerF>
        </GoogleMap>
      )}

      <Card style={{ width: "25rem" }}>
        <div>{directions}</div>
      </Card>
    </div>
  );
};

export default NavigationMap;
