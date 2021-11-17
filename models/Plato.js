const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/con');


class Plato extends Model {}

Plato.init({
    nombre_pl:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                args: true,
                msg: 'El nombre no puede estar vacío'
            },
            len: {
                args: [3, 50],
                msg: 'El nombre debe contener entre 3 y 15 caracteres'
            },
            isLetterSpace(str){
                const reg =  /^[a-zA-ZÀ-ÿ\s\u00C0-\u017F]*$/
 
                if(!reg.test(str)) throw Error('El nombre pude contener solo letras')
             }
        }
    },
    descripcion_pl:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                args: true,
                msg: 'La descripción no puede estar vacia'
            },
            len: {
                args: [10, 250],
                msg: 'la descripcion debe contener entre 10 y 300 caracteres'
            },
            isLetterSpace(str){
                const reg =  /^[a-zA-ZÀ-ÿ\s\u00C0-\u017F]*$/
                //[a-zA-Z\u00C0-\u017F]+$
 
                if(!reg.test(str)) throw Error('La descripcion solo debe tener letras')
             }
        }
    },
    
    estado_pl:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        validate:{
            isBoolean:{
                args: true, 
                msg: 'no permitido'
            }
        }
    },
    precio_pl:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate:{
            isInt: {
            args:true,
            msg:'En este campo solo se admiten numeros enteros'}
        }
    },
    img_pl:{
        type: DataTypes.STRING
    }
},
    {
        sequelize,
        modelName:'platos',
        timestamps: false
    }
)


module.exports = Plato;