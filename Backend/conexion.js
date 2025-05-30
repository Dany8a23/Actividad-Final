const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './cuentas.sqlite'
});

module.exports = sequelize;