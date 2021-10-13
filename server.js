'use strict';

const weatherjson = require('./data/weather.json');


// const axios = require('axios');
//Express server
const express = require('express');
//dotenv file
require('dotenv').config();
//cors is security stuff
const cors = require('cors');
const { response, request } = require('express');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('listenting on port', PORT));

//setting the root route
app.get('/', (request, response) => {
  response.send('Greetings');
});
//End Boilerplate

app.get('/weather', handleWeather);
// app.get(`/movie`,handleMovie);

function handleWeather (request, response){
  console.log(request.query);
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
  let foundCity = weatherjson.find(el => el.city_name.toLowerCase() === searchQuery.toLowerCase());
  try{
    let forecast = foundCity.data.map(day => new Forecast(day));
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
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
}

// app.get('*', (request,response) => {
//   response.status(404).send('that route does not exist');
// });

// async function handleMovie (request, response){
//   let movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}`;
//   try{
//     let getMovie = await axios.get(movieUrl);
//     let movie = getMovie.data;
//     console.log(movie);
//     response.send(movie);
//   }
//   catch(error){
//     console.log('cant find city');
//     response.status(404).send('City not found');
//   }
// }


