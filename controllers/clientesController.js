const Cliente = require('../models/Cliente');
const db = require('../db/config')
//crear un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {

    try{
        const cliente =  await Cliente.create({
            nombre_cl: req.body.nombreCli,
            apellido_cl: req.body.apellidoCli,
            email_cl: req.body.emailCli,
            telefono_cl: req.body.telefonoCli
        })
        res.status(201).json({mensaje: 'Se ha creado un cliente nuevo'})

    }catch(e){
        console.log(e.errors[0].message);
        res.status(400).json({mensaje: 'Ha habido un error en el ingreso de datos'})
        next();
    }
}

