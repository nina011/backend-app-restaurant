const Direccion = require('../models/Direccion');
const Cliente = require('../models/Cliente');
const db = require('../db/config')
const relaciones = require('../db/relaciones');


exports.nuevaDireccion = async(req,res,next) =>{

    try{
        
        const direccion = await Direccion.create({
            ciudad_dr: req.body.ciudad_dr,
            calle_dr: req.body.calle_dr,
            numero_dr: req.body.numero_dr,
            clienteId: req.body.clienteId
          
            
        })

       
        res.status(201).json({ message: 'Se ha creado una direccion '})

    }catch(e){
        console.log(e);
        res.status(400).json({mensaje: e.errors[0].message})
        next();
    }
}



exports.listaDireccionesClientes = async(req, res, next) =>{

        const clientes =  await  Direccion.findAll({
            include:'cliente'
         })
         
         res.status(200).json(clientes)
 }

