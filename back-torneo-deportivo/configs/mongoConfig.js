'use strict'
const mongoose = require('mongoose');

exports.init = ()=>{
    const uriMongo = 'mongodb://127.0.0.1:27017/torneo-deportivoDB'
    mongoose.Promise = global.Promise;

    mongoose.set('strictQuery', false)
    mongoose.connection.on('error', ()=>{
        console.log('MongoDb | could not be connect');
        mongoose.disconnect();
    });

    mongoose.connection.on('connecting', ()=>{
        console.log('MongoDb | try connecting')
    });

    mongoose.connection.on('connected', ()=>{
        console.log('MongoDb | connected to mongodb');
    });

    mongoose.connection.once('open', ()=>{
        console.log('MongoDb | connected to database')
    });

    mongoose.connection.on('reconnected', ()=>{
        console.log('MongoDb | reconnected to mongodb')
    });

    mongoose.connection.on('disconnected', ()=>{
        console.log('MongoDb | disconnected to mongodb')
    });
    
    mongoose.connect(uriMongo,{
        connectTimeoutMS: 2500,
        maxPoolSize: 50,
        useNewUrlParser: true
    }).catch(err=>console.log(err));  

}
