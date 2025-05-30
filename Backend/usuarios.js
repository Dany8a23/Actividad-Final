const { DataTypes } = require('sequelize');
const sequelize = require('./conexion')

const usuarios = sequelize.define('usuarios', {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true },
    usuario: { type: DataTypes.STRING },
    contraseña: { type: DataTypes.STRING }
}, {
    timestamps: false
})

module.exports = usuarios;