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

// const router = require('./routes/index');
const express = require('express');
const router = express.Router()



  
 
const platos = [
    { nombre_pl: 'Hamburguesa de la casa', descripcion_pl:'Exquisita hamburguesa de la casa de carne de res del sur, con queso derretido mantecoso , tomate , lechuga y cebolla acaramelada',precio_pl: 3500, img_pl: 'hamburguesa-carne-cebolla'},
    { nombre_pl: 'Big L.A.', descripcion_pl:'Una apuesta culinaria esta hamburguesa de carne de res del sur, con queso sheddar, tocino, palta, lechuga, cebolla morada y mayo', precio_pl: 5000, img_pl: 'hamburguesa-palta-queso'},
    { nombre_pl: 'Double Float carnivora', descripcion_pl:'Esta hamburguesa tiene doble en todo, doble hamburguesa de res, doble queso sheddar, doble tocino!',  precio_pl: 6000 , img_pl:'doble-hamburguesa'},
    { nombre_pl: 'Vegan Choise', descripcion_pl:'Alternativa veggie a base de garbanzo y condimentos, con cebolla acaramelada, pimenton, lechuga, papitas y mayo', precio_pl: 5000, img_pl:'hamburguesa-vegana'},
    { nombre_pl: 'Completo', descripcion_pl:'Un clásico chileno, completo italiano', precio_pl: 2000, img_pl:'completo'},
    { nombre_pl: 'Chorrillana Tradicional', descripcion_pl:'Otro clásico de la comida chilena, una exquisita chorrillana con papas fritas, chorizo, carne, cebolla y huevo', precio_pl: 10000, img_pl:'chorrillana-tradicion'},
    { nombre_pl: 'Chorrillana Arabe', descripcion_pl:'Chorrillana al estilo árabe, contiene papas fritas, falafel, cebollin, y mas agregados', precio_pl: 8000, img_pl:'chorrillana-arabe'},
    { nombre_pl: 'Salchipapas', descripcion_pl:'La infaltable salchipapa para los mañosos', precio_pl: 6000, img_pl:'salchipapa'},
    { nombre_pl: 'Papas Fritas', descripcion_pl:'Exquisitas papas fritas, crujientes y deliciosas ', precio_pl: 4000, img_pl:'papitasfritas'},
  ]

const clientes = [
  { nombre_cl: 'Juan', apellido_cl: 'Carvajal', email_cl: 'juancarvajal@gmail.com', telefono_cl: '+56932145684', password_cl: 'qwerty'},
  { nombre_cl: 'Anita', apellido_cl: 'LaHuerfanita', email_cl: 'anitalahuerfanita@gmail.com', telefono_cl: '+56932132123', password_cl: '123456'},
  { nombre_cl: 'Gabriela', apellido_cl: 'Barraza', email_cl: 'gabriela@gmail.com', telefono_cl: '+56965478985',password_cl: 'qwerty' },
  { nombre_cl: 'Francisco', apellido_cl: 'Gonzalez', email_cl: 'franciscogonza@gmail.com', telefono_cl: '+56998746521', password_cl: '123456'}
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
      clientes.forEach(async cl => {
        cl.password_cl = await bcrypt.hash(cl.password_cl, 10)
    
          Cliente.create(cl)
      })

}).then( () =>{

  
    direcciones.forEach(async dr => await Direccion.create(dr))
    usuarios.forEach( async u => {
        u.password_ad = await bcrypt.hash(u.password_ad, 10)

        Usuario.create(u)
    })

}).then(()=>{
  // direcciones.forEach(async dr => await Direccion.create(dr))
  // pedidos.forEach( pd => {
  //   Pedido.create(pd)
  // })
  // platos_pedidos.forEach(pp => Platos_Pedidos.create(pp))
})



.catch(e => console.log(e))



