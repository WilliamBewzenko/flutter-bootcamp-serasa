const { Sequelize } = require('sequelize')

const HOST_DATABASE = process.env.HOST_DATABASE

const sequelize = new Sequelize(HOST_DATABASE, { dialect: 'postgres' })
 
module.exports = sequelize
