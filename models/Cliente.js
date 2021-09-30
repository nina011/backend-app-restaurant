const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/con')


class Cliente extends Model {}

Cliente.init({
    nombre_cl : {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'El nombre no puede estar vacío'
            },
            isAlpha: {
                args: true,
                msg: 'El nombre debe tener solo letras'
            },
            len: {
                args: [3, 15],
                msg: 'El nombre debe contener entre 3 y 15 caracteres'
            }
        }
    },
    apellido_cl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'El apellido no puede estar vacío'
            },
            isAlpha: {
                args: true,
                msg: 'Solo letras'
            },
            len: {
                args: [3, 15],
                msg: 'El apellido debe contener entre 3 y 15 caracteres'
            }
        }
    },
    email_cl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'Email no puede estar vacío'
            },
            isEmail: {
                args: 'true',
                msg:'Debe ser un e-mail'
            },
            len: {
                args: [10, 50],
                msg: 'El e-mail debe contener entre 10 y 50 caracteres'
            }
        }
    },
    telefono_cl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'El telefono no puede estar vacío'
            },
            // puede tener +569 o 569
            esCelular(tel){
                if(!/^(\+?56|0)[2-9]\d{1}\d{7}$/.test(tel)){
                    throw new Error('El teléfono no es válido')
                }
            }
        }
    }
},
{
    sequelize,
    modelName: 'clientes'
})


module.exports = Cliente;