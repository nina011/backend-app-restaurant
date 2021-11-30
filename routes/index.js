const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const direccionesController = require('../controllers/direccionesController');
const usuariosController = require('../controllers/usuariosController');
const platosController = require('../controllers/platosController');
const pedidosController = require('../controllers/pedidosController');

const auth = require('../middleware/auth');
module.exports = () =>{

    // *** CLIENTES ***
    // agregar un cliente
    router.post('/clientes', clientesController.registrarCliente);
    // traer lista de clientes
    router.get('/clientes',clientesController.listaClientes)
    // traer 1 cliente
    router.get('/clientes/:id', clientesController.obtenerUnCliente);
    // modificar un cliente
    router.put('/clientes/:id', clientesController.modificarCliente);
    // eliminacion logica cliente
    router.delete('/clientes/:id',clientesController.eliminarCliente);
    // clientes con direccion
    router.get('/direcciones-clientes', direccionesController.listaClientesDirecciones);

    // *** DIRECCIONES ***
    // obtener todas las direcciones
    router.get('/direcciones',direccionesController.listaDireccionesClientes);
    // agregar una nueva direccion 
    router.post('/direccion/onedireccion', direccionesController.nuevaDireccion);

    // *** ADMIN ***
    // registrarse
    router.post('/admin/registrarse', usuariosController.registrarUsuario);
   // iniciar sesion
    router.post('/admin/iniciar-sesion', usuariosController.iniciarSesion);

    // ** PLATOS ***
    // ingresar plato nuevo
    router.post('/platos/nuevoplato',
    platosController.subirImagen,
    platosController.nuevoPlato);
    // obtener todos los platos
    router.get('/platos', platosController.listaPlatos);
    // obtener un solo plato
    router.get('/platos/plato', platosController.obtenerUnPlato);
    // actualizar plato 
    router.patch('/platos/modplato/:id', platosController.modificarPlato);
    // eliminar plato
    router.patch('/platos/elplato/:id', platosController.eliminarPlato);

    
    //** PEDIDOS  **
    //ingresar un pedido
    router.post('/pedidos/nuevo', 
    pedidosController.nuevoPedido
    // ,
    // pedidosController.enviarEmail
    );
    //obtener todos los pedidos
    router.get('/pedidos', pedidosController.obtenerTodosLosPedidos);
    // obtener un solo pedido
    router.get('/pedidos/pedido', pedidosController.obtenerUnSoloPedido)
    // actualizar un pedido
    router.patch('/pedidos/modpedido/:id', pedidosController.modificarUnPedido);
    // eliminar un pedido
    router.patch('/pedidos/elpedido/:id', pedidosController.eliminarUnPedido);
    
    return router;
}