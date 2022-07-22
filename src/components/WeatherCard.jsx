export const WeatherCard = (props) => {
  return(
    <div className="bg-slate-200 rounded-lg p-5 flex flex-col items-center">
      <h1>
        {props.date}
      </h1>
      <h1 className="font-bold">
        {props.time}
      </h1>
      <img className="w-1/2" src={`/Weather Icons/${props.weather}.svg?import`}/> 
      <h1 className="font-bold">
        {props.weather}
      </h1>
      <h1>{props.cuaca}</h1>
    </div>
  )
}