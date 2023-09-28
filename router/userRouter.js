const express=require('express')
const router = express.Router()
const {userGetController, createUserController, putUserController, deleteUserController} = require('../controller/userController')


router.get('/',userGetController)
router.post('/',createUserController)
router.put('/',putUserController)
router.delete('/',deleteUserController)


module.exports = router