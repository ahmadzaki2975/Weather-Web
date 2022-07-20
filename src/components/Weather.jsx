export const Weather = (props) => {
  const weather = props.weather;
  const today = [];
  const tomorrow = [];
  if(weather !== undefined && weather.cuaca !== undefined) {
    for (let i = 0; i < 8; i++) {
      if(i < 4) {
        today.push(weather[i]);
      } else {
        tomorrow.push(weather[i]);
      }
    }
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