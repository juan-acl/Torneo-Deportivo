'use strict'
const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: String,
    teamPoints: Number,
    positiveGoals: Number,
    negativeGoals:Number,
    differenceGoals: Number,
    gamesPlayed: Number,
    league: {type: mongoose.Schema.ObjectId, ref:'League'},
    user: {type: mongoose.Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Team', teamSchema);