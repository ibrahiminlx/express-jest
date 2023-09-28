const {Sequelize}=require('sequelize')
const pg=require('pg')
require('dotenv').config()
const db={}
const sequelize=new Sequelize('testCodeUser',process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host:"localhost",
    dialect:'postgres',
    port:'5432',
    dialectModule:pg,
    retry:3
})
const sequelizetest=new Sequelize('postgres',process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host:"localhost",
    dialect:'postgres',
    port:'5432',
    dialectModule:pg,
    retry:3
})

db.sequelize=Sequelize
db.sequelize=sequelize

db.connect=async ()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            await db.sequelize.authenticate()
            console.log(`${process.env.PORT} in Port db Online`)
            resolve(db)
        }catch (e) {
            console.log('Err Db Connection',e)
            reject(e)
        }
    })
}
db.createTable=async ()=>{
    const user = require('../models/user')
    await user.sync({force:true})

}
db.dbQueryAndCreate = async () => {
    try {
        // Veritabanını kontrol et
        const databaseExists = await sequelizetest.query(`SELECT 1 FROM pg_database WHERE datname = 'testCodeUser'`, {
            type: sequelizetest.QueryTypes.SELECT,
        });

        if (!databaseExists.length) {
            await sequelizetest.query('CREATE DATABASE "testCodeUser";');
            await db.createTable();
            console.log('Veritabanı ve tablolar başarıyla oluşturuldu veya mevcuttu.');
        } else {
            console.log('Veritabanı zaten mevcut.');
        }
    } catch (error) {
        console.error('Veritabanı oluşturma hatası:', error);
    }
};



module.exports = db