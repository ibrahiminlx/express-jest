const express=require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter=require('./router/userRouter')
const app = express()
require('dotenv').config()
const db = require('./db/helper')

app.use(express.urlencoded())
app.use(express.json())
app.use(helmet())
app.use(cors())


app.use('/user',userRouter)

module.exports = app;

app.listen(process.env.PORT,async ()=>{
    await db.dbQueryAndCreate()
    await db.connect()
})