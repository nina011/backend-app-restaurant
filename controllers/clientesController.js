const Cliente = require('../models/Cliente');
const Direccion = require('../models/Direccion')
const db = require('../db/config')
const relaciones = require('../db/relaciones');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

//crear un nuevo cliente
// req.body de clientes llegan todos con nombres distintos
exports.registrarCliente = async (req, res, next) => {

    const { nombreCli, apellidoCli, emailCli, telefonoCli, password, ciudadDr,calleDr,numeroDr} = req.body ;
    
    if(password === ''){
        res.status(401).json({mensaje:'la contraseña no puede estar vacia'})
        return;
    }
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt)

   const existeCliente =  await Cliente.findOne({
        where:{
            email_cl: emailCli
        }
    })

    if(existeCliente){
        res.status(401).json({mensaje:'El cliente ya existe'})
        return;
    }
    try{     

        const cliente =  await Cliente.create({
            nombre_cl: nombreCli,
            apellido_cl: apellidoCli,
            email_cl: emailCli,
            telefono_cl: telefonoCli,
            password_cl: hash
        })

        await Direccion.create({
            ciudad_dr: ciudadDr,
            calle_dr: calleDr,
            numero_dr: numeroDr,
            clienteId: cliente.id
        })
    
        res.status(201).json({message:'Se ha registrado con éxito'})

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
            attributes:{
                exclude: ['password_cl']
            },
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
            attributes:{
                exclude: ['password_cl']
            },
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
 console.log('entro a clientes')
    const { id } = req.params;
    const { nombreCli, apellidoCli, emailCli, telefonoCli} = req.body ;
  
    try{

        const modCli = await Cliente.update({
            attributes:{
                exclude: ['password_cl']
            },
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