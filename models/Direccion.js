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
            len:{
                args:[4,15],
                msg:'La ciudad debe contener entre 4 y 15 caracteres'
            },
            isLetterSpace(str){
                const reg =  /^[a-zA-ZÀ-ÿ\s]*$/
 
                if(!reg.test(str)) throw Error('El nombre pude contener solo letras')
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
            len:{
                args:[5,50],
                msg:'La calle debe contener entre 5 y 50 caracteres'
           },
           isLetterSpace(str){
            const reg =  /^[a-zA-ZÀ-ÿ\s]*$/

            if(!reg.test(str)) throw Error('El nombre pude contener solo letras')
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
        defaultValue:'N/A',
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