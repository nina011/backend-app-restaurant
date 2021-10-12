const Pedido = require('../models/Pedido');
const Plato = require('../models/Plato');
const Platos_Pedidos = require('../models/Platos_Pedidos');


exports.nuevoPedido = async(req, res) =>{

    //
    const { horaPd, fechaPd, idCl, precioT } = req.body;
    const { platos } = req.body;

    try{
        // primero crear un pedido
        const nuevoPedido = await Pedido.create({
            hora_pd: horaPd,
            fecha_pd: fechaPd,
            precio_total_pd: precioT,
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
        
    }catch(e){

        console.log('hubo un error ',e);

        res.status(400).json({mensaje: 'no se puedo realizar la solicitud'})
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
            }]    
        })

        res.status(200).json(obtenerPedidos);
    }catch(e){
        console.log('hubo un error ', e);
        res.status(400).json({mensaje: 'hubo un error en la solicitud'})
    }
}

exports.obtenerUnSoloPedido = async(req, res) =>{
    
    const { id } = req.body;

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

        res.status(200).json(obtenerUnPedido);

    }catch(e){
        console.log('hubo un error ', e);
        res.status(400).json({mensaje:'no pudo ser procesada la solicitud'})
    }
}


exports.modificarUnPedido = async(req, res) =>{


}

exports.eliminarUnPedido = async(req, res ) =>{
    
}