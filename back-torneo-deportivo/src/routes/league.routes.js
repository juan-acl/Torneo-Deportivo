'use strict'

const express = require('express');
const leagueController = require('../controllers/league.controller');
const mdAuth = require('../services/authenticated');

const api = express.Router();

api.post('/addLeague', [mdAuth.ensureAuth], leagueController.addLeague);
api.get('/getLeagues', [mdAuth.ensureAuth], leagueController.getLeagues);
api.get('/getLeague/:id', [mdAuth.ensureAuth], leagueController.getLeague)
api.put('/updateLeague/:id', [mdAuth.ensureAuth], leagueController.updateLeague);
api.delete('/deleteLeague/:id', [mdAuth.ensureAuth], leagueController.deleteLeague);


api.get('/getLeaguesByAdmin/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], leagueController.getLeaguesByAdmin);
api.put('/updateLeagueByAdmin/:idLeague/:idUser', [mdAuth.ensureAuth, mdAuth.isAdmin], leagueController.updateLeagueByAdmin);
api.delete('/deleteLeagueByAdmin/:idLeague', [mdAuth.ensureAuth, mdAuth.isAdmin], leagueController.deleteLeagueByAdmin);
api.post('/addLeagueByAdmin/:idUser', [mdAuth.ensureAuth, mdAuth.isAdmin], leagueController.addLeagueByAdmin);

module.exports = api;