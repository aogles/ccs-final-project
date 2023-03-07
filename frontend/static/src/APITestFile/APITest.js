import React, { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import { DirectionsService } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useMemo } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  LoadScript,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";

const secret_key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

//testing to see if API key returns
//console.log(secret_key);

function APITest() {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [directions, setDirections] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (""));
  const [direction, setDirection] = useState(null);

  const libraries = ["places"];

  const containerStyle = {
    width: "600px",
    height: "600px",
    margin: "100px",
  };

  const center = useMemo(
    () => ({
      lat: 29.9511,
      lng: -90.0715,
    }),
    []
  );

  useEffect(() => {
    if (distance && duration) {
      console.log("Distance & Duration have updated", distance, duration);
    }
  }, [distance, duration]);

  const onLoad = React.useCallback(function callback(map) {
    // Get directions

    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 29.959786, lng: -90.006175 };
    const destination = { lat: 31.197533, lng: -89.205635 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          //setDirections(result.routes[0].legs[0].steps);
          const directions = result.routes[0].legs[0].steps;

          setDirections(directions.map((x) => x.maneuver));

          console.log(directions);
          //setDirections(result.routes[0].legs[0].steps);
          setDistance(result.routes[0].legs[0].distance.value);
          setDuration(result.routes[0].legs[0].duration.value);
        } else {
          console.error("error fetching directions", result, status);
        }
      }
    );
  }, []);

  // const getTravelTime = (origin, destination) => {
  //   const directionsService = new google.maps.DirectionsService();
  //   directionsService.route(
  //     {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       console.log(result);
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         setDirections(result);
  //       } else {
  //         setError(result);
  //       }
  //     }
  //   );
  // };

  //https://www.npmjs.com/package/@react-google-maps/api
  //information for loadscript and replacing with map
  console.log("Testing with JavaScript Map API");
  return (
    <>
      {" "}
      <LoadScript
        googleMapsApiKey={secret_key}
        loadingElement={<div />}
        containerElement={<div />}
        mapElement={<div />}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          directions={directions}
          distance={distance}
          onLoad={onLoad}
        >
          <MarkerF position={center} />

          {/* Child components, such as markers, info windows, etc.
          <DirectionsRenderer directions={this.state.directions} />
          <Marker position={destination} /> */}
        </GoogleMap>
      </LoadScript>
      <Form.Group className="mb-3">
        <Form.Label>Origin</Form.Label>

        <Form.Control type="text" placeholder="Origin" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Destination</Form.Label>

        <Form.Control type="text" placeholder="Destination" />
      </Form.Group>
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>Distance: {distance}</ListGroup.Item>
          <ListGroup.Item>Duration:{duration} </ListGroup.Item>
          <ListGroup.Item>Directions:{directions}</ListGroup.Item>
        </ListGroup>
      </Card>
      <Button variant="secondary">Start Navigation</Button>{" "}
    </>
  );
}

export default APITest;
