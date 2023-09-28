const {userGetServices, createUserServices, putUserServices, deleteUserServices} = require('../services/userServices')
const {baseResponseFunctionError,baseResponseFunctionSuccess}=require('../dto/baseResponse.dto')

const userGetController=async (req,res)=>{
    try {
        const json=await userGetServices(req,res)
        res.json(baseResponseFunctionSuccess({data:json}))
    }catch (e) {
        console.log('e',e)
        res.json(baseResponseFunctionError({message:e.message}))
    }
}
const createUserController=async (req,res)=>{
    try {
        const json=await createUserServices(req,res)
        res.json(baseResponseFunctionSuccess({data:json}))
    }catch (e) {
        console.log('e',e)
        res.json(baseResponseFunctionError({message:e.message}))
    }
}
const putUserController=async (req,res)=>{
    try {
        const json=await putUserServices(req,res)
        res.json(baseResponseFunctionSuccess({data:json}))
    }catch (e) {
        console.log('e',e)
        res.json(baseResponseFunctionError({message:e.message}))
    }
}
const deleteUserController=async (req,res)=>{
    try {
        const json=await deleteUserServices(req,res)
        res.json(baseResponseFunctionSuccess({data:json}))
    }catch (e) {
        console.log('e',e)
        res.json(baseResponseFunctionError({message:e.message}))
    }
}


module.exports = {
    userGetController,createUserController,putUserController,deleteUserController
}