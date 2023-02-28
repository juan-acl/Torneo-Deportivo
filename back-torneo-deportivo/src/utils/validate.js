'use strict'
const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs')

exports.validateData = (data) => {
    let keys =Object.keys(data), msg = '';
    for(let key of keys) {
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} is required \n`
    }
    return msg.trim();
};

exports.searchUser =async(username)=>{
    try {
        const userExist = await User.findOne({username: username}).lean();
        return userExist
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.encrypt = async(password)=>{
    try {
        return bcrypt.hashSync(password);
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.checkPassword = async (password, hashSync) => {
    try {
        return bcrypt.compareSync(password, hashSync);
    }catch(err) {
        console.log(err);
        return err;
    }
}

exports.checkDataUpdate = async(user)=>{
    try {
        if(user.password || Object.entries(user).length===0 || user.role){
            return false;
        }else{
            return true;
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.checkPermission = async(userId, sub)=>{
    try {
        if(userId == sub){
            return true;
        }else{
            return false;
        }
        
    } catch (error) {
        console.log(error);
        return error;
        
    }
};
exports.orderTeams = async (teams)=>{
    try {
        teams.sort((a,b)=> b.teamPoints - a.teamPoints);
        return teams;

    } catch (error) {
        console.log(error);
        return error;
    }
}