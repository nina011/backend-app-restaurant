const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // autorizacion por el header
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No autenticado, no hay jwt')
        error.statusCode = 401;
        throw error;
    }

    // obtener el token
    const token = authHeader.split(' ')[1];

    // verificar si es token valido 
    let revisarToken;

    try{
        revisarToken = jwt.verify(token, 'n4n2b64bmv')
        

    }catch(e){
        e.statusCode = 500;
        throw e;
    }

    // si es un token valido pero hay un error
    if(!revisarToken){
        const error = new Error('No autenticado')
        error.statusCode = 401;
        throw error;
    }
}