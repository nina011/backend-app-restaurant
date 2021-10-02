const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const direccionesController = require('../controllers/direccionesController');
const usuariosController = require('../controllers/usuariosController');
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
    // obtener todas las direcciones
    router.get('/direccion',direccionesController.listaDireccionesClientes);
    // agregar una nueva direccion 
    router.post('/direccion', direccionesController.nuevaDireccion);

    // *** ADMIN ***
    // registrarse
    router.post('/admin/registrarse', usuariosController.registrarUsuario);
   // iniciar sesion


    return router;
}