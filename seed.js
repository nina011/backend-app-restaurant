const sequelize = require('./db/con');
const Plato = require('./models/Plato');
const Pedido = require('./models/Pedido');
const relaciones = require('./db/relaciones');
const Platos_Pedidos = require('./models/Platos_Pedidos');
const Cliente = require('./models/Cliente');
const Direccion = require('./models/Direccion');
const Usuario = require('./models/Usuario');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

  
 
const platos = [
    { nombre_pl: 'completo', descripcion_pl:'delicioso completo con tomate y palta',precio_pl: 3000},
    { nombre_pl: 'ensalada cesar', descripcion_pl:'exquisita ensalada cesar lista para disfrutar', precio_pl: 5000 },
    { nombre_pl: 'Carne mongoliana', descripcion_pl:'Sabrosa carne mongoliana',  precio_pl: 6000 },
    { nombre_pl: 'Pollo chiten', descripcion_pl:'exquisito pollo chitén', precio_pl: 6000 },
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
  { ciudad_dr: 'Los Andes', calle_dr: 'Maipu con las heras', numero_dr: 2412, clienteId:3},
  { ciudad_dr: 'Los Andes', calle_dr: 'Minera andina', numero_dr: 1174, clienteId:4}


];

  // const pedidos = [
  //   { hora_pd: '13:30', fecha_pd: Date.now(), clienteId:1 },
  //   { hora_pd: '15:00', fecha_pd: Date.now(), clienteId:2 },
  //   { hora_pd: '14:15', fecha_pd: Date.now(), clienteId:3 },
  //   { hora_pd: '16:10', fecha_pd: Date.now(), clienteId:4 },

  // ];
  // const pedidos = [
  //   { hora_pd: '13:30', clienteId:1 },
  //   { hora_pd: '15:00', clienteId:2 },
  //   { hora_pd: '14:15', clienteId:3 },
  //   { hora_pd: '16:10', clienteId:4 },

  // ];

  const pedidos = [
    { clienteId:1 , precio_total_pd: 8000, tipo_pd: 'Delivery', fecha_pd:'2021-08-15'},
    { clienteId:2 , precio_total_pd: 11000, tipo_pd: 'Delivery', fecha_pd:'2021-08-10'},
    { clienteId:3 , precio_total_pd: 12000, tipo_pd: 'Retiro'},
    { clienteId:4 , precio_total_pd: 12000, tipo_pd: 'Retiro'}

  ];

const platos_pedidos = [
  { pedidoId: 1, platoId: 1, cantidad_pp: 1, agregado_pp:'sin mayo'},
  { pedidoId: 1, platoId: 2, cantidad_pp: 1, agregado_pp:'con aderezo'},
  { pedidoId: 2, platoId: 2, cantidad_pp: 2, agregado_pp:'sin algas'},
  { pedidoId: 3, platoId: 3, cantidad_pp: 2,  agregado_pp:'con todo'},
  { pedidoId: 4, platoId: 3, cantidad_pp: 1, agregado_pp:'sin ketchup'},
  { pedidoId: 4, platoId: 4, cantidad_pp: 1, agregado_pp:'con mostaza'}
];

const usuarios = [
  {nombre_ad: 'Rodrigo Gutierrez', email_ad: 'rodrigo@gmail.com', password_ad: '123123'},
  {nombre_ad: 'Maria nieves ', email_ad: 'marianieve@gmail.com', password_ad: 'asdasd'}
]



sequelize.sync({force: false}).then(()=>{
    console.log('conexion en seed');
}).then(() =>{

    platos.forEach(pl => Plato.create(pl))
    clientes.forEach(cl => Cliente.create(cl))
    direcciones.forEach(dr => Direccion.create(dr))
    usuarios.forEach( async u => {
        u.password_ad = await bcrypt.hash(u.password_ad, 10)

        Usuario.create(u)
    })
    

}).then( () =>{

  pedidos.forEach( pd => {

  
    Pedido.create(pd)
  
  })
  platos_pedidos.forEach(pp => Platos_Pedidos.create(pp))


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