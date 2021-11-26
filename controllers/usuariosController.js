const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//req.body usuarios llegan todos con nombres distintos
exports.registrarUsuario = async(req, res) =>{

    //salt
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try{
     const usuario =  await Usuario.create({
            nombre_ad: req.body.nombre,     
            email_ad: req.body.email,
            password_ad: hash
        })
        res.status(201).json(usuario)
    }catch(e){
        console.log(e);
        res.status(409).json({mensaje: e.errors[0].message})
    }
}


exports.iniciarSesion = async (req, res, next) =>{
    
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({
        where:{
            email_ad: email
        }
    })

    if(!usuario){
        await res.status(401).json({mensaje:'El usuario no existe'})
    }else{
        if(!bcrypt.compareSync(password, usuario.password_ad)){
            await res.status(401).json({mensaje: 'Password incorrecto'})
            
        }else{
            // si el password es correcto
            const token = jwt.sign({
                email: usuario.email_ad,
                nombre: usuario.nombre_ad,
                id: usuario.id
            },  'n4n2b64bmv',
            {
                expiresIn:'4h'
            })

            const { id, nombre_ad } = usuario;
            res.json({ token, id, nombre_ad })
        }
    }
}



