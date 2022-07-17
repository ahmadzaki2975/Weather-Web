import { weatherAPI } from "../scripts/api"

export const Weather = () => {
  weatherAPI.get('/cuaca/wilayah.json')
  .then((response) => {console.log(response.data)})
  return(
    <div>
      Weather
    </div>
  )
}