const User= require('../models/user')


const userGetServices=async (req,res)=>{
    try {
        const {username}=req.body
        const json =await User.findOne({where:{username}})
        return json
    }catch (e) {
        console.log('e',e)
        throw e

    }
}
const createUserServices=async (req,res)=>{
    try {
        const {username,password}=req.body
        const json =await User.create({username,password})
        return json
    }catch (e) {
        console.log('e',e)
        throw e

    }
}
const putUserServices=async (req,res)=>{
    try {
        const {username,password}=req.body
        const json =await User.update({password:password},{where:{username}})
        return json
    }catch (e) {
        console.log('e',e)
        throw e

    }
}
const deleteUserServices=async (req,res)=>{
    try {
        const {username}=req.body
        const json =await User.destroy({where:{username}})
        return json
    }catch (e) {
        console.log('e',e)
        throw e

    }
}


module.exports = {
    userGetServices,createUserServices,putUserServices,deleteUserServices
}