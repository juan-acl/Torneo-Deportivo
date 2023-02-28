'use strict'
const User = require('../models/user.model')
const {validateData, searchUser, encrypt, checkPassword, checkDataUpdate, checkPermission} = require('../utils/validate');
const {createToken} = require('../services/jwt');


//Registrar un Cliente
exports.registerUser = async(req, res)=>{
    try {
        const params = req.body;
        const data = {
            email: params.email,
            name: params.name,
            surname: params.surname,
            username: params.username,
            password: params.password,
            role: 'CLIENT'
        }

        let msg = validateData(data);
        if(!msg){
            const userExist = await searchUser(params.username);
            if(!userExist){
                data.password= await encrypt(params.password);

                let user = new User(data);
                await user.save();
                user.password = undefined;
                return res.status(200).send({message:'User saved', user});

            }else{
                return res.status(401).send({message:'This username already exist'})
            }

        }else{
            return res.status(400).send(msg)
        }

    } catch (error) {
        console.log(error);
        return error;
        
    }
};

//Un Admin registra un CLIENT o ADMIN
exports.registerUserByAdmin = async(req, res)=>{
      try {
          const params = req.body;
          const data ={
            name: params.name,
            surname: params.surname,
            username: params.username,
            password: params.password,
            email: params.email,
            role: 'CLIENT'
          }

          let msg = validateData(data);
          if(!msg){

            const userExist = await searchUser(params.username);
            if(!userExist){
                data.password= await encrypt(params.password);

                let user = new User(data);
                await user.save();
                return res.status(200).send({message:'User saved', user})

            }else{
                return res.status(400).send({message:'This username already exist'})
            }
              
          }else{
              return res.status(400).send(msg)
          }

      } catch (error) {
        console.log(error);
        return error;  
      }
  }

  //LOGIN
  exports.login = async (req, res) => {
	try {
		const params = req.body; 
		const data = {
			username: params.username,
			password: params.password
		}
		let msg = validateData(data);
		if (!msg) {
			let userExist = await searchUser(params.username);
			if (userExist && await checkPassword(params.password, userExist.password)) {
				const token = await createToken(userExist);
				return res.status(200).send({token, message: 'Login successfully', userExist});
			} else {
				return res.status(400).send({message: 'Username or password incorrect'});
			}
		} else {
			return res.status(400).send(msg);
		}
	} catch (err) {
		console.log(err);
		return err;
	}
}

//Mostrar Clientes
exports.getUsers = async (req, res)=>{
    try {
        const users = await User.find({role:'CLIENT'});
        return res.status(200).send({users});
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.getUser = async (req, res)=>{
    try {
        const userId = req.params.idUser
        const user = await User.findOne({_id: userId})
        return res.status(200).send({user});
    } catch (error) {
        console.log(error);
        return error;
    } 
};

//Actualizar CLIENT por un ADMIN
exports.updateUserByAdmin = async (req, res)=>{
    try {
        const userId = req.params.id;
        const params = req.body;
        const userExist = await User.findOne({_id: userId});
        if(userExist){
            if(userExist.role === 'ADMIN'){
                return res.status(400).send({message:'You can not update an ADMIN'})
            }else{
                const checkData = await checkDataUpdate(params);
            if(checkData === false){
                return res.send({message:'Unable to update this data'});
            }else{
                const user = await searchUser(params.username);
                if(!user){
                    const userUpdate = await User.findOneAndUpdate({_id: userId}, params,{new:true});
                    userUpdate.password = undefined;
                    return res.status(200).send({message:'User updated', userUpdate });
                }else{
                    return res.status(400).send({message:'This username already exists'});
                    }
                }
            }          
        }else{
            return res.status(404).send({message:'User not found'})
        }
    } catch (error) {
        
    }
}

//Eliminar CLIENT por un ADMIN
exports.deleteUserByAdmin = async(req,res)=>{
    try {
        const userId = req.params.id;
        const userExist = await User.findOne({_id:userId});
        if(userExist){
            if(userExist.role === 'ADMIN'){
                return res.status(400).send({message:'You can not delete an ADMIN'})
            }else{
                const deleteUser = await User.findOneAndDelete({_id: userId});
                deleteUser.password = undefined;
                return res.status(200).send({message:'User deleted', deleteUser});
            }
        }else{
            return res.status(404).send({message:'User not found'});
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

//Actualizar su propia cuenta
exports.updateUser= async(req,res)=>{
    try {
        const userId = req.user.sub;
        const params = req.body;
        const permission = await checkPermission(userId, req.user.sub);
        if(permission === false) return res.status(403).send({message: 'Unauthorized to update this user'});
        else{
            const notUpdate = await checkDataUpdate(params);
            if(notUpdate === false) return res.status(400).send({message: 'Unable to update this data'});
            const already = await searchUser(params.username);
            if(!already) {
                const userUpdate = await User.findOneAndUpdate({_id: userId}, params, {new: true}).lean();
                userUpdate.password = undefined;
                return res.status(200).send({message: 'User update', userUpdate});
            }else{
                return res.status(400).send({message: 'User already used'});
            }
        }
    }catch (err) {
        console.log(err);
        return err;
    }
}
