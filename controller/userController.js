const {userGetServices, createUserServices, putUserServices, deleteUserServices, userControllerServices} = require('../services/userServices')
const {baseResponseFunctionError,baseResponseFunctionSuccess}=require('../dto/baseResponse.dto')
const {NO_USER, NO_PASSWORD, USER_CONTROL_ERROR, USER_CONTROL_NULL_ERROR, PASSWORD_NO_RULE} = require("../errorsMessage/userErrorMessages");


const userGetController=async (req,res)=>{
    try {
        const {username}=req.body
        if (!username){
            throw new Error(NO_USER)
        }
        const userControl= userControllerServices(req,res)
        await userControl.then(async data => {
            if (data === true) {
                throw new Error(USER_CONTROL_NULL_ERROR)
            } else {
                const json = await userGetServices(req, res)
                res.json(baseResponseFunctionSuccess({data: json}))
            }
        })

    }catch (e) {
        console.log('e',e)
        res.status(500).json(baseResponseFunctionError({message:e.message}))
    }
}
const createUserController=async (req,res)=>{

    try {
        const {username,password}=req.body
        let passwordPattrend=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,30}$/

        if (!username){
            throw new Error(NO_USER)
        }
        else if (!password){
            throw new Error(NO_PASSWORD)
        }
        let passwordControl= passwordPattrend.test(password)
        if (!passwordControl){
            throw new Error(PASSWORD_NO_RULE)
        }
        const userControl= userControllerServices(req,res)
        await userControl.then(async data => {
            if (data === false) {
                throw new Error(USER_CONTROL_ERROR)
            } else {
                const json=await createUserServices(req,res)
                res.json(baseResponseFunctionSuccess({data:json}))
            }
        })

    }catch (e) {
        console.log('e',e)
        res.status(500).json(baseResponseFunctionError({message:e.message}))
    }
}
const putUserController=async (req,res)=>{
    try {
        const {username,password}=req.body
        let passwordPattrend=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,30}$/
        if (!username){
            throw new Error(NO_USER)
        }
        else if (!password){
            throw new Error(NO_PASSWORD)
        }
        let passwordControl= passwordPattrend.test(password)
        if (!passwordControl){
            throw new Error(PASSWORD_NO_RULE)
        }
        const userControl= userControllerServices(req,res)
        await userControl.then(async data => {
            if (data === true) {
                throw new Error(USER_CONTROL_NULL_ERROR)
            } else {
                const json=await putUserServices(req,res)
                res.json(baseResponseFunctionSuccess({data:json}))
            }
        })

    }catch (e) {
        console.log('e',e)
        res.status(500).json(baseResponseFunctionError({message:e.message}))
    }
}
const deleteUserController=async (req,res)=>{
    try {
        const {username}=req.body
        if (!username){
            throw new Error(NO_USER)
        }
        const userControl= userControllerServices(req,res)
        await userControl.then(async data => {
            if (data === true) {
                throw new Error(USER_CONTROL_NULL_ERROR)
            } else {
                const json=await deleteUserServices(req,res)
                res.json(baseResponseFunctionSuccess({data:json}))
            }
        })

    }catch (e) {
        console.log('e',e)
        res.status(500).json(baseResponseFunctionError({message:e.message}))
    }
}


module.exports = {
    userGetController,createUserController,putUserController,deleteUserController
}