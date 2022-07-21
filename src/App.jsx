import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { CoordinateCalculation } from "./components/CoordinateCalculation";
import { useGeolocated } from "react-geolocated";
import weatherAPI from "./scripts/api";
import { Weather } from "./components/Weather";
import { WeatherCard } from "./components/WeatherCard";

function App() {
  //! States
  const [coordinate, setCoords] = useState({});
  const [nearestAreas, setNearestAreas] = useState([]);
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState([]);

  //! Functions

  //* API call to get data of all areas in Indonesia
  useEffect(() => {
    //* Getting Location
    if (!coordinate.latitude && !coordinate.longitude) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords);
      });
    }
    function fetchAPI(coordinate) {
      //* Calling API for areas data
      weatherAPI
        .get("/cuaca/wilayah.json")
        .then((response) => {
          // console.log(coordinate.latitude, coordinate.longitude);
          //* Get an array of areas with distance less than 0.5, store in a temporary array
          const data = response.data;
          const filtered = data.filter((area) => {
            //? Use the phytagorean formula you learnt in junior high school
            let distance = Math.sqrt(
              (area.lon - coordinate.longitude) ** 2 +
                (area.lat - coordinate.latitude) ** 2
            );
            return distance < 0.5;
          });
          //* Sort the temp array to get the closest areas
          const sorted = filtered.sort((area) => {
            return -Math.sqrt(
              (area.lon - coordinate.longitude) ** 2 +
                (area.lat - coordinate.latitude) ** 2
            );
          });
          if (sorted && nearestAreas[0] === undefined) {
            setNearestAreas(sorted);
          }
          if (nearestAreas[0]) {
            setLocation(nearestAreas[0]);
          }
          console.log("location", location);
        })
        .catch((err) => console.error(err));
    }
    fetchAPI(coordinate);
  }, [coordinate, nearestAreas, location]);

  //* Getting the weather
useEffect(() => {
  if (location.id) {
    console.log(location.id)
    weatherAPI
      .get(`/cuaca/${location.id}.json`)
      .then((response) => {
        if (weather[0] === undefined) {
          setWeather(response.data);
        }
        console.log("weather", weather);
      })
      .catch((err) => console.error(err));
  }
}, [location])

  //* Render
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <CoordinateCalculation
          coordinate={coordinate}
          nearestAreas={nearestAreas}
        />
        <Weather weather={weather} location={location}/>
      </main>
    </div>
  );
}

export default App;
