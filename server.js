'use strict';


const axios = require('axios');
//Express server
const express = require('express');

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
app.get(`/movie`,handleMovie);

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

app.get('*', (request,response) => {
  response.status(404).send('that route does not exist');
});

async function handleMovie (request, response){
  let city = request.query.searchQuery;
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  try{
    let getMovie = await axios.get(movieUrl);
    let movie = getMovie.data.results;
    let movieData = movie.map(title => new Movie(title));
    console.log(movie);
    response.send(movieData);
  }

  catch(error){
    console.log('movie not found');
    response.status(404).send('movie not found');
  }
}
class Movie {
  constructor(title){
    this.title = title.original_title;
    this.overview = title.overview;
    this.average_votes = title.vote_average;
    this.total_votes = title.vote_count;
    this.image = 'https://www.themoviedb.org/t/p/original'+title.poster_path;
    this.popularity = title.popularity;
    this.release_date = title.release_date;
  }
}