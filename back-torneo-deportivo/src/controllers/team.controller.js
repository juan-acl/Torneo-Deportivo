'use strict'

const { findOne } = require('../models/user.model');
const {validateData, checkPermission, checkDataUpdate, orderTeams} = require('../utils/validate');
const Team = require('../models/team.model');
const League = require('../models/league.model');

//Todo usuario podrá agregar un Equipo a su Liga

exports.addTeam = async(req,res)=>{
    try {
        const params = req.body;
        const leagueId = req.params.idLeague
        const data={
            name: params.name,
            teamPoints: 0,
            positiveGoals: 0,
            negativeGoals:0,
            differenceGoals: 0,
            gamesPlayed: 0,
            league: leagueId,
            user: req.user.sub
        };
        const msg = validateData(data);
        if(msg) return res.status(400).send(msg);
        const leagueExist = await League.findOne({_id: leagueId});
        if(!leagueExist) return res.status(403).send({message: 'League not found'});
        const team = await Team.find({league: leagueId});
        if (team.length == 10) return res.send({message: 'Full league, maximum teams for this league 10 teams'});
        const permission = await checkPermission(leagueExist.user, data.user);
        if(permission == false) return res.status(401).send({message: 'Unauthorized to add teams this league'});
            const teamExist = await Team.findOne({name: params.name, league:leagueId});
            if(!teamExist){
                const team = new Team(data);
                await team.save();
                return res.status(200).send({message:'Team created', team});

            }else{
                return res.status(400).send({message:'This team already exist in this League'})
            }
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.updateTeam = async(req,res)=>{
    try {
        const params = req.body;
        const teamId = req.params.idTeam;
        const leagueId = req.params.idLeague;
        const userId = req.user.sub;

        const teamExist = await Team.findOne({_id: teamId});

        const permission = await checkPermission(userId, teamExist.user);
        if(permission ===true){
            const checkData = await checkDataUpdate(params);
            if(checkData ===true){
                //Agregar la validación para que solo se pueda editar equipos de la liga que le paso por ruta
                if(leagueId == teamExist.league){
                    const team = await Team.findOne({name: params.name, league:leagueId});
                if(!team){
                    const teamUpdate = await Team.findOneAndUpdate({_id: teamId}, params, {new:true});
                    return res.status(200).send({message:'Team Updated', teamUpdate});

                }else{
                    return res.status(400).send({message:'This team already exist in this League'})
                }

                }else{
                    return res.status(400).send({message:'This team no exist in this league'});
                }
            }else{
                return res.status(400).send({message:'Unable to update this data'});
            }

        }else{
            return res.status(400).send({message:'Accion unauthorized'});
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.deleteTeam = async(req,res)=>{
    try {
       
        const teamId = req.params.idTeam;
        const userId = req.user.sub;
        const team = await Team.findOne({_id:teamId});

        const permission = await checkPermission(userId, team.user);
        if(permission ===true){
           
                const deleteTeam = await Team.findOneAndDelete({_id: teamId});
                return res.status(200).send({message:'Team Deleted', deleteTeam});
           
        }else{
            return res.status(400).send({message:'Accion unauthorized'})
        }
    
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.getTeams = async(req, res)=>{
    try {
        const leagueId = req.params.idLeague;
        const teams = await Team.find({league: leagueId});
        
        return res.status(200).send({teams});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.getTeam = async(req, res)=>{
    try {
        const teamId = req.params.idTeam;
        const team = await Team.findOne({_id: teamId});
        
        return res.status(200).send({team});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.getTeamOrder = async(req, res)=>{
    try {
        const leagueId = req.params.idLeague;
        const teams = await Team.find({league: leagueId});
        const teamsOrder = await orderTeams(teams);
        
        return res.status(200).send({teamsOrder});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

