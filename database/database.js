const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

const connection = new Sequelize('questions_guide', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;