const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./db/con');


const routes = require('./routes/index');
const PORT = 5000;

// Middleware para llenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Expose-Headers: Content-Range')
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     // res.header('Content-Range', 'post 0-20/20')
//     // res.header('X-Total-Count: 20')
//     next();
// });

// rutas



app.use(express.static('uploads'));

// definir dominio 
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://localhost']
const corsOption = {
    origin: (origin, callback) =>{
        for (let i = 0; i < whitelist.length; i++) {
            if(whitelist[i].indexOf(origin) !== -1){
                callback(null, true);
            }else{
                callback(new Error('No permitido por CORS'))
            }
        }
    }
}


app.use(cors({
    
    exposedHeaders: ['Content-Range']
}))

app.use('/', routes());



// app.use('/', routes(), cors(corsOption))

app.listen(PORT, () =>{

    console.log('servidor andando en el puerto ', PORT);
    

    sequelize.sync({force: false}).then(() => {
        console.log('nos hemos conectado a la base de datos');

    }).catch(e => console.log('se ha producido un error: ',e))
})