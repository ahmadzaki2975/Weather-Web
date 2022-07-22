import { WeatherCard } from "./WeatherCard";

export const Weather = (props) => {
  //* States / Variables
  const location = props.location;
  const weather = props.weather;
  let fullWeather = [];
  const today = [];
  const tomorrow = [];
  // console.log(`weather of ${location.kota}`, weather);

  if (weather[0] !== undefined) {
    //* Getting weather from kodeCuaca
    fullWeather = weather.map((item) => {
      if (item.kodeCuaca == 0) {
        item.weather = "Bright Sky";
        item.cuaca = "Cerah";
      } else if (item.kodeCuaca == 1 || item.kodeCuaca == 2) {
        item.weather = "Partly Cloudy";
      } else if (item.kodeCuaca == 3) {
        item.weather = "Mostly Cloudy";
      } else if (item.kodeCuaca == 4) {
        item.weather = "Overcast";
      } else if (item.kodeCuaca == 5) {
        item.weather = "Haze / Windy";
      } else if (item.kodeCuaca == 10) {
        item.weather = "Smoke";
      } else if (item.kodeCuaca == 45) {
        item.weather = "Fog";
      } else if (item.kodeCuaca == 60) {
        item.weather = "Light Rain";
      } else if (item.kodeCuaca == 61) {
        item.weather = "Rain";
      } else if (item.kodeCuaca == 63) {
        item.weather = "Heavy Rain";
      } else if (item.kodeCuaca == 95 || item.kodeCuaca == 97) {
        item.weather = "Thunderstorm";
      } else {
        item.weather = "Unknown";
      }

      //* Separating date and time
      let date = "";
      let time = "";
      for (let i = 0; i < 19; i++) {
        if (i < 10) {
          date += item.jamCuaca[i];
        } else if (i > 10) {
          time += item.jamCuaca[i];
        }
      }
      item.date = date;
      item.time = time;

      return {
        weather: item.weather,
        jamCuaca: item.jamCuaca,
        cuaca: item.cuaca,
        date: item.date,
        time: item.time,
      };
    });

    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        today.push(fullWeather[i]);
      } else {
        tomorrow.push(fullWeather[i]);
      }
    }
    return (
      <>
        <h1 className="text-center text-2xl font-bold bg-blue-500 text-white p-5 pb-12">
          TODAY <br /> {today[0].date}
        </h1>
        <div className="grid grid-cols-2 gap-2 place-items-center md:grid-cols-4 mx-10 md:mx-30 sm:mx-32">
          {today.map((item) => {
            return (
              <WeatherCard
                key={item.jamCuaca}
                time={item.time}
                weather={item.weather}
                cuaca={item.cuaca}
                date={item.date}
              />
            );
          })}
          <br />
        </div>
        <h1 className="text-center text-2xl font-bold bg-blue-500 text-white p-5 pb-12">
          TOMORROW <br /> {tomorrow[0].date}
        </h1>
        <div className="grid grid-cols-2 gap-2 place-items-center md:grid-cols-4 mx-10 md:mx-30 sm:mx-32">
          {tomorrow.map((item) => {
            return (
              <WeatherCard
                key={item.jamCuaca}
                date={item.date}
                time={item.time}
                weather={item.weather}
                cuaca={item.cuaca}
              />
            );
          })}
          <br />
        </div>
      </>
    );
  } else
    return (
      <p className="text-3xl text-center">
        Sorry, it seems that we don&apos;t receive data for your location.
      </p>
    );
};
