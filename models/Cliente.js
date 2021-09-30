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
            len: {
                args: [3, 15],
                msg: 'El nombre debe contener entre 3 y 15 caracteres'
            },
            isLetterSpace(str){
               const reg =  /^[a-zA-Z\s]*$/

               if(!reg.test(str)) throw Error('El nombre pude contener solo letras')
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
            len: {
                args: [3, 15],
                msg: 'El apellido debe contener entre 3 y 15 caracteres'
            },
            isLetterSpace(str){
                const reg =  /^[a-zA-Z\s]*$/
 
                if(!reg.test(str)) throw Error('El apellido puede contener solo letras')
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
    },
    estado_cl:{
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
    modelName: 'clientes'
})


module.exports = Cliente;