'use strict'
const Game = require ('../models/game.model');
const {validateData} = require('../utils/validate');
const Team = require('../models/team.model')

exports.addGame = async(req,res)=>{
    try {
        const params = req.body;
        const userId = req.user.sub;
        const leagueId = req.params.idLeague
        const data = {
            teamLocal: params.teamLocal,
            teamVisitor:params.teamVisitor,
            goalsLocal: params.goalsLocal,
            goalsVisitor: params.goalsVisitor,
            league: leagueId,
            user: userId
        };

        const msg = await validateData(data);
        if(!msg){
            if(params.teamLocal === params.teamVisitor){
                return res.status(400).send({message:'this game cannot be played'})
            }else{
                //Verificar que el partido no se haya disputadó
                const game = await Game.findOne({league: leagueId, teamLocal:data.teamLocal, teamVisitor:data.teamVisitor});
                if(game){
                    return res.status(400).send({message:'This game has already been played'});
                }else{
                    let match = new Game(data);
                    await match.save();
                    //return res.status(200).send({message:'Game saved successfuly', match});

                    //---------EQUIPO LOCAL COMO GANADOR----------
                    if(match.goalsLocal > match.goalsVisitor){
                        //ACTUALIZAR Al GANADOR
                        const localTeam = await Team.findOne({_id: params.teamLocal});
                        let dataLocalUpdate1 ={
                            teamPoints: localTeam.teamPoints + 3,
                            positiveGoals: localTeam.positiveGoals + match.goalsLocal, 
                            negativeGoals: localTeam.negativeGoals + match.goalsVisitor, 
                        }
                        const localTeamUpdate1 = await Team.findOneAndUpdate({_id: params.teamLocal}, dataLocalUpdate1, {new:true});

                        const localTeamGames = await Game.find({league: leagueId, $or:[
                            {teamLocal: params.teamLocal},
                            {teamVisitor: params.teamLocal}
                        ]});

                        let dataLocalUpdate2 ={
                            differenceGoals: dataLocalUpdate1.positiveGoals - dataLocalUpdate1.negativeGoals,
                            gamesPlayed: Object.entries(localTeamGames).length
                        };
                        const localTeamUpdate2 = await Team.findOneAndUpdate({_id: params.teamLocal}, dataLocalUpdate2, {new:true});

                        //ACTUALIZAR AL PERDEDOR
                        const visitorTeam = await Team.findOne({_id: params.teamVisitor});
                        let dataVisitorUpdate1 ={
                            positiveGoals: visitorTeam.positiveGoals + match.goalsVisitor,
                            negativeGoals: visitorTeam.negativeGoals + match.goalsLocal
                        };
                        const visitorTeamUpdate1 = await Team.findOneAndUpdate({_id: params.teamVisitor}, dataVisitorUpdate1, {new:true});

                        const visitorTeamGames = await Game.find({league: leagueId, $or:[
                            {teamLocal: params.teamVisitor},
                            {teamVisitor: params.teamVisitor}
                        ]});

                        let dataVisitorUpdate2 ={
                            differenceGoals : dataVisitorUpdate1.positiveGoals - dataVisitorUpdate1.negativeGoals,
                            gamesPlayed: Object.entries(visitorTeamGames).length
                        };
                        const visitorTeamUpdate2 = await Team.findOneAndUpdate({_id: params.teamVisitor}, dataVisitorUpdate2, {new:true});

                        return res.status(200).send({message:'Game saved successfuly', localTeamUpdate2, visitorTeamUpdate2});

                    };//FIN

                     //-------EQUIPO VISITANTE COMO GANADOR--------
                    if(match.goalsVisitor>match.goalsLocal){

                         //ACTUALIZAR AL GANADOR
                         const visitorTeam = await Team.findOne({_id: params.teamVisitor});
                         let dataVisitorUpdate1 ={
                             teamPoints: visitorTeam.teamPoints +3,
                             positiveGoals: visitorTeam.positiveGoals + match.goalsVisitor,
                             negativeGoals: visitorTeam.negativeGoals + match.goalsLocal
                         };
                         const visitorTeamUpdate1 = await Team.findOneAndUpdate({_id: params.teamVisitor}, dataVisitorUpdate1, {new:true});
 
                         const visitorTeamGames = await Game.find({league: leagueId, $or:[
                             {teamLocal: params.teamVisitor},
                             {teamVisitor: params.teamVisitor}
                         ]});
 
                         let dataVisitorUpdate2 ={
                             differenceGoals : dataVisitorUpdate1.positiveGoals - dataVisitorUpdate1.negativeGoals,
                             gamesPlayed: Object.entries(visitorTeamGames).length
                         };
                         const visitorTeamUpdate2 = await Team.findOneAndUpdate({_id: params.teamVisitor}, dataVisitorUpdate2, {new:true});
                         
                        //ACTUALIZAR Al PERDEDOR
                        const localTeam = await Team.findOne({_id: params.teamLocal});
                        let dataLocalUpdate1 ={
                            positiveGoals: localTeam.positiveGoals + match.goalsLocal, 
                            negativeGoals: localTeam.negativeGoals + match.goalsVisitor, 
                        }
                        const localTeamUpdate1 = await Team.findOneAndUpdate({_id: params.teamLocal}, dataLocalUpdate1, {new:true});

                        const localTeamGames = await Game.find({league: leagueId, $or:[
                            {teamLocal: params.teamLocal},
                            {teamVisitor: params.teamLocal}
                        ]});

                        let dataLocalUpdate2 ={
                            differenceGoals: dataLocalUpdate1.positiveGoals - dataLocalUpdate1.negativeGoals,
                            gamesPlayed: Object.entries(localTeamGames).length
                        };
                        const localTeamUpdate2 = await Team.findOneAndUpdate({_id: params.teamLocal}, dataLocalUpdate2, {new:true});

                        return res.status(200).send({message:'Game saved successfuly', visitorTeamUpdate2, localTeamUpdate2});
                    };//FIN

                    //------- EMPATE--------
                    if(match.goalsVisitor === match.goalsLocal){

                        //ACTUALIZAR A VISITANTE
                        const visitorTeam = await Team.findOne({_id: params.teamVisitor});
                        let dataVisitorUpdate1 ={
                            teamPoints: visitorTeam.teamPoints +1,
                            positiveGoals: visitorTeam.positiveGoals + match.goalsVisitor,
                            negativeGoals: visitorTeam.negativeGoals + match.goalsLocal
                        };
                        const visitorTeamUpdate1 = await Team.findOneAndUpdate({_id: params.teamVisitor}, dataVisitorUpdate1, {new:true});

                        const visitorTeamGames = await Game.find({league: leagueId, $or:[
                            {teamLocal: params.teamVisitor},
                            {teamVisitor: params.teamVisitor}
                        ]});

                        let dataVisitorUpdate2 ={
                            differenceGoals : dataVisitorUpdate1.positiveGoals - dataVisitorUpdate1.negativeGoals,
                            gamesPlayed: Object.entries(visitorTeamGames).length
                        };
                        const visitorTeamUpdate2 = await Team.findOneAndUpdate({_id: params.teamVisitor}, dataVisitorUpdate2, {new:true});
                        
                       //ACTUALIZAR Al LOCAL
                       const localTeam = await Team.findOne({_id: params.teamLocal});
                       let dataLocalUpdate1 ={
                           teamPoints: localTeam.teamPoints +1,
                           positiveGoals: localTeam.positiveGoals + match.goalsLocal, 
                           negativeGoals: localTeam.negativeGoals + match.goalsVisitor, 
                       }
                       const localTeamUpdate1 = await Team.findOneAndUpdate({_id: params.teamLocal}, dataLocalUpdate1, {new:true});

                       const localTeamGames = await Game.find({league: leagueId, $or:[
                           {teamLocal: params.teamLocal},
                           {teamVisitor: params.teamLocal}
                       ]});

                       let dataLocalUpdate2 ={
                           differenceGoals: dataLocalUpdate1.positiveGoals - dataLocalUpdate1.negativeGoals,
                           gamesPlayed: Object.entries(localTeamGames).length
                       };
                       const localTeamUpdate2 = await Team.findOneAndUpdate({_id: params.teamLocal}, dataLocalUpdate2, {new:true});

                       return res.status(200).send({message:'Game saved successfuly', localTeamUpdate2, visitorTeamUpdate2});
                   };//FIN

                };
            };

        }else{
            return res.status(400).send(msg);
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
}