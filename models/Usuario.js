const sequelize = require('../db/con');
const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {}

Usuario.init({
    nombre_ad: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate:{
            notEmpty:{
                args: true,
                msg: 'El nombre no puede estar vacío'
            },
            len: {
                args: [3, 30],
                msg: 'El nombre debe contener entre 3 y 15 caracteres'
            },
            isLetterSpace(str){
                const reg =  /^[a-zA-ZÀ-ÿ\s]*$/
 
                if(!reg.test(str)) throw Error('El nombre puede contener solo letras')
             }
        }
    },
    email_ad:{
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
    password_ad:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'la contraseña no puede estar vacía'
            }
        }
    }
},{
    sequelize, 
    modelName:'usuarios',
   
})


module.exports = Usuario;