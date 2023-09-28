const {Sequelize,DataTypes}=require('sequelize')
const db=require('../db/helper')

const User = db.sequelize.define('user', {
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV1
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User