const Cliente = require('../models/Cliente');
const Direccion = require('../models/Cliente')
const db = require('../db/config')
const relaciones = require('../db/relaciones');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

//crear un nuevo cliente
// req.body de clientes llegan todos con nombres distintos
exports.registrarCliente = async (req, res, next) => {

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt)

    try{     
        const { nombreCli, apellidoCli, emailCli, telefonoCli} = req.body ;

        const cliente =  await Cliente.create({
            nombre_cl: nombreCli,
            apellido_cl: apellidoCli,
            email_cl: emailCli,
            telefono_cl: telefonoCli,
            password_cl: hash
        })

        res.status(201).json(cliente)

    }catch(e){
        console.log();
        res.status(400).json({mensaje: e.errors[0].message})
        next();
    }
}


exports.iniciarSesion = async(req, res, next) => {

    const { email, password } = req.body;

    const cliente = await Cliente.findOne({
        where:{
            email_cl: email
        }
    })

    if(!cliente){
        await res.status(401).json({mensaje: 'Cliente no existe, registrese'})
    }else{
        if(!bcrypt.compareSync(password, cliente.password_cl)){
            await res.status(401).json({mensaje: 'Password incorrecto'})
        }else{
            // si el password es correcto
            const token = jwt.sign({
                email: cliente.email_cl,
                nombre: cliente.nombre_cl,
                id: cliente.id,
            }, 'secretkkkey',
            {
                expiresIn:'4h'
            })

            const { id, nombre_cl } = cliente;
            res.json({ token, id, nombre_cl})
        }
    }
}


// trae todos los clientes activos
exports.listaClientes = async(req, res, next) =>{

    try{
        const clientes =  await  Cliente.findAndCountAll({
            where:{
                estado_cl: true
            }
         },{
            include:'direccion'
         })   

         res.status(200).set({
            'Content-Range': clientes.count
         }).json(clientes.rows)

         // con otro provider
        //  res.status(200).set({
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Expose-Headers': 'X-Total-Count',
        //     'X-Total-Count': clientes.count
        //  }).json(clientes.rows)

    }catch(e){
        console.log(e);
        res.status(404).json({message: 'hubo un error'})
        next();
    }
}

// trae 1 solo cliente
exports.obtenerUnCliente = async(req, res, next) =>{
   
    const { id } = req.params;

    try{
        
        const cliente = await Cliente.findOne({
            where: {
                id: id
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
    const { nombreCli, apellidoCli, emailCli, telefonoCli} = req.body ;
   
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