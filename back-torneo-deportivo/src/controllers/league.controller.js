'use strict'

const {validateData, checkDataUpdate, checkPermission} = require('../utils/validate');
const League = require('../models/league.model');
const Team = require('../models/team.model');


//Agregar una Liga
exports.addLeague = async(req, res)=>{
    try {
        const params = req.body;
        const userId = req.user.sub

        const data = {
            name: params.name,
            user: userId
        }
        const msg = validateData(data);
        if(!msg){
            const leagueExist = await League.findOne({name: params.name, user:userId});
            if(!leagueExist){
                let league = new League(data);
                await league.save();
                return res.status(200).send({message:'League created successfully', league});
            }else{
                return res.status(400).send({message:'League already exist'});
            }
        }else{
            return res.status(400).send(msg);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

//ADMIN pueda agregar ligas a un CLIENTE
exports.addLeagueByAdmin = async(req, res)=>{
    try {
        const params = req.body;
        const userId = req.params.idUser

        const data = {
            name: params.name,
            user: userId
        }
        const msg = validateData(data);
        if(!msg){
            const leagueExist = await League.findOne({name: params.name, user:userId});
            if(!leagueExist){
                let league = new League(data);
                await league.save();
                return res.status(200).send({message:'League created successfully', league});
            }else{
                return res.status(400).send({message:'League already exist'});
            }
        }else{
            return res.status(400).send(msg);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};


//Mostrar las ligas de la persona logeada
exports.getLeagues = async (req, res)=>{
    try {
        const userId = req.user.sub;
        const leagues = await League.find({user: userId});
        return res.status(200).send({Message: 'Ligas', leagues});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};
exports.getLeague = async (req, res)=>{
    try {
        const leagueId = req.params.id;
        const league = await League.findOne({_id: leagueId})
        return res.status(200).send({league});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};


//Editar una liga de la persona logeada
exports.updateLeague = async (req,res)=>{
    try {
        const params = req.body;
        const userId = req.user.sub;
        const leagueId = req.params.id;

        const leagueExist = await League.findOne({_id: leagueId});
        if(leagueExist){
            const permission = await checkPermission(userId, leagueExist.user)
            if(permission === true){
                const checkData = await checkDataUpdate(params);
                if(checkData === false){
                    return res.status(400).send({message:'Unable to update this data'});
                }else{
                    const leagueExist = await League.findOne({name:params.name, user: userId});
                    if(!leagueExist){
                        const leagueUpdate = await League.findOneAndUpdate({_id: leagueId}, params, {new:true});
                        return res.status(200).send({message: 'League Updated', leagueUpdate})
                    }else{
                        return res.status(400).send({message:'League already exist'})
                    }
                }
            }else{
                return res.status(400).send({message:'Accion unauthorized'});
            }
           
        }else{
            return res.status(400).send({message:'League not found'})
        }

    } catch (error) {
        console.log(error);
        return error;
    }
};

//Eliminar una liga de la persona logeada
exports.deleteLeague = async(req, res)=>{
    try {
        const userId = req.user.sub;
        const leagueId = req.params.id;

        const leagueExist = await League.findOne({_id: leagueId});
        if(leagueExist){
            const permission = await checkPermission(userId, leagueExist.user);
            if(permission === true){
                const deleteLeague = await League.findOneAndDelete({_id: leagueId});
                //ELIMINA LOS EQUIPOS ASOCIADOS A LA LIGA 
                const deleteTeams = await Team.deleteMany({league: leagueId});
                return res.status(200).send({message:'League Deleted', deleteLeague});
                
            }else{
                return res.status(400).send({message:'Accion unauthorized'})
            }

        }else{
            return res.status(404).send({message:'League not found'}) 
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}; 

//Mostrar todas las ligas existentes (ADMIN)
exports.getLeaguesByAdmin = async (req, res)=>{
    try {
        const userId = req.params.id
        const leagues = await League.find({user: userId});
        return res.status(200).send({leagues});
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Actualizar la liga de un Cliente (ADMIN)
exports.updateLeagueByAdmin = async(req, res)=>{
    try {
        const params = req.body;
        const leagueId = req.params.idLeague;
        const userId = req.params.idUser;
        const leagueExist = await League.findOne({_id: leagueId});
        if(leagueExist){
            const checkData = await checkDataUpdate(params);
            if(checkData ===false){
                return res.status(400).send({message:'Unable to update this data'});
            }else{
                const league = await League.findOne({name: params.name, user: userId});
                if(!league){
                    const updateLeague = await League.findOneAndUpdate({_id: leagueId}, params, {new:true});
                    return res.status(200).send({message:'League Updated', updateLeague});
                }else{
                    return res.status(400).send({message:'League already exist'});
                }
            }
        }else{
            return res.status(400).send({message:'League not found'})
        }

    } catch (error) {
        console.log(err)
        return error;
    }
};

//Eliminar la liga de un cliente (ADMIN)

exports.deleteLeagueByAdmin = async(req,res)=>{
    try {
        const leagueId = req.params.idLeague;

        const leagueExist = await League.findOne({_id: leagueId});
        if(leagueExist){

            const deleteLeague = await League.findOneAndDelete({_id: leagueId});
            return res.status(200).send({message:'League Deleted', deleteLeague});
            
        }else{
            return res.status(400).send({message:'League not found'})
        }
    } catch (error) {
        console.log(error);
    }
}
