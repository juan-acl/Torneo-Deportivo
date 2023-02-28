'use strict'

const express = require('express');
const gameController = require('../controllers/game.controller');
const mdAuth = require ('../services/authenticated');

const api = express.Router();
api.post('/addGame/:idLeague', [mdAuth.ensureAuth], gameController.addGame);

module.exports = api;
