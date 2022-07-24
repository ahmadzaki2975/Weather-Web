export const WeatherCard = (props) => {
  return(
    <div className="card rounded-lg h-full p-5 flex flex-col items-center border-white border-2">
      <h1 className="hidden md:inline">
        {props.date}
      </h1>
      <h1 className="font-bold">
        {props.time}
      </h1>
      <img className="w-full" src={`/Weather Icons/${props.weather}.svg`}/> 
      <h1 className="font-bold text-m text-center">
        {props.weather}
      </h1>
      <h1 className="text-m hidden s:inline">{props.cuaca}</h1>
    </div>
  )
}