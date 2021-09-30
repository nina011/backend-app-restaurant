const Cliente = require('../models/Cliente');
const Direccion = require('../models/Direccion');



// relacion cliente direccion , uno a uno
Cliente.hasOne(Direccion,{ as: 'direccion', foreignKey: 'clienteId'})
Direccion.belongsTo(Cliente, {as:'cliente', foreignKey:'clienteId'})
// Direccion.belongsTo(Cliente, { as: 'cliente', foreignKey: 'clienteId'})