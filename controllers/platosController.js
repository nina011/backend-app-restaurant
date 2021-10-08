const Plato = require('../models/Plato');
const db = require('../db/config');

exports.nuevoPlato = async(req, res) =>{
    try{
        console.log(req.body);
        const plato = await Plato.create({
            nombre_pl: req.body.nombrePl,
            descripcion_pl: req.body.descripPl,
            agregado_pl: req.body.agregadoPl,
            precio_pl: req.body.precioPl,
            img_pl: req.body.imagen
        })

        res.status(201).json({mensaje: 'Se ha creado un nuevo plato'})

    }catch(e){
        console.log('ha ocurrido un error en la insercion: ',e);
        res.status(400).json({mensaje:  e.errors[0].message })
    }
}

exports.listaPlatos = async(req, res) =>{
    
    try{
        const platos = await Plato.findAll({
            where:{
                estado_pl: true
            }
        })

        res.status(200).json(platos)
    }catch(e){
        console.log('ha ocurrido un error');
        res.status(400).json({mensaje: 'hubo un error'})
    }
}

exports.obtenerUnPlato = async(req, res) =>{

    const { nombrePl } = req.body;

    try{
        const plato = await Plato.findOne({
            where:{
                nombre_pl: nombrePl
            }
        })

        if(plato){
            res.status(200).json(plato)
        }else{
            res.json({mensaje: 'no existe un plato con ese nombre'})
        }
    }catch(e){
        console.log(e);
        res.status(400).json({ mensaje: 'hubo un error'})
    }
}

// modificar por id
exports.modificarPlato = async(req, res) =>{

    const { id } = req.params;

    try{
        const modPlato = await Plato.update({
            nombre_pl: req.body.nombrePl,
            descripcion_pl: req.body.descripPl,
            agregado_pl: req.body.agregadoPl,
            precio_pl: req.body.precioPl,
            img_pl: req.body.imagen
        },{
            where:{
                id: id
            }
        })

        if(modPlato > 0){
            res.status(200).json({mensaje: 'Se ha modificado el plato'})
        }else{
            res.status(409).json({ mensaje: 'no se ha modificado el elemento'})
        }
        
    }catch(e){
        console.log(e);

        res.status(400).json({ mensaje: ' hubo un error'})
    }

}

exports.eliminarPlato = async(req, res) =>{

    const { id } = req.params;

    try{
        const eliminarPlato = await Plato.update({
            estado_pl: false
        },{
            where:{
                id:id
            }
        })
    }catch(e){
        console.log(e);
        res.status(400).json({mensaje: 'hubo un error'})
    }
}