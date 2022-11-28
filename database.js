const { Sequelize } = require('sequelize')
const pg = require('pg')

const HOST_DATABASE = process.env.HOST_DATABASE

const sequelize = new Sequelize(HOST_DATABASE, { dialectModule: pg })
 
module.exports = sequelize
