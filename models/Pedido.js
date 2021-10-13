const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/con')


class Pedido extends Model {}

Pedido.init({
    hora_pd : {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'El nombre no puede estar vacío'
            }
        }
    },
    fecha_pd: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'El apellido no puede estar vacío'
            }
        }
    },
    precio_total_pd: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate:{
            notEmpty: {
                args: true,
                msg: 'El telefono no puede estar vacío'
            }
        }
    },
    estado_pd:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        validate:{
            notEmpty:{
                args: true,
                msg: 'El parámetro no puede estar vacío'
            },
            isBoolean:{
                args: true, 
                msg: 'no permitido'
            }
        }
    }
},
{
    sequelize,
    modelName: 'pedidos'
})


module.exports = Pedido;