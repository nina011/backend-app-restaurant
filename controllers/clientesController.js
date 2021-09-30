const Cliente = require('../models/Cliente');
const Direccion = require('../models/Cliente')
const db = require('../db/config')
const relaciones = require('../db/relaciones');

//crear un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {

    try{

        const { nombreCli, apellidoCli, emailCli, telefonoCli} = req.body ;

        const cliente =  await Cliente.create({
            nombre_cl: nombreCli,
            apellido_cl: apellidoCli,
            email_cl: emailCli,
            telefono_cl: telefonoCli
        })
        res.status(201).json({mensaje: 'Se ha creado un cliente nuevo'})

    }catch(e){
        console.log();
        res.status(400).json({mensaje: e.errors[0].message})
        next();
    }
}


exports.listaClientes = async(req, res, next) =>{

    
    try{
        const clientes =  await  Cliente.findAll({
            include:'direccion'
         })   
         
         res.status(200).json(clientes)
    }catch(e){
        console.log(e);
        res.status(404).json({message: 'hubo un error'})
    }


}