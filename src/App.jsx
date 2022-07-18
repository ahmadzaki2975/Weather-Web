import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { CoordinateCalculation } from "./components/CoordinateCalculation";
import { useGeolocated } from "react-geolocated";
import weatherAPI from "./scripts/api";

function App() {
//! States
  const [location, setLocation] = useState({});
  const [areasArr, setAreasArr] = useState([]);

//! Functions
  //* API call to get data of all areas in Indonesia
  useEffect(() => {
    function fetchAPI() {
      weatherAPI
        .get("/cuaca/wilayah.json")
        .then((response) => {
          setAreasArr(response.data);
          document.querySelector(".loading").classList.add("inactive");
        })
        .catch((err) => console.log(err));
    }
    fetchAPI();
  }, []);

  //* Geolocated Configuration
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  //* Get an array of areas with distance less than 0.5
  const sortedAreasArr = areasArr.filter((area) => {
    return (
      //? Use the phytagorean formula you learnt in junior high school
      Math.sqrt(
        (area.lon - coords.longitude) ** 2 + (area.lat - coords.latitude) ** 2
      ) < 0.5
    );
  });

  //* Sort the array to get the closest areas
  sortedAreasArr.sort((area) => {
    return -Math.sqrt(
      (area.lon - coords.longitude) ** 2 + (area.lat - coords.latitude) ** 2
    );
  });

  //* Render
  return (
    <div className="App">
      <div className="loading bg-slate-600 flex justify-center items-center text-white">Loading</div>
      <header>
        <Navbar />
      </header>
      <main>
        <CoordinateCalculation coords={coords} sortedAreasArr={sortedAreasArr}/>
      </main>
    </div>
  );
}

export default App;
