const express = require('express');
const app = express();
const sequelize = require('./db/conexion');


const PORT = 5000;

app.get('/',(req, res) => {
    res.send('hey')
})

app.listen(PORT, () =>{

    console.log('servidor andando en el puerto ', PORT);
    // conexion base de datos

    sequelize.sync({force:false}).then(() => {
        console.log('nos hemos conectado a la base de datos');
    }).catch(e => console.log('se ha producido un error: ',e))
    
})