const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/con');
const Plato = require('./Plato');

class Platos_Pedidos extends Model{}

Platos_Pedidos.init({
    cantidad_pp:{
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate:{
            notEmpty:{
                args: true, 
                msg: 'el campo no puede estar vacío'
            },
            isInt:{
                args:true,
                msg:'Debe ser un número entero'
            }
        }
    }
    
},{
    sequelize, 
    modelName:'platos_pedidos',
    timestamps: false
})

module.exports = Platos_Pedidos;