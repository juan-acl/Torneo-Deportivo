'use strict'

const mongoose = require ('mongoose');

const gameSchema = mongoose.Schema({
    teamLocal: {type: mongoose.Schema.ObjectId, ref:'Team'},
    teamVisitor: {type: mongoose.Schema.ObjectId, ref:'Team'},
    goalsLocal: Number,
    goalsVisitor: Number,
    league: {type: mongoose.Schema.ObjectId, ref:'League'},
    user : {type: mongoose.Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Game', gameSchema);