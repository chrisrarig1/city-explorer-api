'use strict';


const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3001;

require('dotenv').config();


app.get('/', (request, response) => {
  response.send('Greetings');
});

let handleMovie = require('./modules/movie.js');
let handleWeather = require('./modules/weather.js');

app.get('/weather',handleWeather);
app.get('/movie',handleMovie);



app.listen(PORT, () => console.log('listenting on port', PORT));


app.get('*', (request,response) => {
  response.status(404).send('that route does not exist');
});
