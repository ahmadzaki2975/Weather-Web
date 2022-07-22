import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { CoordinateCalculation } from "./components/CoordinateCalculation";
import { useGeolocated } from "react-geolocated";
import weatherAPI from "./scripts/api";
import { Weather } from "./components/Weather";
import { WeatherCard } from "./components/WeatherCard";
import { Footer } from "./components/Footer";

function App() {
  //! States
  const [coordinate, setCoords] = useState({});
  const [nearestAreas, setNearestAreas] = useState([]);
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState([]);
  let i = 1;
  //! Functions

  //* API call to get data of all areas in Indonesia
  useEffect(() => {
    function fetchAPI(coordinate) {
      //* Calling API for areas data
      weatherAPI
        .get("/cuaca/wilayah.json")
        .then((response) => {
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
        })
        .catch((err) => console.error(err));
    }
    //* Getting Location

    if (i < 4) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords);
      });
      fetchAPI(coordinate);
      i++;
    }
  }, [nearestAreas, location]);

  //* Getting the weather
  useEffect(() => {
    if (location.id) {
      weatherAPI
        .get(`/cuaca/${location.id}.json`)
        .then((response) => {
          if (weather[0] === undefined) {
            setWeather(response.data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [location, nearestAreas]);

  //* Change Location
  const ChangeLocation = (id) => {
    console.log(id);
    const newLocation = nearestAreas.find((area) => {
      return area.id == id;
    });
    setNearestAreas(location)
    setCoords({latitude: newLocation.lat, longitude : newLocation.lon})
  };

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
          ChangeLocation={ChangeLocation}
        />
        <Weather weather={weather} location={location} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
