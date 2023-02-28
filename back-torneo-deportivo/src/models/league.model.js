'use strict'

const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
    name:String,
    user:{type: mongoose.Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('League', leagueSchema);