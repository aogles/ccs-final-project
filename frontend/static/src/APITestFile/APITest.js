import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { DirectionsService } from "@react-google-maps/api";

const secret_key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
//testing to see if API key returns
//console.log(secret_key);

function APITest() {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [directions, setDirections] = useState(0);

  const containerStyle = {
    width: "600px",
    height: "600px",
  };

  const center = {
    lat: 29.9511,
    lng: -90.0715,
  };

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
        <div>Distance: {distance}</div>
        <div>Duration: {duration}</div>
        <div>Directions: {directions}</div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          directions={directions}
          distance={distance}
          onLoad={onLoad}
        >
          {/* Child components, such as markers, info windows, etc.
          <DirectionsRenderer directions={this.state.directions} /> */}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default APITest;
