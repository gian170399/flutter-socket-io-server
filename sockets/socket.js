const{io} = require('../index');
//mensajes de sockets
//el client es como una computadora o un dispositivo que acaba de conectarse a mi server
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { console.log('Cliente desconectado') });//va a notificar

    client.on('mensaje',(payload)=> {
        console.log('mensaje',payload);
        io.emit('mensaje',{admin:'nuevo mensaje'});
    });
  });
