import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-autocomplete";
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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const secret_key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

//testing to see if API key returns
//console.log(secret_key);

/*<script
defer
src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=YOUR_CALLBACK_NAME"
></script> */

function NavigationMap() {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [directions, setDirections] = useState(0);
  const [map, setMap] = useState("");
  const [selected, setSelected] = useState(null);

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
  // This useEffect hook runs every time the distance or duration variables change.
  // If both variables have updated, the hook logs a message to the console with their new values
  useEffect(() => {
    if (distance && duration) {
      console.log("Distance & Duration have updated", distance, duration);
    }
  }, [distance, duration]);
  //This is a callback function that is called when the Google Maps API finishes loading.
  const onLoad = React.useCallback(function callback(map) {
    // Get directions

    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 29.959786, lng: -90.006175 };
    const destination = { lat: 31.197533, lng: -89.205635 };
    // This section of code uses the Google Maps DirectionsService to calculate the driving route
    // between the origin and destination points, and updates the state variables accordingly.
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      // If the DirectionsService was able to calculate the route, and get the directions,
      // distance, and duration  from the result object and update the state variables.
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const directions = result.routes[0].legs[0].steps;
          setDirections(directions.map((x) => x.maneuver));
          setDistance(result.routes[0].legs[0].distance.value);
          setDuration(result.routes[0].legs[0].duration.value);
          // If the DirectionsService was unable to calculate the route, log an error message to the console.
        } else {
          console.error("error fetching directions", result, status);
        }
      }
    );
  }, []);

  // This uses the usePlacesAutocomplete hook from the @react-google-maps/api library to provide
  // an autocomplete feature for the input field

  const {
    ready, // A boolean indicating whether the autocomplete functionality is ready
    value, //The current value of the input field
    suggestions: { data }, //suggested auto complete field
    setValue, //update the value  of input fields
    clearSuggestions, //clears suggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["address"], // Specify the type of location to search for (ie. addresses)
    },
  });

  console.log(ready);
  // This function is called whenever the user types something into the input field. It updates
  // the value of the input field with the current value of the event target.
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // This function is called when the user selects an autocomplete suggestion. It sets the value
  // of the input field to the selected suggestion (with the second argument set to false to prevent
  // the component from re-focusing the input field), clears the suggested options, and then retrieves
  // the latitude and longitude of the selected location using the Google Maps Geocoding API.

  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();
    // Update the selected location with the latitude and longitude data
    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //https://www.npmjs.com/package/@react-google-maps/api
  //information for loadscript and replacing with map
  console.log("Testing with JavaScript Map API");
  return (
    <>
      {" "}
      <div>
        <GooglePlacesAutocomplete
          onChange={handleInput}
          //value={setValue}
          selectprops={{
            value,
            onChange: setValue,
          }}
        />
        Origin
      </div>
      <div>
        <GooglePlacesAutocomplete
          onChange={handleInput}
          //value={setValue}
          selectprops={{
            value,
          }}
        />
        Destination
      </div>
      <Button onClick={handleSelect} variant="secondary">
        Start Navigation
      </Button>{" "}
      <GoogleMap
        googleMapsApiKey={secret_key}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        directions={directions}
        distance={distance}
        onLoad={onLoad}
      >
        {center && <MarkerF position={center} />}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
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
    </>
  );
}

export default NavigationMap;
