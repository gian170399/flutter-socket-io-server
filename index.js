const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
require('dotenv').config;
//app de express
const app = express();

//servidor node socket server
const server = require('http').createServer(app);
module.exports.io= require('socket.io')(server);//exportamos este io al socket.js

require('./sockets/socket')


//path publico
const publicPath= path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

//app.get('/', (req,res) => res.send('Hola mundillo'));

server.listen( 3000, (err)=>{
    //process.env.PORT
    if(err) throw new Error(err);

    console.log('Servido corriendo en puerto', 3000 );
});