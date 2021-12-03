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

        const direccion =  await  Direccion.findAll({
            include:'cliente'
         })
         
         res.status(200).set({
             'Content-Range': direccion.count
         }).json(direccion.rows)


         /**
          *  res.status(200).set({
            'Content-Range': clientes.count
         }).json(clientes.rows)
          */
 }


 exports.listaClientesDirecciones = async(req, res) => {

    try{
        const clientes = await Cliente.findAndCountAll({

            attributes:['id','nombre_cl','apellido_cl','email_cl','telefono_cl'],
            include:[{
                model: Direccion, 
                as: 'direccion',
    
                attributes:['ciudad_dr', 'calle_dr', 'numero_dr','num_depto_dr']
            }],
            where:{
                estado_cl: true
            }
        })
       
        res.status(200).set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range':clientes.count
        }).json(clientes.rows)
        console.log(clientes.count);
       
        
    }catch(e){
        res.status(400).json({ mensaje: 'no se encontró'})
    }
 }


 exports.editarDireccion = async(req, res) =>{

    const { id } = req.params;
    const { ciudadDr, calleDr, numeroDr, num_deptoDr } = req.body ;
   
    try{

        const direccionUpdate = await Cliente.update({
            
            ciudad_dr: nombreCli,
            calle_dr: calleDr,
            numero_dr: numeroDr,
            num_depto_dr: num_deptoDr
        },{
            where:{
                clienteId: id
            }
        });
        
        res.status(200).json(direccionUpdate)
        
    }catch(e){

        res.status(400).json({message:  e.errors[0].message})
        next();
        
    }
 }