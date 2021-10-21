'use strict';
const axios = require('axios');
let cache = require('./cache.js');

async function handleMovie (request, response){
  let city = request.query.searchQuery;
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  if(cache[city] && (Date.now() - cache[city].timestamp < 100000)){
    response.status(200).send(cache[city].movieData);
    console.log(`Cache HIT!`);}
  else {
    try{
      let getMovie = await axios.get(movieUrl);
      let movie = getMovie.data.results;
      let movieData = movie.map(title => new Movie(title));
      cache[city] ={
        movieData:movieData,
        timestamp: Date.now()
      };
      console.log(movie);
      response.status(200).send(movieData);
      console.log('Cache Miss!!!');
    }

    catch(error){
      console.log('movie not found');
      response.status(500).send('Movies not found');
    }
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


module.exports = handleMovie;
