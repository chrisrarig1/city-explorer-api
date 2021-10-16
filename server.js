'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const { response, request } = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
require('dotenv').config();

app.listen(PORT, () => console.log('listenting on port', PORT));

//setting the root route
app.get('/', (request, response) => {
  response.send('Greetings');
});

//catch all error on root
app.get('*', (request,response) => {
  response.status(404).send('that route does not exist');
});
//End Boilerplate

let handleMovie = require('./modules/movie');
let handleWeather = require('./modules/weather');

app.get('/weather', handleWeather);
app.get(`/movie`,handleMovie);