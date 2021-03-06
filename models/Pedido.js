const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/con')


class Pedido extends Model {}

let fecha = new Date()

Pedido.init({
    hora_pd : {
        type: DataTypes.TIME,
        // defaultValue: fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds(),
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'La hora no puede estar vacía'
            }
        }
    },
    fecha_pd: {
        type: DataTypes.DATEONLY,
        defaultValue: '2021-11-28',
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'La fecha no puede estar vacío'
            }
        }
    },
    precio_total_pd: {
        type: DataTypes.INTEGER,
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
    },
    tipo_pd:{
        type: DataTypes.STRING,
        validate:{
            notEmpty:{
                args: true, 
                msg:'El campo tipo de pedido '
            }
        }
    }
},
{
    sequelize,
    modelName: 'pedidos',
    timestamps: false
})


module.exports = Pedido;