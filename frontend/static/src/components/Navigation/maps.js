import React, { useState, useEffect, useRef } from "react";

import { DirectionsService } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useMemo } from "react";
import { Component } from "react";
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

/*<script
defer
src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=YOUR_CALLBACK_NAME"
></script> */

const NavigationMap = () => {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [directions, setDirections] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [response, setResponse] = useState(null);

  const originRef = useRef("");
  const destinationRef = useRef("");

  const libraries = ["places"];
  //container for google maps
  const containerStyle = {
    width: "600px",
    height: "600px",
    margin: "100px",
  };
  //center of map lt/lng
  const center = useMemo(
    () => ({
      lat: 29.9511,
      lng: -90.0715,
    }),
    []
  );
  const shelby = useMemo(
    () => ({
      lat: 31.1987,
      lng: -89.1909,
    }),
    []
  );
  const directionsCallback = (res) => {
    console.log(res);

    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res);
      } else {
        console.log("response", res);
      }
    }
  };

  const checkDriving = ({ target: { checked } }) => {
    if (checked) {
      setTravelMode("DRIVING");
    }
  };

  const onClick = () => {
    if (originRef.current.value !== "" && destinationRef.current.value !== "") {
      setOrigin(originRef.current.value);
      setDestination(destinationRef.current.value);
    }
  };
  const onMapClick = (...args) => {
    console.log("onClick args: ", args);
  };
  return (
    <>
      {" "}
      <div className="map">
        <div className="map-settings">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="ORIGIN">Origin</label>
                <br />

                <input
                  id="ORIGIN"
                  className="form-control"
                  type="text"
                  ref={originRef}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="DESTINATION">Destination</label>
                <br />
                <input
                  id="DESTINATION"
                  className="form-control"
                  type="text"
                  ref={destinationRef}
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="DRIVING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={travelMode === "DRIVING"}
                onChange={checkDriving}
              />
              <label className="custom-control-label" htmlFor="DRIVING">
                Driving
              </label>
            </div>
          </div>
        </div>
        <Button onClick={onClick} variant="secondary">
          Start Navigation
        </Button>{" "}
        <GoogleMap
          id="directions"
          googleMapsApiKey={secret_key}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          directions={directions}
          distance={distance}
        >
          <MarkerF position={shelby} />
          {center && <MarkerF position={center} />}
          {directions && (
            <DirectionsService
              duration={duration}
              eslint-disable-next-line
              options={{
                destination: { setDestination },
                origin: { setOrigin },
                travelMode: { setTravelMode },
                callback: { directionsCallback },
              }}
            />
          )}
          onLoad=
          {(directionsService) => {
            console.log(
              "DirectionsService onLoad directionsService: ",
              directionsService
            );
          }}
          {directions && (
            <DirectionsRenderer
              options={{
                directions: { setResponse },
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
        <Form.Group className="mb-3"></Form.Group>
        <Form.Group className="mb-3"></Form.Group>
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>Distance: {distance}</ListGroup.Item>
            <ListGroup.Item>Duration:{duration} </ListGroup.Item>
            <ListGroup.Item>Directions:{directions}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
};
export default NavigationMap;
