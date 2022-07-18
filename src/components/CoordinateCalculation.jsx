import { weatherAPI } from "../scripts/api";
import { useGeolocated } from "react-geolocated";
import { useEffect, useState } from "react";

export const CoordinateCalculation = (props) => {
  //* States
  const [areasArr, setAreasArr] = useState([]);
  let areas;

  //* API call to get data of all areas in Indonesia
  useEffect(() => {
    async function fetchAPI() {
      weatherAPI
        .get("/cuaca/wilayah.json")
        .then((response) => {
          setAreasArr(response.data);
        })
        .catch((err) => console.log(err));
    }
    fetchAPI();
  }, []);

  //* Geolocated Configuration
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  //* Location checking
  // isGeolocationAvailable
  //   ? console.log("Geolocated available")
  //   : console.log("Geolocated not available");
  // isGeolocationEnabled
  //   ? console.log("Geolocated enabled")
  //   : console.log("Geolocated not enabled");

  if (coords) {
    console.log(coords);
  } else console.log("coordinates not available");

  if (coords && areasArr) {
    //* Get an array of areas with distance less than 0.5
    const sortedArr = areasArr.filter((area) => {
      return (
        //? Use the phytagorean formula you learnt in junior high school
        Math.sqrt(
          (area.lon - coords.longitude) ** 2 + (area.lat - coords.latitude) ** 2
        ) < 0.5
      );
    });

    //* Sort the array to get the closest areas first
    sortedArr.sort((area) => {
      return -Math.sqrt(
        (area.lon - coords.longitude) ** 2 + (area.lat - coords.latitude) ** 2
      );
    });
    console.log(sortedArr);

    //* Send the closest locations found to App.jsx
    // props.getLocation(sortedArr);

    //* Render
    return (
      <div className="flex flex-col items-center justify-center mt-3 bg-slate-300">
        <h1 className="font-bold text-lg">Coordinates</h1>
        {
          <p>
            latitude&emsp;: <span className="font-bold">{coords.latitude}</span>
            ,
            <br />
            longitude&emsp;:{" "}
            <span className="font-bold">{coords.longitude}</span>
          </p>
        }
        <h2>
          Closest city detected : &ensp;
          <span className="font-bold text-green-600">{sortedArr[0].kota}</span>
        </h2>
      </div>
    );
  } else {
    return(
      <div className="flex flex-col items-center justify-center mt-3 bg-slate-300">
        <h1 className="font-bold text-lg">Coordinates</h1>
        <p>Unable to access your location, please check location permissions</p>
      </div>
    )
  }
};
