const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('AC DC'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon jovi'));

console.log(bands);


//mensajes de sockets
//el client es como una computadora o un dispositivo que acaba de conectarse a mi server
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands',bands.getBands());

    client.on('disconnect', () => { console.log('Cliente desconectado') });//va a notificar

    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
        io.emit('mensaje', { admin: 'nuevo mensaje' });
    });

    client.on('vote-band', (payload) => {
        // console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());//esto sirve para mandar a todos los que estén conectados incluso el quien lo emite
    });

    client.on('add-band', (payload)=> {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands());//esto sirve para mandar a todos los que estén conectados incluso el quien lo emite
    });

    client.on('delete-band', (payload) => {
        // console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());//esto sirve para mandar a todos los que estén conectados incluso el quien lo emite
    });

    // client.on('emitir-mensaje', (payload) => {//el on escucha
    //     //console.log(payload);
    //     //io.emit('nuevo-mensaje', payload);//esto emite a todos los clientes conectados
    //     client.broadcast.emit('nuevo-mensaje', payload);//emitir mensaje a todos los que esta conectados excepto al que lo emite
    // });
})

