export const Weather = (props) => {
  const location = props.location;
  const weather = props.weather;
  console.log(weather);
  let fullWeather = [];
  const today = [];
  const tomorrow = [];
  console.log(`weather of ${location.kota}`, weather);
  if(weather[0] !== undefined) {
    fullWeather = weather.map((item =>{
      if(item.kodeCuaca == 0) {
        item.weather = "Sunny"
      } else if(item.kodeCuaca == 1 || item.kodeCuaca == 2) {
        item.weather = "Partly Cloudy"
        //! 3333333
      } else if(item.kodeCuaca == 4) {
        item.weather = "Overcast"
      } else if(item.kodeCuaca == 5) {
        item.weather = "Haze / Windy"
      } else if(item.kodeCuaca == 10) {
        item.weather = "Smoke"
      } else if(item.kodeCuaca == 45) {
        item.weather = "Fog"
      } else if(item.kodeCuaca == 60) {
        item.weather = "Light Rain"
      } else if(item.kodeCuaca == 61) {
        item.weather = "Rain"
      } else if(item.kodeCuaca == 63) {
        item.weather = "Heavy Rain"
      } else if(item.kodeCuaca == 95 || item.kodeCuaca == 97) {
        item.weather = "Thunderstorm"
      } else {
        item.weather = "Unknown"
      }
      return({weather:item.weather, jamCuaca:item.jamCuaca,
        cuaca:item.cuaca})
    }))
    console.log(fullWeather);

    for (let i = 0; i < 8; i++) {
      if(i < 4) {
        today.push(fullWeather[i]);
      } else {
        tomorrow.push(fullWeather[i]);
      }
    }
    console.log("today", today);
    return(
      <ul>
        <h1>TODAY</h1>
        {today.map(item => {
        return(<li key={item.jamCuaca}>{`Time: ${item.jamCuaca} \t Weather: ${item.weather} \n`}</li>)
        })}
        <br/>

        <h1>TOMORROW</h1>
        {tomorrow.map(item => {
        return(<li key={item.jamCuaca}>{`Time: ${item.jamCuaca} \t Weather: ${item.weather} \n`}</li>)
        })}
      </ul>
    )
  } else return(<p>Sorry, it seems that we don&apos;t receive data for your location.</p>)
}