const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');


module.exports = () =>{

    // agregar un cliente
    router.post('/clientes', clientesController.nuevoCliente);


    return router;
}