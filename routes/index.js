const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const direccionesController = require('../controllers/direccionesController');

module.exports = () =>{

    // *** CLIENTES ***
    // agregar un cliente
    router.post('/clientes', clientesController.nuevoCliente);
    // traer lista de clientes
    router.get('/clientes',clientesController.listaClientes)
    // traer 1 cliente
    router.get('/cliente', clientesController.obtenerUnCliente);
    // modificar un cliente
    router.put('/modificar-cliente/:id', clientesController.modificarCliente);
    // eliminacion logica cliente
    router.patch('/eliminar-cliente/:id',clientesController.eliminarCliente);


    // *** DIRECCIONES ***

    router.get('/direccion',direccionesController.listaDireccionesClientes)
    router.post('/direccion', direccionesController.nuevaDireccion);

    // 
   

    return router;
}