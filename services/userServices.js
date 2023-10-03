const User= require('../models/user')
const db=require('../db/helper')

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
const userControllerServices=async (req,res)=>{
    try {
        const {username}=req.body
        const json =await User.findOne({where:{username}})
        if (json===null){
            return true
        }else{
            return false
        }
    }catch (e) {
        console.log('e',e)
        throw e

    }
}
const createUserServices=async (req,res)=>{
    let transaction=null
    try {
        transaction=await db.sequelize.transaction()
        const {username,password}=req.body
        const json =await User.create({username,password})
        await transaction.commit()
        return json
    }catch (e) {
        await transaction.rollback()
        console.log('e',e)
        throw e

    }
}
const putUserServices=async (req,res)=>{
    let transaction=null
    try {
        transaction=await db.sequelize.transaction()
        const {username,password}=req.body
        const json =await User.update({password:password},{where:{username}})
        await transaction.commit()
        return json
    }catch (e) {
        await transaction.rollback()
        console.log('e',e)
        throw e

    }
}
const deleteUserServices=async (req,res)=>{
    let transaction=null
    try {
        transaction=await db.sequelize.transaction()
        const {username}=req.body
        const json =await User.destroy({where:{username}})
        await transaction.commit()
        return json
    }catch (e) {
        await transaction.rollback()
        console.log('e',e)
        throw e

    }
}


module.exports = {
    userGetServices,createUserServices,putUserServices,deleteUserServices,userControllerServices
}