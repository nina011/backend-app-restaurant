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

// trae todos los clientes activos
exports.listaClientes = async(req, res, next) =>{

    try{
        const clientes =  await  Cliente.findAll({
            where:{
                estado_cl: true
            }
         },{
            include:'direccion'
         })   
         
         res.status(200).json(clientes)
    }catch(e){
        console.log(e);
        res.status(404).json({message: 'hubo un error'})
        next();
    }
}

// trae 1 solo cliente
exports.obtenerUnCliente = async(req, res, next) =>{

    const { email } = req.body;

    try{
        
        const cliente = await Cliente.findOne({
            where: {
                email_cl : email
            }
        });

        res.status(200).json(cliente)
        
    }catch(e){
        console.log(e);
        next();
    }
}

// modificar por id
exports.modificarCliente = async(req, res, next) =>{

    const { id } = req.params;
    const { nombreCli, apellidoCli, emailCli, telefonoCli } = req.body;

    try{
        const modCli = await Cliente.update({
            nombre_cl: nombreCli, 
            apellido_cl: apellidoCli,
            email_cl: emailCli, 
            telefono_cl: telefonoCli
        },{
            where:{
                id: id
            }
        });

        res.status(200).json(modCli)
        
    }catch(e){

        res.status(400).json({message:  e.errors[0].message})
        next();
        
    }
}

// eliminar un cliente
exports.eliminarCliente = async(req, res, next) =>{

    const { id } = req.params;
    
    try{
        const eliminarCliente = await Cliente.update({
            estado_cl: false
        },{
            where:{
                id: id
            }
        })

        res.status(200).json({message: 'Se ha eliminado al cliente'})

    }catch(e){
        res.status(400).json({message: 'no pudo ser procesada la solicitud'})
        next()
    }

}

