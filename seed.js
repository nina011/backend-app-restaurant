const sequelize = require('./db/con');
const Plato = require('./models/Plato');
const Pedido = require('./models/Pedido');
const relaciones = require('./db/relaciones');

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




sequelize.sync({force: false}).then(()=>{
    console.log('conexion en seed');
}).then(() =>{

    platos.forEach(pl => Plato.create(pl))

}).then(() =>{

    let pedido1 = Pedido.create({
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
})


.catch(e => console.log(e))

