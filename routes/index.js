const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const direccionesController = require('../controllers/direccionesController');

module.exports = () =>{

    // agregar un cliente
    router.post('/clientes', clientesController.nuevoCliente);

    router.get('/direccion',direccionesController.listaClientes)
    router.get('/clientes',clientesController.listaClientes)

    router.post('/direccion', direccionesController.nuevaDireccion);

   

    return router;
}