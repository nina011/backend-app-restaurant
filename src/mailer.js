
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: 'random.tool.application@gmail.com',
            pass: 'kdrtmduxujhwakbi'
        },
    })

    transporter.verify().then(() =>{
        console.log('Listo para enviar emails');
    })


module.exports = transporter;