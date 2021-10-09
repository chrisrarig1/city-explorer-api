'use strict';

// let weatherjson = require('../data/weather.json');
//boilerplate
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

app.get('/captainfalcon', (request, response) => {
  response.json({name: 'CaptainFalcon',
    game: 'f-zero'});
});

app.get('*', (request,response) => {
  response.status(404).send('that route does not exist');
});




