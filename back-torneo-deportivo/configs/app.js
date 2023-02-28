'use strict'

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('../src/routes/user.routes');
const leagueRoutes = require('../src/routes/league.routes');
const teamRoutes = require('../src/routes/team.routes');
const gameRoutes = require('../src/routes/game.routes');

const app = new express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use('/user', userRoutes);
app.use('/league', leagueRoutes);
app.use('/team', teamRoutes);
app.use('/game', gameRoutes);

app.get('/', (req, res) => {
  return res.status(200).send({Message: 'Welcome to Sport Tournament API.'})
});

app.get('*', (req, res) => {
  return res.status(404).send({Error: 'Endpoint not found.'})
})


module.exports = app;
