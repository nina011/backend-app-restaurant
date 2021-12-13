const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
const Plato = require('../models/Plato');
const Platos_Pedidos = require('../models/Platos_Pedidos');
const Usuario = require('../models/Usuario');

const transporter = require('../src/mailer');

exports.nuevoPedido = async(req, res, next) =>{

    
    const { horaPd, fechaPd, idCl, precioT, tipoDespacho } = req.body;
    const { platos } = req.body;
    console.log(platos)
    if(!tipoDespacho || !idCl || !precioT){
        res.status(400).json({mensaje: 'Faltan datos, no se puede realizar el pedido'})
    }
    try{

        // calcular el precio total 
        // const longitud = platos.length;
        let precio_total = 0;
        let i = 0;

        while(i < platos.length){

            console.log(platos[i].cantidad)
            let existePlato = await Plato.findByPk(platos[i].id)

            if(!existePlato){
                res.status(400).json({mensaje: 'Existe un conflicto en el pedido precio'})
                return;
            }
            precio_total = precio_total + (existePlato.precio_pl * platos[i].cantidad);          
            i++;
        }

        if(precio_total !== precioT ){
            res.status(400).json({mensaje: 'Existe un conflicto en el pedido distinto'})
                return;
        }

        // primero crear un pedido

        let fecha = new Date()

        const nuevoPedido = await Pedido.create({
            hora_pd: fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds(),
            fecha_pd: fechaPd,
            precio_total_pd: precio_total,
            clienteId: idCl,
            tipo_pd: tipoDespacho
        })
        
        // luego insertar los platos del pedido y su cantidad

        let nuevoPlatosPedido;

        platos.forEach((p) =>{
            
            const po = {
                pedidoId: nuevoPedido.id,
                platoId: p.id,
                cantidad_pp: p.cantidad
            }
             nuevoPlatosPedido =  Platos_Pedidos.create(po)

        })

        res.status(200).json({mensaje:'su pedido ha sido tomado'})
        next()
    }catch(e){

        console.log('hubo un error ',e);

         res.status(400).json({mensaje: 'no se puedo realizar la solicitud'})
    }
}

exports.enviarEmail = async(req, res) =>{
    const { horaPd, fechaPd, idCl, precioT, tipoDespacho, platos } = req.body;
    console.log(horaPd, fechaPd, idCl, precioT, tipoDespacho , platos)



    const buscarCliente = await Cliente.findByPk(idCl)
    let listPlatos = '';
    for(let i = 0; i < platos.length; i++){
        buscarPlato = await Plato.findByPk(platos[i].id)
    
        listPlatos += `<li>` + buscarPlato.nombre_pl + `cantidad: ${platos[i].cantidad} </li>`;
    }
    try{

        
      await transporter.sendMail({
            from: '¡ Nuevo Pedido ! <random.tool.application@gmail.com>',
            to: 'random.tool.application@gmail.com',
            subject: 'Un cliente ha increado un nuevo pedido',
            html: `
            <body>
            
            <h2>Admin, hay un nuevo pedido!</h2>
            <br>
            <p><b>Se ha ingresado un nuevo pedido para que lo revises
            cuanto antes</b></p>
            <br>
            <div class="contenedor-info">
                <p>Cliente: ${buscarCliente.nombre_cl+' '+buscarCliente.apellido_cl}</p>
                <p>Pedido: </p> <ul>
                                    ${listPlatos}
                                </ul>
                <p>Tipo de despacho: ${tipoDespacho}</p>
                <br>
                <h3>Precio: ${precioT}</h3>
            </div>
            </body>
            `
        })
        console.log('se envio el email');
    }catch(e){
        console.log('no se pudo enviar el email ',e);
    }
}


exports.obtenerTodosLosPedidos = async(req, res) =>{

    try{
        const obtenerPedidos = await Pedido.findAndCountAll({

            include: [{
                model: Plato,
                as: 'platos',
    
                attributes: ['id', 'nombre_pl'],
                through:{
                    model: Platos_Pedidos,
                    as: 'platos_pedidos',
                    attributes: ['cantidad_pp']
                }
            }]
            // where:{
            //     estado_pd: true
            // }    
        })

        res.status(200).set({
            'Content-Range': obtenerPedidos.count
           }).json(obtenerPedidos.rows)
    }catch(e){
        console.log('hubo un error ', e);
        res.status(400).json({mensaje: 'hubo un error en la solicitud'})
    }
}

exports.obtenerUnSoloPedido = async(req, res) =>{
    
    const { id } = req.params;
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
        res.status(200).json(obtenerUnPedido);

    }catch(e){
        console.log('hubo un error ', e);
        res.status(400).json({mensaje:'no pudo ser procesada la solicitud'})
    }
}


exports.modificarUnPedido = async(req, res) =>{

    console.log('ENTRANDO A PEDIDO');
    const { id } = req.params;
    const { estado_pd } = req.body


    try{

        const obtenerPedido = await Pedido.update({

            estado_pd: estado_pd
        },{
            where:{
                id: id
            }
        })
        res.json(obtenerPedido)

    }catch(e){
        res.status(404).json({mensaje:'Ocurrió un error en pedidos'})
    }
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
        res.status(404).json({mensaje:'Ocurrió un error en pedidos'})
    }
}