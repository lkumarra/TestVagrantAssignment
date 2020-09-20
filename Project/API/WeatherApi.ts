const axios = require('axios')
export class WeatherApi{

/**
 * Return the tempature by entering city.
 * @param city City name to get temprature
 */
public async getWeatherUsingApi(city:string){
    let uri = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7fe67bf08c80ded756e598d6f8fedaea";
    const response = await axios.get(uri);
    return response.data.main.temp.toString();
}
}