import { weatherAPI } from "../scripts/api";
import { useGeolocated } from "react-geolocated";

export const Weather = () => {
  //* API call
  let area = [{}];
  weatherAPI.get("/cuaca/wilayah.json").then((response) => {
    area = [response.data];
  });
  console.log(area);

  //* Geolocated
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  isGeolocationAvailable
    ? console.log("Geolocated available")
    : console.log("Geolocated not available");
  isGeolocationEnabled
    ? console.log("Geolocated enabled")
    : console.log("Geolocated not enabled");
  coords ? console.log(coords) : console.log("Coords not found");

  return (
    <div className="flex flex-col items-center justify-center bg">
      <h1>Coordinates</h1>
      <p>
        latitude: {coords.latitude} <br />
        longitude: {coords.longitude}
      </p>
    </div>
  );
};
