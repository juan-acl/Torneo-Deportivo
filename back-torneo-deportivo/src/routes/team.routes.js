'use strict'


const express = require('express');
const teamController = require('../controllers/team.controller');
const mdAuth = require('../services/authenticated');
const api = express.Router();

api.post('/addTeam/:idLeague', [mdAuth.ensureAuth], teamController.addTeam);
api.put('/updateTeam/:idLeague/:idTeam', [mdAuth.ensureAuth], teamController.updateTeam);
api.delete('/deleteTeam/:idTeam', [mdAuth.ensureAuth], teamController.deleteTeam);
api.get('/getTeams/:idLeague', [mdAuth.ensureAuth], teamController.getTeams);
api.get('/getTeam/:idTeam', [mdAuth.ensureAuth], teamController.getTeam);
api.get('/getTeamOrder/:idLeague', [mdAuth.ensureAuth], teamController.getTeamOrder);

module.exports = api;

 
