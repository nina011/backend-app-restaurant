const Cliente = require('../models/Cliente');
const Direccion = require('../models/Direccion');
const Pedido = require('../models/Pedido');
const Plato = require('../models/Plato');
const Platos_Pedidos = require('../models/Platos_Pedidos');


// relacion cliente direccion , uno a uno
Cliente.hasOne(Direccion,{ as: 'direccion', foreignKey: 'clienteId'});
Direccion.belongsTo(Cliente, {as:'cliente', foreignKey:'clienteId'});


// NaN
// un o mas platos pueden estar presente en muchos pedidos
// uno o mas pedidos puede contener muchos platos
Plato.belongsToMany(Pedido,{
    through: 'platos_pedidos',
    as: 'pedidos',
    foreignKey: 'platoId'
})

Pedido.belongsToMany(Plato,{
    through: 'platos_pedidos',
    as:'platos',
    foreignKey:'pedidoId'
})


// 1 a n 
Cliente.hasMany(Pedido, { as: 'pedidos', foreignKey: 'clienteId'});
Pedido.belongsTo(Cliente, { as: 'clientes', foreignKey: 'clienteId'});
