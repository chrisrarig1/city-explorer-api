'use strict';

const axios = require('axios');

async function handleWeather (request, response){

  let lat = request.query.lat;
  let lon = request.query.lon;
  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=3&key=${process.env.WEATHER_API_KEY}`;
  try{
    let weatherInfo = await axios.get(weatherUrl);
    let cityWeather = weatherInfo.data.data;
    let forecast = cityWeather.map(day => new Forecast(day));
    console.log(forecast);
    response.send(forecast);
  }
  catch(error){
    console.log('cant find city');
    response.status(404).send('City not found');
  }
}
class Forecast {
  constructor(day){
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
  }
}

module.exports = handleWeather;
