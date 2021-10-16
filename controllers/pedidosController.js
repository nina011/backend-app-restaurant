const Pedido = require('../models/Pedido');
const Plato = require('../models/Plato');
const Platos_Pedidos = require('../models/Platos_Pedidos');
const Usuario = require('../models/Usuario');

const transporter = require('../src/mailer');

exports.nuevoPedido = async(req, res, next) =>{

    //
    const { horaPd, fechaPd, idCl, precioT } = req.body;
    const { platos } = req.body;

    try{

        // calcular el precio total 
        const longitud = platos.length;
        let precio_total = 0;
        let i = 0;

        while(i < longitud){
            let precioPlato = await Plato.findByPk(platos[i].id)
            precio_total = precio_total + precioPlato.precio_pl;          
            i++;
        }


        // primero crear un pedido
        const nuevoPedido = await Pedido.create({
            hora_pd: horaPd,
            fecha_pd: fechaPd,
            precio_total_pd: precio_total,
            clienteId: idCl
        })
        
        // luego insertar los platos del pedido y su cantidad

        let nuevoPlatosPedido;

        platos.forEach((p) =>{
            
            const po = {
                pedidoId: nuevoPedido.id,
                platoId: p.id,
                cantidad_pp: p.cantidad_pp
            }

            console.log(po);

             nuevoPlatosPedido =  Platos_Pedidos.create(po)

        })

        res.status(200).json(nuevoPlatosPedido)
        next()
    }catch(e){

        console.log('hubo un error ',e);

        res.status(400).json({mensaje: 'no se puedo realizar la solicitud'})
    }
}

exports.enviarEmail = async(req, res) =>{
   
    try{
        
      await transporter.sendMail({
            from: '¡ Nuevo Pedido ! <random.tool.application@gmail.com>',
            to: 'random.tool.application@gmail.com',
            subject: 'Un cliente ha increado un nuevo pedido',
            html: `
            <h2>Admin, hay un nuevo pedido!</h2>
            <br>
            <p><b>Se ha ingresado un nuevo pedido para que lo revises
            cuanto antes</b></p>
            `
        })
        console.log('se envio el email');
    }catch(e){
        console.log('no se pudo enviar el email ',e);
    }
}


exports.obtenerTodosLosPedidos = async(req, res) =>{

    try{
        const obtenerPedidos = await Pedido.findAll({

            include: [{
                model: Plato,
                as: 'platos',
    
                attributes: ['id', 'nombre_pl', 'precio_pl'],
                through:{
                    model: Platos_Pedidos,
                    as: 'platos_pedidos',
                    attributes: ['cantidad_pp']
                }
            }],
            where:{
                estado_pd: true
            }    
        })

        res.status(200).json(obtenerPedidos);
    }catch(e){
        console.log('hubo un error ', e);
        res.status(400).json({mensaje: 'hubo un error en la solicitud'})
    }
}

exports.obtenerUnSoloPedido = async(req, res) =>{
    
    const { id } = req.body;
    // console.log(id);
    try{
        const obtenerUnPedido = await Pedido.findOne({

            include: [{
                model: Plato,
                as: 'platos',
    
                attributes: ['id', 'nombre_pl', 'precio_pl'],
                through:{
                    model: Platos_Pedidos,
                    as: 'platos_pedidos',
                    attributes: ['cantidad_pp']
                }
            }],
            where:{
                id: id
            }
        })
        console.log(obtenerUnPedido);
        res.status(200).json(obtenerUnPedido);

    }catch(e){
        console.log('hubo un error ', e);
        res.status(400).json({mensaje:'no pudo ser procesada la solicitud'})
    }
}


exports.modificarUnPedido = async(req, res) =>{

    // hay que definir que vamos a modificar del pedido, agregar platos? quitar platos?
}

exports.eliminarUnPedido = async(req, res ) =>{

    const { id } = req.params;

    try{

        const obtenerPedido = await Pedido.update({

            estado_pd: false
        },{
            where:{
                id: id
            }
        })
        res.json(obtenerPedido)

    }catch(e){

    }
}