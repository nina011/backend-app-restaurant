const sequelize = require('./db/con');
const Plato = require('./models/Plato');
const Pedido = require('./models/Pedido');
const relaciones = require('./db/relaciones');
const Platos_Pedidos = require('./models/Platos_Pedidos');
const Cliente = require('./models/Cliente');
const Direccion = require('./models/Direccion');


const platos = [
    { nombre_pl: 'completo', descripcion_pl:'delicioso completo con tomate y palta', 
      agregado_pl:'sin mayo', precio_pl: 3000 },
    { nombre_pl: 'ensalada cesar', descripcion_pl:'exquisita ensalada cesar lista para disfrutar', 
      agregado_pl:'con aderezo', precio_pl: 5000 },
    { nombre_pl: 'Carne mongoliana', descripcion_pl:'Sabrosa carne mongoliana', 
      agregado_pl:'sin algas', precio_pl: 6000 },
    { nombre_pl: 'Pollo chiten', descripcion_pl:'exquisito pollo chitén', 
      agregado_pl:'con todo', precio_pl: 6000 },
]

const clientes = [
  { nombre_cl: 'Juan', apellido_cl: 'Carvajal', email_cl: 'juancarvajal@gmail.com', telefono_cl: '+56932145684'},
  { nombre_cl: 'Anita', apellido_cl: 'LaHuerfanita', email_cl: 'anitalahuerfanita@gmail.com', telefono_cl: '+56932132123'},
  { nombre_cl: 'Gabriela', apellido_cl: 'Barraza', email_cl: 'gabriela@gmail.com', telefono_cl: '+56965478985'},
  { nombre_cl: 'Francisco', apellido_cl: 'Gonzalez', email_cl: 'franciscogonza@gmail.com', telefono_cl: '+56998746521'}
];

const direcciones = [
  { ciudad_dr: 'Los Andes', calle_dr: 'Esmeralda con papudo', numero_dr: 1236, clienteId:1},
  { ciudad_dr: 'San Felipe', calle_dr: 'Debajo del puente', numero_dr: 2569, clienteId:2},
  { ciudad_dr: 'Los Andes', calle_dr: 'Maipú con las heras', numero_dr: 2412, clienteId:3},
  { ciudad_dr: 'Los Andes', calle_dr: 'Minera andina', numero_dr: 1174, clienteId:4}


];



sequelize.sync({force: false}).then(()=>{
    console.log('conexion en seed');
}).then(() =>{

    // platos.forEach(pl => Plato.create(pl))
    // clientes.forEach(cl => Cliente.create(cl))
    // direcciones.forEach(dr => Direccion.create(dr))


}).then( () =>{

    const buscarPlatos = Plato.findAll().then(respuesta => { 
        // console.log(respuesta.JSON());
    })

    // let crearUnPedido = Platos_Pedidos.create({
    //   cantidad_pp:2,
    //   platoId:1,
    //   pedidoId: 1
    //  // },{
    //  //   include:[Plato, Pedido]
    //  })

  //   let pedido1 = Pedido.create({
  //     hora_pd: '21:30',
  //     fecha_pd: '11-10-2021',
  //     precio_total_pd: '6000',
  //     clienteId: 1
  // })
    

}).then(() =>{


  

 //console.log(r[0].toJSON()
})



.catch(e => console.log(e))



//consulta completa pedidos
/**
 * let pedido1 = Pedido.create({
        hora_pd: '15:30',
        fecha_pd: '07-10-2021',
        precio_total_pd: '12000',
        platos: [
            { nombre_pl: 'Carne mongoliana', descripcion_pl:'Sabrosa carne mongoliana', 
                agregado_pl:'sin algas', precio_pl: 6000 },
            { nombre_pl: 'Pollo chiten', descripcion_pl:'exquisito pollo chitén', 
                agregado_pl:'con todo', precio_pl: 6000 }
        ]
    },{
        include: [Plato]
    })

 */



  // consulta de oro para recuperar pedidos
  // const todasLasOrdenes = Pedido.findOne({
  //   where:{
  //     id: 2
  //   },
  //   include: [{
  //     model: Plato, 
  //     as:'platos',
  //   through:{
  //     model: Platos_Pedidos,
  //     as:'platos_pedidos',
  //     attributes:['cantidad_pp']
  //   }
  // }]
  // }).then(r => console.log(r.toJSON().platos) )