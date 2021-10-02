const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.registrarUsuario = async(req, res, next) =>{

    //salt
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password_ad, salt);

    try{
     const usuario =  await Usuario.create({
            nombre_ad: req.body.nombre_ad,
         
            email_ad: req.body.email_ad,
            password_ad: hash
        })
        res.status(201).json(usuario)
    }catch(e){
        console.log(e);
        res.status(409).json({mensaje: e.errors[0].message})
    }


}