const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const app = express();
require('./config/config');

const publicPath = path.resolve(__dirname, '../public');

app.use(require('./routes/routes'));
app.use(express.static(publicPath));

let server = http.createServer(app);

module.exports.io = socketIO(server);
require('./sockets/socket');

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("DB ONLINE");
})

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`listening on port ${ process.env.PORT }`);

});