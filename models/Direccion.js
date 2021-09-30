const { Model , DataTypes } = require('sequelize');
const sequelize = require('../db/con');

class Direccion extends Model {}

Direccion.init({
    ciudad_dr:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args: true,
                msg: 'La dirección no puede estar vacía'
            },
            isAlpha:{
                args: true,
                msg:'La ciudad solo debe contener letras'
            },
            len:{
                args:[4,15],
                msg:'La ciudad debe contener entre 4 y 15 caracteres'
            }
        }
    },
    calle_dr:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty:{
               args: true,
               msg: 'La calle no puede estar vacía'
           },
           isAlpha:{
                args: true,
                msg:'La calle solo debe contener letras'
           },
            len:{
                args:[5,50],
                msg:'La calle debe contener entre 5 y 50 caracteres'
        }
       } 
    },
    numero_dr:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                args: true,
                msg: 'La calle no puede estar vacía'
            },
            isNumeric:{
                args: true,
                msg: 'Solo pueden ser números'
            },
            len:{
                args:[3,4],
                msg:'La numeración de la calle solo puede contener de 3 a 4 numeros'
            }
        }
    },
    num_depto_dr:{
        type: DataTypes.STRING,
        validate:{
            len:{
                args:[1,10],
                msg:'El número de departamento solo puede contener hasta 10 carácteres'
            }
        }
    }

},{
    sequelize,
    modelName: 'direcciones',
    timestamps: false
})

module.exports = Direccion;