export const Weather = (props) => {
  const location = props.location;
  const weather = props.weather;
  console.log(weather);
  const today = [];
  const tomorrow = [];
  console.log(`weather of ${location.kota}`, weather);
  if(weather[0] !== undefined) {
    for (let i = 0; i < 8; i++) {
      if(weather[i].cuaca === '') {
        weather[i].cuaca = 'Unknown'
      }
      if(i < 4) {
        today.push(weather[i]);
      } else {
        tomorrow.push(weather[i]);
      }
    }
    console.log("tomorrow", tomorrow);
    return(
      <ul>
        <h1>TODAY</h1>
        {today.map(item => {
        return(<li key={item.jamCuaca}>{`Time: ${item.jamCuaca} \t Weather: ${item.cuaca} \n`}</li>)
        })}
        <br/>

        <h1>TOMORROW</h1>
        {tomorrow.map(item => {
        return(<li key={item.jamCuaca}>{`Time: ${item.jamCuaca} \t Weather: ${item.cuaca} \n`}</li>)
        })}
      </ul>
    )
  } else return(<p>Sorry, it seems that we don&apos;t receive data for your location.</p>)
}