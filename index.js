const express = require('express');
const app = express();
const sequelize = require('./db/con');
const cors = require('cors');

const routes = require('./routes/index');
const PORT = 5000;

// Middleware para llenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas
app.use('/', routes());

// cors
app.use(cors());

app.listen(PORT, () =>{

    console.log('servidor andando en el puerto ', PORT);
    

    sequelize.sync({force: false}).then(() => {
        console.log('nos hemos conectado a la base de datos');

    }).catch(e => console.log('se ha producido un error: ',e))
})