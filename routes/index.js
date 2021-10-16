const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const direccionesController = require('../controllers/direccionesController');
const usuariosController = require('../controllers/usuariosController');
const platosController = require('../controllers/platosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = () =>{

    // *** CLIENTES ***
    // agregar un cliente
    router.post('/clientes/newcliente', clientesController.nuevoCliente);
    // traer lista de clientes
    router.get('/clientes/clientes',clientesController.listaClientes)
    // traer 1 cliente
    router.get('/clientes/uncliente', clientesController.obtenerUnCliente);
    // modificar un cliente
    router.put('/clientes/mod/:id', clientesController.modificarCliente);
    // eliminacion logica cliente
    router.patch('/clientes/el/:id',clientesController.eliminarCliente);


    // *** DIRECCIONES ***
    // obtener todas las direcciones
    router.get('/direccion/direcciones',direccionesController.listaDireccionesClientes);
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
     platosController.subirImagen, platosController.nuevoPlato);
    // obtener todos los platos
    router.get('/platos/platos', platosController.listaPlatos);
    // obtener un solo plato
    router.get('/platos/plato', platosController.obtenerUnPlato);
    // actualizar plato 
    router.patch('/platos/modplato/:id', platosController.modificarPlato);
    // eliminar plato
    router.patch('/platos/elplato/:id', platosController.eliminarPlato);

    
    //** PEDIDOS  **
    //ingresar un pedido
    router.post('/pedidos/nuevo', 
    pedidosController.nuevoPedido,
    pedidosController.enviarEmail);
    //obtener todos los pedidos
    router.get('/pedidos/pedidos', pedidosController.obtenerTodosLosPedidos);
    // obtener un solo pedido
    router.get('/pedidos/pedido', pedidosController.obtenerUnSoloPedido)
    // actualizar un pedido
    router.patch('/pedidos/modpedido/:id', pedidosController.modificarUnPedido);
    // eliminar un pedido
    router.patch('/pedidos/elpedido/:id', pedidosController.eliminarUnPedido);
    
    return router;
}